import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate, useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [message, setMessage] = useState("");
  const [orderStatus, setOrderStatus] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const getOrder = async () => {
      try {
        const orderData = await ApiService.getOrderById(orderId);

        if (orderData.status === 200) {
            setOrder(orderData.order);
            setOrderStatus(orderData.order.orderStatus);
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting an order: " + error
        );
      }
    };

    getOrder();
  }, [orderId]);


//update transaction status
const handleUpdateStatus = async()=>{
    try {
        ApiService.updateOrderStatus(orderId, orderStatus);
        navigate("/orders")
    } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Updating an order: " + error
        );
        
    }
}


  //Method to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };



  return(
    <Layout>
        
      {message && <p className="message">{message}</p>}
      <div>
        {order && (
           <>
           <div>
                <h2>Order Information</h2>
                <p>Type: {order.orderType}</p>
                <p>Status: {order.orderStatus}</p>
                <p>Description: {order.description}</p>
                <p>Product Quantity: {order.productQuantity}</p>
                <p>Total Price: {order.totalPrice.toFixed(2)}</p>
                <p>Create AT: {new Date(order.createdAt).toLocaleString()}</p>

                {order.updatedAt && (
                <p>Updated At: {new Date(order.updatedAt).toLocaleString()}</p>
                )}
           </div>

           {/* Product information */}
           <div>
                <h2>Product Information</h2>
                <p>Name: {order.product.name}</p>
                <p>SKU: {order.product.sku}</p>
                <p>Price: {order.product.price.toFixed(2)}</p>
                <p>Stock Quantity: {order.product.stockQuantity}</p>
                <p>Description: {order.product.description}</p>                
           </div>

           {/* User information */}
           <div>
                <h2>User Information</h2>
                <p>Name: {order.user.username}</p>
                <p>Email: {order.user.email}</p>
                <p>Role: {order.user.role}</p>
           </div>

           {/* UPDATE ORDER STATUS */}
           <div>
            <label>Order Status: </label>
            <select 
            value={orderStatus}
            onChange={(e)=> setOrderStatus(e.target.value)}
            >
                <option value="PENDING">PENDING</option>
                <option value="PROCESSING">PROCESSING</option>
                <option value="COMPLETED">COMPLETED</option>
            </select>
            <button onClick={()=>handleUpdateStatus()}>Update Status</button>
           </div>
           </>
        )}
      </div>
    </Layout>
  )
};

export default OrderDetailsPage;