import express, { Express } from "express";
import type { Request, Response } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

// Determine root domain
let rootDomain =
  process.env.NODE_ENV == "development"
    ? process.env.ROOT_DOMAIN_DEV
    : process.env.ROOT_DOMAIN_PROD;

const app: Express = express();
const port = 3005;
const route = "/api_v1";

app.use(cookieParser());
app.use(cors({ origin: rootDomain, credentials: true }));
app.use(bodyParser.json());

// Health
app.get(route + "/health", async (req: Request, res: Response) => {
  return res.status(200).json({ message: "Healthy" });
});

// Logout
app.get(route + "/logout", async (req: Request, res: Response) => {
  res.cookie("server-access-token", { expires: Date.now() });
  res.cookie("server-refresh-token", { expires: Date.now() });
  return res.status(200).json({ message: "Cookies expired" });
});

// Store Auth Cookies
app.post(route + "/store-auth", async (req: Request, res: Response) => {
  // Guard: Ensure tokens
  if (!req?.body?.accessToken || !req?.body?.refreshToken) {
    return res.status(401).json({ message: "Missing token(s)" });
  }

  // Get tokens
  const accessToken = req.body.accessToken;
  const refreshToken = req.body.refreshToken;

  // Determine expiration
  const dateAccess = new Date();
  const dateRefresh = new Date();
  dateAccess.setHours(dateAccess.getHours() + 1);
  dateRefresh.setDate(dateRefresh.getDate() + 1);

  // Set Cookies - access token
  res.cookie("server-access-token", accessToken, {
    secure: process.env.NODE_ENV != "development",
    httpOnly: true,
    expires: dateAccess,
    sameSite: "lax",
  });

  // Set Cookies - refresh token
  res.cookie("server-refresh-token", refreshToken, {
    secure: process.env.NODE_ENV != "development",
    httpOnly: true,
    expires: dateRefresh,
    sameSite: "lax",
  });

  // Return response
  return res.status(200).json({ message: "Tokens stored" });
});

app.listen(port, () => {
  console.log("Backend server listening on port " + port);
});
