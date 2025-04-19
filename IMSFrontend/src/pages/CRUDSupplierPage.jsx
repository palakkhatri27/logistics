import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const CRUDSupplierPage = () => {
  const { supplierId } = useParams("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (supplierId) {
      setIsEditing(true);

      const fetchSupplier = async () => {
        try {
          const supplierData = await ApiService.getSupplierById(supplierId);
          if (supplierData.status === 200) {
            setEmail(supplierData.supplier.email);
          }
        } catch (error) {
          showMessage(
            error.response?.data?.message ||
              "Error Getting a Supplier by Id: " + error
          );
        }
      };
      fetchSupplier();
    }
  }, [supplierId]);

  //handle form submission for both add and edit supplier
  const handleSubmit = async (e) => {
    e.preventDefault();
    const supplierData = { email };

    try {
      if (isEditing) {
        await ApiService.updateSupplier(supplierId, supplierData);
        showMessage("Supplier Edited succesfully");
        navigate("/supplier")
      } else {
        await ApiService.addSupplier(supplierData);
        showMessage("Supplier Added succesfully");
        navigate("/supplier")
      }
    } catch (error) {
      showMessage(
        error.response?.data?.message ||
          "Error Getting a Supplier by Id: " + error
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
        <h1>{isEditing ? "Edit Supplier" : "Add Supplier"}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Supplier Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              type="text"
            />
          </div>
          <button type="submit">
            {isEditing ? "Edit Supplier" : "Add Supplier"}
          </button>
        </form>
      </div>
    </Layout>
  );
};
export default CRUDSupplierPage;