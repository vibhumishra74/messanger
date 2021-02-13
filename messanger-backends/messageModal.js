import mongoose from "mongoose";

let messageSchema = mongoose.Schema({
  username: String,
  message: String,
  timestamp: String,
});

export default mongoose.model("messages", messageSchema);
