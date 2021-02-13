import express from "express";
import Pusher from "pusher";
import cors from "cors";
import mongoose from "mongoose";
import messageModal from "./messageModal.js";

//password admin Ui7tFfEGrfDFNGvZ
//config
let app = express();

let port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1154477",
  key: "c4970af7ad7e59ad76ac",
  secret: "13eee0eec15f911e09d1",
  cluster: "ap2",
  useTLS: true,
});

//middle ware

app.use(express.json());
app.use(cors());

// DB connection
let mongoURI =
  "mongodb+srv://admin:Ui7tFfEGrfDFNGvZ@cluster0.wajwy.mongodb.net/messangerDB?retryWrites=true&w=majority";
mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// confirming connection

mongoose.connection.once("open", () => {
  console.log("mongoose connected");

  const change = mongoose.connection.collection("messages").watch();
  change.on("change", (change) => {
    pusher.trigger("messages", "newMessage", {
      change: change,
    });
  });
});

//api call

app.get("/", (req, res) => {
  res.status("200").send("hello world");
});

app.post("/message", (req, res) => {
  const dbmessage = req.body;
  console.log("message:-", dbmessage);

  messageModal.create(dbmessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// all message go here

app.get("/all", (req, res) => {
  messageModal.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      //   console.log("data:-", data);
      //pushing the lated message on top
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(201).send(data);
    }
  });
});

// listening
app.listen(port, () => console.log(`server up and running on port ${port}`));
