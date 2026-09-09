import { useEffect, useState } from "react";
import {
  FiUsers,
  FiUserCheck,
  FiShoppingCart,
  FiDollarSign,
} from "react-icons/fi";

function Dashboard() {
  const [stats, setStats] = useState({
    users: 0,
    customers: 0,
    orders: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login as admin");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://localhost:3000/admin/dashboard",
          {
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

        setStats({
          users: data.users || 0,
          customers: data.customers || 0,
          orders: data.orders || 0,
          revenue: data.revenue || 0,
        });

        setRecentOrders(data.recentOrders || []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="page-title">
        <h1>Dashboard</h1>
        <p>Welcome back, Admin</p>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        <div className="stat-card purple">
          <div className="stat-card-icon">
            <FiUsers />
          </div>

          <h2>
            {loading ? "..." : stats.users}
          </h2>

          <p>Total Users</p>
        </div>

        <div className="stat-card blue">
          <div className="stat-card-icon">
            <FiUserCheck />
          </div>

          <h2>
            {loading ? "..." : stats.customers}
          </h2>

          <p>Total Customers</p>
        </div>

        <div className="stat-card cyan">
          <div className="stat-card-icon">
            <FiShoppingCart />
          </div>

          <h2>
            {loading ? "..." : stats.orders}
          </h2>

          <p>Total Orders</p>
        </div>

        <div className="stat-card purple">
          <div className="stat-card-icon">
            <FiDollarSign />
          </div>

          <h2>
            {loading
              ? "..."
              : `Rs. ${Number(stats.revenue).toLocaleString()}`
            }
          </h2>

          <p>Total Revenue</p>
        </div>

      </div>

      {/* Error */}
      {error && (
        <div className="login-error" style={{ marginTop: "16px" }}>
          {error}
        </div>
      )}

      {/* Recent Orders */}
      <div
        className="dashboard-card"
        style={{ marginTop: "16px" }}
      >
        <div className="dashboard-card-header">
          <h3>Recent Orders</h3>
          <span>Latest 5 orders</span>
        </div>

        {loading ? (
          <p style={{ color: "#7f8aaa" }}>
            Loading orders...
          </p>
        ) : recentOrders.length === 0 ? (
          <p style={{ color: "#7f8aaa" }}>
            No orders found.
          </p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order._id}>

                    <td>
                      {order.userId?.name ||
                        order.shippingAddress?.fullName ||
                        "Unknown"}
                    </td>

                    <td>
                      Rs.{" "}
                      {Number(
                        order.totalAmount
                      ).toLocaleString()}
                    </td>

                    <td>
                      <span
                        className={`status ${String(
                          order.status
                        ).toLowerCase()}`}
                      >
                        {order.status}
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;