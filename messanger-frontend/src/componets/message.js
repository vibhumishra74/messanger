import { Card, CardContent, Typography } from "@material-ui/core";
import React, { forwardRef } from "react";
import "./Message.css";

const Message = forwardRef(({ message, username }, ref) => {
  let isuser = username === message.username;
  return (
    <div ref={ref} className={`message ${isuser && "message__user"}`}>
      <Card className={isuser ? "message__usercart" : "message__guestcart"}>
        <CardContent>
          <Typography color="textSecondary" variant="h5" component="h2">
            {!isuser && ` ${message.username || "Unknown User"}: `}{" "}
            {message.message}{" "}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
});

export default Message;
