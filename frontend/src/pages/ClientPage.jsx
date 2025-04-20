import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";

const ClientPage = () => {
  const [clients, setClients] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    //fetch all clients
    const getClients = async () => {
      try {
        const responseData = await ApiService.getAllClients();
        if (responseData.status === 200) {
          setClients(responseData.clients);
        } else {
          showMessage(responseData.message);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting Clients: " + error
        );
        console.log(error);
      }
    };
    getClients();
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };


//Delete Client
const handleDeleteClient = async (clientId) => {
  try {
    if (window.confirm("Are you sure you want to delete this client? ")) {
      await ApiService.deleteClient(clientId);
      window.location.reload();
    }
  } catch (error) {
    showMessage(
      error.response?.data?.message || "Error Deleting a Clients: " + error
    );
  }
};



return(
    <Layout>
        {message && <div className="message">{message}</div>}
        <div className="supplier-page">
            <div className="supplier-header">
                <h1>Clients</h1>
                <div className="add-sup">
                    <button onClick={()=> navigate("/add-client")} >Add Client</button>
                </div>
            </div>
        </div>

        {clients && 
        <ul className="client-list">

            {clients
                .filter((client) => client.id !== 1)
                .map((client) => (
                    <li className="client-item" key={client.id}>
                        <span>{client.email}</span>

                        <div className="client-actions">
                            <button onClick={() => navigate(`/edit-client/${client.id}`)}>Edit</button>
                            <button onClick={() => handleDeleteClient(client.id)}>Delete</button>
                        </div>
                    </li>
                )
            )}

        </ul>
        
        }
    </Layout>
)

}
export default ClientPage;