import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { SERVER_ERROR } from "../../errors";

dotenv.config();

const authRouter = Router();

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SITE_REDIRECT_URL = process.env.SITE_REDIRECT_URL;

// This is the URL the user is sent to in order to sign in thru Spotify
const AUTH_REDIRECT_URL =
  CLIENT_ID && SITE_REDIRECT_URL
    ? SPOTIFY_AUTH_URL +
      "/authorize" +
      `?client_id=${CLIENT_ID}` +
      "&response_type=code" +
      `&redirect_uri=${encodeURI(SITE_REDIRECT_URL)}` +
      "&scope=user-top-read" +
      "&show_dialog=true"
    : null;

authRouter.post<{}, any, { redirectUrl: string }>("/code", async (req, res) => {
  if (!AUTH_REDIRECT_URL) res.status(500).send();
  else {
    try {
      res.json({ redirectUrl: encodeURI(AUTH_REDIRECT_URL) });
    } catch (err: any) {
      console.error(err);
      res.status(err?.code ?? 500).end(err?.message ?? "Unknown Error");
    }
  }
});

authRouter.post<{}, any, { code: string }>("/token", async (req, res) => {
  if (!req.body.code) res.status(400).send();
  if (!SITE_REDIRECT_URL) res.status(500).send();
  else {
    try {
      axios
        .post(
          SPOTIFY_AUTH_URL + "/api/token",
          // Encoding our params into the "application/x-www-form-urlencoded" form that Spotify expects
          new URLSearchParams({
            grant_type: "authorization_code",
            code: req.body.code,
            redirect_uri: encodeURI(SITE_REDIRECT_URL),
          }),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization:
                "Basic " +
                Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
            },
          }
        )
        .then(({ data }) => {
          res.status(200).send({
            redirectUrl: SITE_REDIRECT_URL,
            accessToken: data.access_token,
          });
        })
        .catch((e: any) => {
          throw SERVER_ERROR("Error fetching access token.");
        });
    } catch (err: any) {
      console.error(err);
      res.status(err?.code ?? 500).end(err?.message ?? "Unknown Error");
    }
  }
});

export default authRouter;
