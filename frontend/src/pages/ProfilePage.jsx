import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedData, setSelectedData] = useState("amount");
  const [orderData, setOrderData] = useState({});
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderResponse = await ApiService.getOrderByUserId(user.id);
        console.log(user.id);
        console.log(orderResponse.orders);
        if (orderResponse.status === 200) {
            setOrderData(
            transformOrderData(
              orderResponse.orders,
              selectedMonth,
              selectedYear
            )
          );
        }
      } catch (error) {
        showMessage(
          error.response?.data?.message || "Error Loggin in a User: " + error
        );
      }
    };
    if(user) fetchData();
  }, [user, selectedMonth, selectedYear, selectedData]);

  const transformOrderData = (orders, month, year) => {
    const dailyData = {};
    //get number of days in the selected month year
    const daysInMonths = new Date(year, month, 0).getDate();
    //initilaize each day in the month with default values
    for (let day = 1; day <= daysInMonths; day++) {
      dailyData[day] = {
        day,
        count: 0,
        amount: 0,
      };
    }
    //process each order to accumulate daily counts and amount
    orders.forEach((order) => {
      const orderDate = new Date(order.createdAt);
      const orderMonth = orderDate.getMonth() + 1;
      const orderYear = orderDate.getFullYear();

      //If order falls withing selected month and year, accumulate data for the day
      if (orderMonth === month && orderYear === year) {
        const day = orderDate.getDate();
        dailyData[day].count += 1;
        dailyData[day].amount += order.totalPrice;
      }
    });
    //convert dailyData object for chart compatibility
    return Object.values(dailyData);
  };

  //event handler for month selection or change
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value, 10));
  };

  //event handler for year selection or change
  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value, 10));
  };


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
      <div className="dashboard-page">
        <div className="button-group">
          <button onClick={() => setSelectedData("count")}>
            Total Orders
          </button>
          <button onClick={() => setSelectedData("amount")}>Amount</button>
        </div>
      </div>
      <div className="dashboard-content">
          <div className="filter-section">
            <label htmlFor="month-select">Select Month: </label>
            <select id="month-select" value={selectedMonth} onChange={handleMonthChange}>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>

            <label htmlFor="year-select">   Select Year: </label>
            <select id="year-select" value={selectedYear} onChange={handleYearChange}>
              {Array.from({ length: 5 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Display the chart */}
          <div className="chart-section">
            <div className="chart-container">
                <h3>Daily Status</h3>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={orderData}>
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day" label={{value: "Day", position: "insideBottomRight", offset: -5}}/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Line type={"monotone"}
                        dataKey={selectedData}
                        stroke="#008080"
                        fillOpacity={0.3}
                        fill="#008080"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
          </div>
        </div>
    </Layout>
  );
};
export default ProfilePage;