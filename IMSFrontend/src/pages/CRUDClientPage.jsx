import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const CRUDClientPage = () => {
  const { clientId } = useParams("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (clientId) {
      setIsEditing(true);

      const fetchClient = async () => {
        try {
          const clientData = await ApiService.getClientById(clientId);
          if (clientData.status === 200) {
            setEmail(clientData.client.email);
          }
        } catch (error) {
          showMessage(
            error.response?.data?.message ||
              "Error Getting a Client by Id: " + error
          );
        }
      };
      fetchClient();
    }
  }, [clientId]);

  //handle form submission for both add and edit client
  const handleSubmit = async (e) => {
    e.preventDefault();
    const clientData = { email };

    try {
      if (isEditing) {
        await ApiService.updateClient(clientId, clientData);
        showMessage("Client Edited succesfully");
        navigate("/Client")
      } else {
        await ApiService.addClient(clientData);
        showMessage("Client Added succesfully");
        navigate("/Client")
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message ||
          "Error Getting a Client by Id: " + error
      );
    }
  };

  //metjhod to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="supplier-form-page">
        <h1>{isEditing ? "Edit Client" : "Add Client"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Client Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="text"
            />
          </div>
          <button type="submit">
            {isEditing ? "Edit Client" : "Add Client"}
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default CRUDClientPage;