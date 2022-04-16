import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();

const authRouter = Router();

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SITE_REDIRECT_URL = process.env.SITE_REDIRECT_URL;

const AUTH_REDIRECT_URL =
  CLIENT_ID && SITE_REDIRECT_URL
    ? SPOTIFY_AUTH_URL +
      `?client_id=${CLIENT_ID}` +
      "&response_type=code" +
      `&redirect_uri=${encodeURI(SITE_REDIRECT_URL)}` +
      "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private"
    : null;
authRouter.post<{}, any, { redirectUrl: string }>("", async (req, res) => {
  try {
    if (AUTH_REDIRECT_URL)
      res.end(JSON.stringify({ redirectUrl: encodeURI(AUTH_REDIRECT_URL) }));
  } catch (err: any) {
    console.error(err);
    res.status(err?.code ?? 500).end(err?.message ?? "Unknown Error");
  }
});

export default authRouter;
