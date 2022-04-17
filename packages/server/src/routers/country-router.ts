import { Router } from 'express';
import dotenv from 'dotenv';
import axios from 'axios';
import { SERVER_ERROR } from '../../errors.js';
import { makeSerializedKDT deserializeKDT, kNearest } from '../kd/utilities';
import SongNode from '../kd/song_node.js';
import { getTrackIDsInPlaylist, getTracksAudioFeatures, getTopUserTracks } from '../spotify/index';
import mongoose from 'mongoose';
import CountrySchema from '../mongo/models/country';
import country from '../mongo/models/country';

dotenv.config();

const countryRouter = Router();



countryRouter.get<{ name: string }, any, {}>('/:name', async (req, res) => {
	// Get name and Auth token from user
	const countryName = req.params.name;
	const authToken = req.header('Authorization');
	

	// Get top tracks (array of song IDs)
	const topTracks = await getTopUserTracks(authToken);

	// Handle edge case
	if (topTracks.length == 0){
		// TODO: Handle later
	}

	// Gets audio features for <= 100 tracks from user
	let audioFeaturesRes = await getTracksAudioFeatures(topTracks);

	// Validate audio features reponse (make sure request actually went through)
	if(audioFeaturesRes.status != 200){
		res.status(audioFeaturesRes.status).json({error: "Something went wrong"});
	}
	let tracksAudioFeatures = audioFeaturesRes.data;

	// Creates song nodes for every song
	let nodes = tracksAudioFeatures.map(song => new SongNode(song));

	// Average song nodes to find user's `~vibe~`
  let avg = SongNode.average(nodes);

	// Get country from mongoDB
	
	let countryDocument = await CountrySchema.findOne({country: countryName});
	if(!countryDocument){
		res.status(500).json({error: "Error contacting database"})
	}
	
	// Get tree from document
  let serializedTree = countryDocument.tree;

	// Deserialize tree
  let tree = deserializeKDT(serializedTree);

	// Find 20 nearest neighbors
  let knn = kNearest(tree, 20, avg);
	
	// Start making playlist
});

export default countryRouter;
