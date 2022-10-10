import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { io } from "socket.io-client";
import Likes from "./Likes";

const socket = io("http://localhost:1133");
const Users = () => {
  const [data, setData] = useState([]);
  const [test, setTest] = useState("");

  const getData = async () => {
    await axios.get("http://localhost:1133/user").then((res) => {
      setData(res.data.data);
    });
  };
  const getPost = async () => {
    await axios.post("http://localhost:1133/user/create", { name: test });
  };
  console.log(data);
  useEffect(() => {
    getData();

    socket.on("newEntry", (newData) => {
      setData([...data, newData]);
      console.log(newData);
    });
  }, [data]);

  return (
    <Container>
      <Card>
        <HeadText>Enter a Card Name</HeadText>
        <Input
          type="text"
          placeholder="enter Name"
          value={test}
          onChange={(e) => {
            setTest(e.target.value);
          }}
        />
        <Button onClick={getPost}>Add Name</Button>
      </Card>
      <LikeCont>
        {data.map((props) => (
          <LikeHold key={props._id}>
            <ImageHold>
              <img src="/plat.jpg" alt="loading" />
            </ImageHold>
            <LikeName>{props.name}</LikeName>
            <Like>
              {/* <Icon /> */}
              <Likes props={props} />
              <Count>{props.like.length}</Count>
            </Like>
          </LikeHold>
        ))}
      </LikeCont>
    </Container>
  );
};

export default Users;
const Count = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
`;
const Icon = styled(FaUser)`
  font-size: 20px;
  color: red;
  margin-left: 30px;
`;
const Like = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const LikeCont = styled.div`
  width: 1200px;
  height: auto;
  display: flex;
  justify-content: center;
  padding: 9px 0 0 0;
  align-items: center;
  flex-wrap: wrap;
  /* background: red; */
`;
const LikeName = styled.div`
  font-size: 17px;
`;
const ImageHold = styled.div`
  width: 320px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: green; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const LikeHold = styled.div`
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  /* background: blue; */
`;
const Button = styled.div`
  width: 100px;
  height: 40px;
  background: #00bcd4;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  margin-bottom: 10px;
`;
const Input = styled.input`
  width: 250px;
  height: 30px;
  outline: none;
  margin-bottom: 10px;
  border: 1px solid grey;
  padding: 3px 7px;

  ::placeholder {
    font-size: 17px;
    font-family: poppins;
  }
`;
const HeadText = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
const Card = styled.div`
  height: 120px;
  width: 380px;
  /* background-color: red; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
`;
const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: poppins;
  flex-direction: column;
`;
