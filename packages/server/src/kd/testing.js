import KDT from "kd-tree-javascript";
import SongNode from "./song_node";
import {
  makeSerializedKDT,
  deserializeKDT,
  kNearest,
  makeUserNode,
} from "./utilities";
import {
  getTrackIDsInPlaylist,
  getTracksAudioFeatures,
  getTopUserTracks,
} from "../spotify/index.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import CountrySchema from "../mongo/models/country";

// eslint-disable-next-line no-unused-vars
const { kdTree } = KDT;
dotenv.config();

/**
 * converts the song ids in multiple playlists to a single set of song ids
 *
 * @param {[[string]]} playlists an array of playlists. each playlist is an array of song ids
 * @return {Set(string)} an a array of <=100 song ids
 *
 */
const get100Tracks = (playlists) => {
  let i = 0;
  let playlist = 0;
  const tracks = new Set();

  while (i < 100 && tracks.size < 100) {
    if (playlist >= playlists.length) {
      playlist = 0;
      i++;
    }
    if (i < playlists[playlist].length) {
      tracks.add(playlists[playlist][i]);
    }
    playlist++;
  }
  return tracks;
};

// You Say Run
// output from https://developer.spotify.com/console/get-audio-features-track/?id=7bSs1huD3G3nzU7VnG0t2Q
const f1 = {
  danceability: 0.428,
  energy: 0.985,
  key: 4,
  loudness: -1.708,
  mode: 0,
  speechiness: 0.13,
  acousticness: 0.0306,
  instrumentalness: 0.0000067,
  liveness: 0.11,
  valence: 0.513,
  tempo: 87.497,
  type: "audio_features",
  id: "7bSs1huD3G3nzU7VnG0t2Q",
  uri: "spotify:track:7bSs1huD3G3nzU7VnG0t2Q",
  track_href: "https://api.spotify.com/v1/tracks/7bSs1huD3G3nzU7VnG0t2Q",
  analysis_url:
    "https://api.spotify.com/v1/audio-analysis/7bSs1huD3G3nzU7VnG0t2Q",
  duration_ms: 281896,
  time_signature: 4,
};

// POP/STARS
// output from https://developer.spotify.com/console/get-audio-features-track/?id=5sbooPcNgIE22DwO0VNGUJ
const f2 = {
  danceability: 0.566,
  energy: 0.769,
  key: 7,
  loudness: -4.342,
  mode: 1,
  speechiness: 0.0872,
  acousticness: 0.0183,
  instrumentalness: 0,
  liveness: 0.108,
  valence: 0.385,
  tempo: 170.036,
  type: "audio_features",
  id: "5sbooPcNgIE22DwO0VNGUJ",
  uri: "spotify:track:5sbooPcNgIE22DwO0VNGUJ",
  track_href: "https://api.spotify.com/v1/tracks/5sbooPcNgIE22DwO0VNGUJ",
  analysis_url:
    "https://api.spotify.com/v1/audio-analysis/5sbooPcNgIE22DwO0VNGUJ",
  duration_ms: 191100,
  time_signature: 4,
};

// Unravel
// output from https://developer.spotify.com/console/get-audio-features-track/?id=1rN9QoVxw5U7TJkyaUR8C1
const f3 = {
  danceability: 0.508,
  energy: 0.889,
  key: 7,
  loudness: -2.755,
  mode: 0,
  speechiness: 0.0862,
  acousticness: 0.0495,
  instrumentalness: 0,
  liveness: 0.0984,
  valence: 0.332,
  tempo: 135.014,
  type: "audio_features",
  id: "1rN9QoVxw5U7TJkyaUR8C1",
  uri: "spotify:track:1rN9QoVxw5U7TJkyaUR8C1",
  track_href: "https://api.spotify.com/v1/tracks/1rN9QoVxw5U7TJkyaUR8C1",
  analysis_url:
    "https://api.spotify.com/v1/audio-analysis/1rN9QoVxw5U7TJkyaUR8C1",
  duration_ms: 238360,
  time_signature: 4,
};

// eslint-disable-next-line no-unused-vars
const s1 = new SongNode(f1);
// eslint-disable-next-line no-unused-vars
const s2 = new SongNode(f2);
// eslint-disable-next-line no-unused-vars
const s3 = new SongNode(f3);

const main = async () => {
  const myTopTracksRes = await getTopUserTracks(
    "Bearer BQCX1DGfIa5bkKzs6mVdaYUgMdYc1LjUEueu8lv-5Og0FX0Y88gfGSp2mXKNBRgWwdyD8_BjPinKSoyTkeZVSSJJzBFZI7dWyKpSeTsZN4DN0tHlIj8JlRRU31C1R4uGHg-ojPq1bM8UW87fU122EPPtNSeorNkVn6Mf"
  );
  if (myTopTracksRes.status != 200) {
    return;
  }

  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected to Mongodb");
  });

  let countryDocument = await CountrySchema.findOne({ country: "Austria" });
  mongoose.connection.close();

  let countryTree = countryDocument.tree;
  let acutualTree = deserializeKDT(countryTree);

  // Create average vector for user
  let nodes = myTopTracksRes.data.map((id) => new SongNode(id));
  let avg = SongNode.average(nodes);

  // Find k-nearest neighbors
  let neighbors = kNearest(acutualTree, 20, avg);
};

main();
