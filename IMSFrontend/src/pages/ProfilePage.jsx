import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await ApiService.getLoggedInUsersInfo();
        setUser(userInfo);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Loggin in a User: " + error
        );
      }
    };
    fetchUserInfo();
  }, []);

  //Method> to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="profile-container">
        {user && (
          <div className="profile-card">
            <h1>Hello, {user.username} </h1>
            <div className="profile-info">
              <div>
                <label>Email: </label>
                <span>{user.email}</span>
              </div>
              <div>
                <label>Role: </label>
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
export default ProfilePage;