const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");

const app = express();

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());

app.post("/", async (req, res) => {
  const client = new OAuth2Client(req.body.clientId);

  const ticket = await client.verifyIdToken({
    idToken: req.body.credential,
    audience: req.body.clientId,
  });
  const payload = ticket.getPayload();
  const userid = payload["sub"];
  console.log(userid, payload);
  res.end();
});

app.listen(6969);
