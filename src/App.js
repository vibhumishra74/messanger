import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import db from "./componets/firebase";
import Message from "./componets/message";
import firebase from "firebase";
import Flipmove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";

function App() {
  const [input, setInput] = useState("");
  const [messages, setmessage] = useState([]);
  const [username, setusername] = useState("");
  // set dynamic user
  useEffect(() => {
    // do {
    setusername(prompt("please enter your name"));
    // } while (!username);
  }, []);

  // maping on start from database

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        setmessage(
          snap.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  let inputs = (e) => {
    return [setInput(e.target.value)];
  };
  let sendMessage = (e) => {
    e.preventDefault();

    // pushed to server
    db.collection("messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    // this is for local
    // setmessage([...messages, { username: username, message: input }]);

    // empty the field value
    setInput("");
  };
  return (
    <div className="App">
      {
        <img
          src="https://facebookbrand.com/wp-content/uploads/2020/10/Logo_Messenger_NewBlurple-399x399-1.png?w=100&h=100"
          alt="messanger logo"
        />
      }
      <h1>hello {username} lets rock</h1>
      <h2>Welcome {username}</h2>
      <form className="app__form">
        <FormControl className="app__formcontrol">
          {/* <InputLabel htmlFor="my-input">Enter your Message</InputLabel> */}
          <Input
            className="app__input"
            placeholder="Enter your Message..."
            value={input}
            onChange={inputs}
          />
          <IconButton
            className="app__iconbutton"
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>
      <Flipmove>
        {messages.map(({ id, message }) => {
          return <Message key={id} message={message} username={username} />;
        })}
      </Flipmove>
    </div>
  );
}

export default App;
