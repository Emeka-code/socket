import React from "react";
import { io } from "socket.io-client";
import Users from "./Components/Users";

io("http://localhost:1133");

const App = () => {
  return (
    <div>
      <Users />
    </div>
  );
};

export default App;
