import { useEffect, useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiShoppingBag,
  FiDollarSign,
  FiClock,
} from "react-icons/fi";

const API_URL = "http://localhost:3000";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalCustomers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    recentOrders: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================
  // LOAD DASHBOARD
  // =========================

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login as admin");
        }

        const response = await fetch(
          `${API_URL}/admin/dashboard`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load dashboard"
          );
        }

        if (isMounted) {
          setDashboard({
            totalUsers: data.totalUsers || 0,
            totalCustomers: data.totalCustomers || 0,
            totalOrders: data.totalOrders || 0,
            totalRevenue: data.totalRevenue || 0,
            recentOrders: data.recentOrders || [],
          });

          setError("");
        }
      } catch (err) {
        console.error("Dashboard error:", err);

        if (isMounted) {
          setError(
            err.message || "Failed to load dashboard"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="admin-page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome back, Admin</p>
        </div>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="dashboard-grid">

        {/* USERS */}

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <FiUsers />
          </div>

          <div className="dashboard-card-content">
            <p>Total Users</p>
            <h2>{dashboard.totalUsers}</h2>
          </div>
        </div>

        {/* CUSTOMERS */}

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <FiUserCheck />
          </div>

          <div className="dashboard-card-content">
            <p>Total Customers</p>
            <h2>{dashboard.totalCustomers}</h2>
          </div>
        </div>

        {/* ORDERS */}

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <FiShoppingBag />
          </div>

          <div className="dashboard-card-content">
            <p>Total Orders</p>
            <h2>{dashboard.totalOrders}</h2>
          </div>
        </div>

        {/* REVENUE */}

        <div className="dashboard-card">
          <div className="dashboard-card-icon">
            <FiDollarSign />
          </div>

          <div className="dashboard-card-content">
            <p>Total Revenue</p>
            <h2>
              Rs.{" "}
              {Number(
                dashboard.totalRevenue
              ).toLocaleString()}
            </h2>
          </div>
        </div>

      </div>

      {/* =========================
          RECENT ORDERS
      ========================= */}

      <div className="admin-card dashboard-orders">

        <div className="admin-card-header">
          <div>
            <h2>Recent Orders</h2>
            <p>Latest orders from your store</p>
          </div>

          <FiClock />
        </div>

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>

              {dashboard.recentOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    style={{
                      textAlign: "center",
                      padding: "30px",
                    }}
                  >
                    No orders found
                  </td>
                </tr>
              ) : (

                dashboard.recentOrders.map(
                  (order) => (
                    <tr key={order._id}>

                      <td>
                        #{order._id.slice(-6).toUpperCase()}
                      </td>

                      <td>
                        {order.userId?.name ||
                          "Unknown"}
                      </td>

                      <td>
                        {order.userId?.email ||
                          "-"}
                      </td>

                      <td>
                        Rs.{" "}
                        {Number(
                          order.totalAmount || 0
                        ).toLocaleString()}
                      </td>

                      <td>
                        <span className="status">
                          {order.status ||
                            "Pending"}
                        </span>
                      </td>

                      <td>
                        {order.createdAt
                          ? new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                    </tr>
                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
