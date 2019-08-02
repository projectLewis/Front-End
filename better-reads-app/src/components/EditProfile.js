import React, { useState, useEffect } from "react";
import { Form, Container } from "semantic-ui-react";
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

  const handleSubmit = e => {
    e.preventDefault();
    const updatedData = {
      username: userData.username,
      password: userData.password,
      firstName: userData.password,
      email: userData.email,
      emailNotifications: userData.emailNotifications,
      country: userData.country,
      bio: userData.bio,
    };
    setUserData(updatedData);
    setIsUpdating(true);
  };

  const toggleCheckbox = e => {
    setUserData({
      ...userData,
      emailNotifications: !userData.emailNotifications,
    });
  };

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
      console.log(userData)
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

  const handleChanges = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  console.log(userData);

  return (
    <Container style={{ minHeight: "80vh" }}>
      <Form onSubmit={handleSubmit} style={{ margin: "40px" }}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="username"
            placeholder="Username"
            onChange={handleChanges}
            value={userData.username}
          />
          <Form.Input
            fluid
            name="password"
            placeholder="Password"
            type="password"
            onChange={handleChanges}
            value={userData.password}
          />
          <Form.Input
            fluid
            name="firstName"
            placeholder="First name"
            onChange={handleChanges}
            value={userData.firstName}
          />
          <Form.Input
            fluid
            name="lastName"
            placeholder="Last name"
            onChange={handleChanges}
            value={userData.lastName}
          />
        </Form.Group>
        <Form.TextArea
          name="bio"
          placeholder="Tell us more about you..."
          onChange={handleChanges}
          value={userData.bio}
        />
        <Form.Group widths="equal">
          <Form.Input
            fluid
            name="country"
            placeholder="Country"
            onChange={handleChanges}
            value={userData.country}
          />
          <Form.Input
            fluid
            name="email"
            placeholder="Email"
            type="email"
            onChange={handleChanges}
            value={userData.email}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Checkbox
            name="emailNotifications"
            toggle
            checked={userData.emailNotifications}
            label="Email notifications"
            onClick={toggleCheckbox}
            value={userData.emailNotifications}
          />
        </Form.Group>
        <Form.Button>Update</Form.Button>
      </Form>
    </Container>
  );
}

export default EditProfile;
