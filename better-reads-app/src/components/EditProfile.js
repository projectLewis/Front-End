import React, { useState, useEffect } from "react";
import { Form, Checkbox, Input, Button, Container } from "semantic-ui-react";
import axios from "axios";
import { axiosWithAuth } from "../functions/authorization";

function EditProfile(props) {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    emailNotifications: false,
    country: "",
    bio: "",
  });
  const [gettingUserData, setGettingUserData] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const userId = localStorage.getItem("user_id");
  console.log("this is the userData object", userData);

  // get user info
  useEffect(() => {
    if (gettingUserData) {
      axios
        .get(`https://better-reads-db.herokuapp.com/api/users/${userId}`)
        .then(res => {
          console.log("this is the get response for user info", res);
          setUserData(res.data);
          setGettingUserData(false);
        })
        .catch(console.log);
    }
  }, [gettingUserData, userData, userId]);

  // update user info
  useEffect(() => {
    if (isUpdating) {
      axiosWithAuth()
        .put(
          `https://better-reads-db.herokuapp.com/api/users/${userId}`,
          userData,
        )
        .then(res => {
          console.log("updated user info", res);
          setUserData(res.data);
          setIsUpdating(false);
        })
        .catch(err => console.log(err.message));
    }
  }, [isUpdating, userData, userId]);

  const handleSubmit = e => {
    e.preventDefault();
    setIsUpdating(true);
  };

  const handleChanges = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container style={{ minHeight: "80vh" }}>
      <Form onSubmit={handleSubmit} style={{ margin: "40px" }}>
        <Form.Group widths="equal">
          <Form.Input fluid placeholder="Username" />
          <Form.Input fluid placeholder="Password" type="password" />
          <Form.Input fluid placeholder="First name" />
          <Form.Input fluid placeholder="Last name" />
        </Form.Group>
        <Form.TextArea placeholder="Tell us more about you..." />
        <Form.Group widths="equal">
          <Form.Input fluid placeholder="Country" />
          <Form.Input fluid placeholder="Email" type="email" />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Checkbox toggle label="Email notifications" />
        </Form.Group>
        <Form.Button>Update</Form.Button>
      </Form>
    </Container>
  );
}

export default EditProfile;
