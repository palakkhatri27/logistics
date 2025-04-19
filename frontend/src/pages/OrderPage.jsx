import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/Pagination";

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [filter, setFilter] = useState("");
  const [valueToSearch, setValueToSearch] = useState("");

  const navigate = useNavigate();

  //Pagination Set-Up
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const getOrders = async () => {
      try {
        const ordersData = await ApiService.getAllOrders(valueToSearch);

        if (ordersData.status === 200) {
          setTotalPages(Math.ceil(ordersData.orders.length / itemsPerPage));

          setOrders(
            ordersData.orders.slice(
              (currentPage - 1) * itemsPerPage,
              currentPage * itemsPerPage
            )
          );
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Getting Orders: " + error
        );
      }
    };

    getOrders();
  }, [currentPage, valueToSearch]);



  //Method to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };


  //handle search
  const handleSearch = () =>{
    console.log("Searcxh hit")
    console.log("FILTER IS: " + filter)
    setCurrentPage(1)
    setValueToSearch(filter)
  }

  //Navigate to orders details page
  const navigateToOrderDetailsPage = (orderId) =>{
    navigate(`/orders/${orderId}`);
  }

  return (
    <Layout>

      {message && <p className="message">{message}</p>}
      <div>
        <div className="order-page-container">
            <h1>Orders</h1>
            <div className="search-container">
                <input 
                placeholder="Search order ..."
                value={filter}
                onChange={(e)=> setFilter(e.target.value)}
                type="text" />
                <button onClick={()=> handleSearch()} > Search</button>
            </div>
        </div>

        {orders && 
            <table>
                <thead>
                    <tr>
                        <th>TYPE</th>
                        <th>STATUS</th>
                        <th>TOTAL PRICE</th>
                        <th>PRODUCT QUANTITY</th>
                        <th>DATE</th>
                        <th>ACTION</th>
                    </tr>
                </thead>

                <tbody>
                    {orders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.orderType}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.productQuantity}</td>
                            <td>{new Date(order.createdAt).toLocaleString()}</td>

                            <td>
                                <button onClick={()=> navigateToOrderDetailsPage(order.id)}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
      </div>

      <div className="pagination-container">
      <PaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      />
      </div>
    </Layout>
  );
};
export default OrderPage;