const express = require("express");

const admin = require("firebase-admin");
const serviceAccount = require("./WhatsUp/web/backend/firebase-config/serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello!");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on PORT ${port}`);
});
