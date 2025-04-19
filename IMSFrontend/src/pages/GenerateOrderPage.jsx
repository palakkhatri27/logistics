import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";

const GenerateOrderPage = () => {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [description, setDescription] = useState("");
  const [orderType, setOrderType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [supplierId, setSuppplierId] = useState("");
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchproductsSuppliersClients = async () => {
      try {
        const productData = await ApiService.getAllProducts();
        const supplierData = await ApiService.getAllSuppliers();
        const clientData = await ApiService.getAllClients();
        setProducts(productData.products);
        setSuppliers(supplierData.suppliers);
        setClients(clientData.clients);
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting Products: " + error
        );
      }
    };

    fetchproductsSuppliersClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !orderType || !quantity) {
      showMessage("Please fill in all required fields");
      return
    }
    const body = {
      productId,
      quantity: parseInt(quantity),
      orderType,
      description,
      supplierId,
      clientId
    };
    console.log(body)

    try {
      const respone = await ApiService.createOrder(body);
      showMessage(respone.message);
      resetForm();
    } catch (error) {
      showMessage(
        error.response?.data?.message || "Error Purchasing Products: " + error
      );
    }
  };

  const resetForm = () => {
    setProductId("");
    setOrderType("");
    setDescription("");
    setQuantity("");
    setClientId("");
    setSuppplierId("");
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
      <div className="order-form-page">
        <h1>Generate Order</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Select product</label>

            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              required
            >
              <option value="">Select a product</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Select Order Type</label>

            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              required
            >
            <option value="">Select an order type</option>
            <option value="RECEIVE">
                Receive
            </option>
            <option value="SHIP">
                Ship
            </option>
            </select>
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Supplier</label>

            <select
              value={supplierId}
              onChange={(e) => setSuppplierId(e.target.value)}
            >
              <option value="">Select Supplier</option>
              {suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>
                  {supplier.email}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Select Client</label>

            <select
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
            >
              <option value="">Select Client</option>
              {clients.map((client) => (
                <option key={client.id} value={client.id}>
                  {client.email}
                </option>
              ))}
            </select>
          </div>

          <button type="submit">Create New Order</button>
        </form>
      </div>
    </Layout>
  );
};
export default GenerateOrderPage;