import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const authRouter = Router();

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com";
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const SITE_REDIRECT_URL = process.env.SITE_REDIRECT_URL;

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
  try {
    // TODO: use res.redirect when deployed
    if (AUTH_REDIRECT_URL)
      res.json({ redirectUrl: encodeURI(AUTH_REDIRECT_URL) });
  } catch (err: any) {
    console.error(err);
    res.status(err?.code ?? 500).end(err?.message ?? "Unknown Error");
  }
});

authRouter.post<{}, any, { code: string }>("/token", async (req, res) => {
  if (!req.body.code) res.status(400).send();
  try {
    axios
      .post(
        SPOTIFY_AUTH_URL + "/api/token",
        new URLSearchParams({
          grant_type: "authorization_code",
          code: req.body.code,
          redirect_uri: encodeURI(SITE_REDIRECT_URL || ""),
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
        const expirationDate = new Date();
        expirationDate.setSeconds(
          expirationDate.getSeconds() + data.expires_in
        );
        res.status(200).send({
          redirectUrl: SITE_REDIRECT_URL,
          accessToken: data.access_token,
        });
      })
      .catch((e: any) => {
        console.error(e.message);
        res.status(400).send();
      });
  } catch (err: any) {
    console.error(err);
    res.status(err?.code ?? 500).end(err?.message ?? "Unknown Error");
  }
});

export default authRouter;
