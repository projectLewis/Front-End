import React, { useState, useEffect } from "react";
import { Checkbox, Input, Button } from "semantic-ui-react";
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
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          name="username"
          placeholder="username"
          onChange={handleChanges}
          value={userData.username}
        />
        <Input
          name="password"
          placeholder="password"
          onChange={handleChanges}
          value={userData.name}
        />
        <Input
          name="firstName"
          placeholder="First Name"
          onChange={handleChanges}
          value={userData.firstName}
        />
        <Input
          name="lastName"
          placeholder="Last Name"
          onChange={handleChanges}
          value={userData.lastName}
        />
        <Input
          name="bio"
          placeholder="Bio"
          onChange={handleChanges}
          value={userData.bio}
        />
        <Input
          name="email"
          placeholder="email"
          onChange={handleChanges}
          value={userData.email}
        />
        <Checkbox toggle label="email notifications" onChange={handleChanges} />
        <Input
          name="country"
          placeholder="country"
          onChange={handleChanges}
          value={userData.country}
        />
        <Button>Update</Button>
      </form>
    </div>
  );
}

export default EditProfile;
