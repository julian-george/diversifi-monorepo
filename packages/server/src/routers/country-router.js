import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { SERVER_ERROR } from "../errors.js";
import { makeSerializedKDT, deserializeKDT, kNearest } from "../kd/utilities";
import SongNode from "../kd/song_node.js";
import {
  getTrackIDsInPlaylist,
  getTracksAudioFeatures,
  getTopUserTracks,
  getUserId,
  createPlaylist,
  addSongsToPlaylist,
} from "../spotify/index";
import mongoose from "mongoose";
import CountrySchema from "../mongo/models/country";
import country from "../mongo/models/country";
import { SERVER_ERROR } from "../errors";

dotenv.config();

const countryRouter = Router();

countryRouter.get("/:name", async (req, res) => {
  try {
    // Get name and Auth token from user
    const countryName = req.params.name;
    const authToken = req.header("Authorization");

    // Get top tracks (array of song IDs)
    const topTracks = await getTopUserTracks(authToken);
    // Handle edge case
    if (topTracks.length == 0) {
      // TODO: Handle later
    }

    // Gets audio features for <= 100 tracks from user
    let audioFeaturesRes = await getTracksAudioFeatures(
      authToken,
      topTracks.data
    );

    // Validate audio features reponse (make sure request actually went through)
    if (audioFeaturesRes.status != 200) {
      throw SERVER_ERROR();
    }
    let tracksAudioFeatures = audioFeaturesRes.data;

    // Creates song nodes for every song
    let nodes = tracksAudioFeatures.map((song) => new SongNode(song));

    // Average song nodes to find user's `~vibe~`
    let avg = SongNode.average(nodes);

    // Get country from mongoDB

    let countryDocument = await CountrySchema.findOne({
      country: countryName,
    });
    if (!countryDocument) {
      throw SERVER_ERROR("Database Error");
    }

    // Get tree from document
    let serializedTree = countryDocument.tree;

    // Deserialize tree
    let tree = deserializeKDT(serializedTree);

    // Find 20 nearest neighbors
    let knn = kNearest(tree, 20, avg);

    // Get user id (for making playlist)
    let userIdRes = await getUserId(authToken);
    if (userIdRes.status != 200) {
      throw SERVER_ERROR();
    }
    let userId = userIdRes.data;

    // Make a new spotify playlist
    let playlistIdRes = await createPlaylist(authToken, userId, countryName);
    if (playlistIdRes.status != 200) {
      throw SERVER_ERROR();
    }
    let newPlaylistId = playlistIdRes.data;

    // Add songs to new playlist
    let addedSongRes = await addSongsToPlaylist(authToken, newPlaylistId, knn);
    if (addedSongRes.status != 200) {
      throw SERVER_ERROR();
    }

    res.status(200).json({ playlistID: newPlaylistId });
  } catch (e) {
    res.status(e?.code || 500).send(e?.message || "Something went wrong");
  }
});

export default countryRouter;
