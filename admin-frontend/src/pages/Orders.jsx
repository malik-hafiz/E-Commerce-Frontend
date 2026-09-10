import { useEffect, useState } from "react";
import "./order.css";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiPlus,
} from "react-icons/fi";

const API_URL = "https://e-commerce-backend-ycdx.vercel.app/";

function Orders() {
  // =========================
  // STATES
  // =========================

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);

  const [form, setForm] = useState({
    userId: "",
    totalAmount: "",
    status: "Pending",
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });

  // =========================
  // LOAD ORDERS
  // =========================

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          if (isMounted) {
            setError("Please login as admin");
            setLoading(false);
          }
          return;
        }

        const response = await fetch(`${API_URL}/admin/orders`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load orders"
          );
        }

        if (isMounted) {
          setOrders(data.orders || []);
          setError("");
        }
      } catch (err) {
        console.error("Orders loading error:", err);

        if (isMounted) {
          setError(err.message || "Failed to load orders");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // FETCH ORDERS
  // Used after CREATE / UPDATE
  // =========================

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin");
      }

      const response = await fetch(`${API_URL}/admin/orders`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load orders"
        );
      }

      setOrders(data.orders || []);
      setError("");
    } catch (err) {
      console.error("Fetch orders error:", err);
      setError(err.message || "Failed to load orders");
    }
  };

  // =========================
  // VIEW ORDER
  // =========================

  const handleView = async (id) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin");
      }

      const response = await fetch(
        `${API_URL}/admin/orders/${id}`,
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
          data.message || "Failed to load order"
        );
      }

      setSelectedOrder(data.order);
      setShowDetails(true);
    } catch (err) {
      console.error("View order error:", err);
      alert(err.message || "Failed to load order");
    }
  };

  // =========================
  // DELETE ORDER
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin");
      }

      const response = await fetch(
        `${API_URL}/admin/orders/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete order"
        );
      }

      setOrders((prevOrders) =>
        prevOrders.filter(
          (order) => order._id !== id
        )
      );

      alert("Order deleted successfully");
    } catch (err) {
      console.error("Delete order error:", err);
      alert(err.message || "Failed to delete order");
    }
  };

  // =========================
  // OPEN EDIT FORM
  // =========================

  const handleEdit = (order) => {
    setEditingOrder(order);

    setForm({
      userId:
        order.userId?._id ||
        order.userId ||
        "",

      totalAmount:
        order.totalAmount || "",

      status:
        order.status || "Pending",

      fullName:
        order.shippingAddress?.fullName || "",

      address:
        order.shippingAddress?.address || "",

      city:
        order.shippingAddress?.city || "",

      postalCode:
        order.shippingAddress?.postalCode || "",

      phone:
        order.shippingAddress?.phone || "",
    });

    setShowForm(true);
  };

  // =========================
  // OPEN CREATE FORM
  // =========================

  const handleCreate = () => {
    setEditingOrder(null);

    setForm({
      userId: "",
      totalAmount: "",
      status: "Pending",
      fullName: "",
      address: "",
      city: "",
      postalCode: "",
      phone: "",
    });

    setShowForm(true);
  };

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // =========================
  // CREATE / UPDATE ORDER
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin");
      }

      // Basic validation
      if (!form.userId.trim()) {
        throw new Error("User ID is required");
      }

      if (!form.totalAmount) {
        throw new Error("Total amount is required");
      }

      if (!form.fullName.trim()) {
        throw new Error("Full name is required");
      }

      if (!form.phone.trim()) {
        throw new Error("Phone is required");
      }

      if (!form.city.trim()) {
        throw new Error("City is required");
      }

      if (!form.address.trim()) {
        throw new Error("Address is required");
      }

      const payload = {
        userId: form.userId.trim(),

        totalAmount: Number(form.totalAmount),

        status: form.status,

        shippingAddress: {
          fullName: form.fullName.trim(),
          address: form.address.trim(),
          city: form.city.trim(),
          postalCode: form.postalCode.trim(),
          phone: form.phone.trim(),
        },
      };

      const url = editingOrder
        ? `${API_URL}/admin/orders/${editingOrder._id}`
        : `${API_URL}/admin/orders`;

      const method = editingOrder
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (editingOrder
              ? "Failed to update order"
              : "Failed to create order")
        );
      }

      // Close form
      setShowForm(false);
      setEditingOrder(null);

      // Reset form
      setForm({
        userId: "",
        totalAmount: "",
        status: "Pending",
        fullName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
      });

      // Refresh orders
      await fetchOrders();

      alert(
        editingOrder
          ? "Order updated successfully"
          : "Order created successfully"
      );
    } catch (err) {
      console.error("Submit order error:", err);
      alert(err.message || "Something went wrong");
    }
  };

  // =========================
  // CLOSE DETAILS
  // =========================

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  // =========================
  // UI
  // =========================

  return (
    <div>
      {/* =========================
          HEADER
      ========================= */}

      <div className="page-title">
        <div>
          <h1>Orders</h1>
          <p>Manage all customer orders</p>
        </div>

        <button
          className="admin-primary-btn"
          onClick={handleCreate}
        >
          <FiPlus />
          Add Order
        </button>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div
          className="login-error"
          style={{ marginBottom: "16px" }}
        >
          {error}
        </div>
      )}

      {/* =========================
          ORDERS TABLE
      ========================= */}

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3>All Orders</h3>

          <span>
            {orders.length} orders
          </span>
        </div>

        {loading ? (
          <p style={{ color: "#7f8aaa" }}>
            Loading orders...
          </p>
        ) : orders.length === 0 ? (
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
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    {/* CUSTOMER */}

                    <td>
                      {order.userId?.name ||
                        order.shippingAddress
                          ?.fullName ||
                        "Unknown"}
                    </td>

                    {/* TOTAL */}

                    <td>
                      Rs.{" "}
                      {Number(
                        order.totalAmount || 0
                      ).toLocaleString()}
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`status ${String(
                          order.status || ""
                        ).toLowerCase()}`}
                      >
                        {order.status || "Pending"}
                      </span>
                    </td>

                    {/* DATE */}

                    <td>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    {/* ACTIONS */}

                    <td>
                      <div className="table-actions">
                        {/* VIEW */}

                        <button
                          type="button"
                          className="action-btn view"
                          onClick={() =>
                            handleView(
                              order._id
                            )
                          }
                          title="View"
                        >
                          <FiEye />
                        </button>

                        {/* EDIT */}

                        <button
                          type="button"
                          className="action-btn edit"
                          onClick={() =>
                            handleEdit(order)
                          }
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>

                        {/* DELETE */}

                        <button
                          type="button"
                          className="action-btn delete"
                          onClick={() =>
                            handleDelete(
                              order._id
                            )
                          }
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================
          ORDER DETAILS MODAL
      ========================= */}

      {showDetails && selectedOrder && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            {/* MODAL HEADER */}

            <div className="admin-modal-header">
              <div>
                <h2>Order Details</h2>

                <p>
                  #{selectedOrder._id}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeDetails}
              >
                <FiX />
              </button>
            </div>

            {/* ORDER INFORMATION */}

            <div className="order-details">
              {/* CUSTOMER */}

              <div>
                <strong>Customer</strong>

                <p>
                  {selectedOrder.userId?.name ||
                    selectedOrder.shippingAddress
                      ?.fullName ||
                    "Unknown"}
                </p>
              </div>

              {/* EMAIL */}

              <div>
                <strong>Email</strong>

                <p>
                  {selectedOrder.userId?.email ||
                    "-"}
                </p>
              </div>

              {/* PHONE */}

              <div>
                <strong>Phone</strong>

                <p>
                  {selectedOrder.shippingAddress
                    ?.phone || "-"}
                </p>
              </div>

              {/* ADDRESS */}

              <div>
                <strong>Address</strong>

                <p>
                  {selectedOrder.shippingAddress
                    ?.address || "-"}

                  <br />

                  {selectedOrder.shippingAddress
                    ?.city || ""}

                  {selectedOrder.shippingAddress
                    ?.postalCode
                    ? `, ${selectedOrder.shippingAddress.postalCode}`
                    : ""}
                </p>
              </div>

              {/* STATUS */}

              <div>
                <strong>Status</strong>

                <p>
                  {selectedOrder.status ||
                    "Pending"}
                </p>
              </div>

              {/* TOTAL */}

              <div>
                <strong>Total</strong>

                <p>
                  Rs.{" "}
                  {Number(
                    selectedOrder.totalAmount ||
                      0
                  ).toLocaleString()}
                </p>
              </div>
            </div>

            {/* PRODUCTS */}

            <h3 style={{ marginTop: "24px" }}>
              Products
            </h3>

            <div className="order-items">
              {selectedOrder.items &&
              selectedOrder.items.length > 0 ? (
                selectedOrder.items.map(
                  (item, index) => (
                    <div
                      className="order-item"
                      key={
                        item._id ||
                        index
                      }
                    >
                      {/* PRODUCT IMAGE */}

                      {item.image && (
                        <img
                          src={item.image}
                          alt={
                            item.name ||
                            "Product"
                          }
                        />
                      )}

                      {/* PRODUCT INFO */}

                      <div>
                        <strong>
                          {item.name ||
                            "Product"}
                        </strong>

                        <p>
                          Quantity:{" "}
                          {item.quantity ||
                            1}
                        </p>

                        {item.size && (
                          <p>
                            Size:{" "}
                            {item.size}
                          </p>
                        )}

                        {item.color && (
                          <p>
                            Color:{" "}
                            {item.color}
                          </p>
                        )}
                      </div>

                      {/* PRICE */}

                      <strong>
                        Rs.{" "}
                        {Number(
                          item.price || 0
                        ).toLocaleString()}
                      </strong>
                    </div>
                  )
                )
              ) : (
                <p
                  style={{
                    color: "#7f8aaa",
                  }}
                >
                  No products found.
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================
          CREATE / EDIT MODAL
      ========================= */}

      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            {/* MODAL HEADER */}

            <div className="admin-modal-header">
              <div>
                <h2>
                  {editingOrder
                    ? "Edit Order"
                    : "Create Order"}
                </h2>

                <p>
                  {editingOrder
                    ? "Update order information"
                    : "Add a new order"}
                </p>
              </div>

              <button
                type="button"
                className="modal-close"
                onClick={closeForm}
              >
                <FiX />
              </button>
            </div>

            {/* FORM */}

            <form
              className="admin-form"
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                {/* USER ID */}

                <div className="form-group">
                  <label>
                    User ID
                  </label>

                  <input
                    name="userId"
                    value={form.userId}
                    onChange={handleChange}
                    placeholder="MongoDB User ID"
                    required
                  />
                </div>

                {/* TOTAL */}

                <div className="form-group">
                  <label>
                    Total Amount
                  </label>

                  <input
                    type="number"
                    name="totalAmount"
                    value={form.totalAmount}
                    onChange={handleChange}
                    placeholder="5000"
                    min="0"
                    required
                  />
                </div>

                {/* STATUS */}

                <div className="form-group">
                  <label>
                    Status
                  </label>

                  <select
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <option value="Pending">
                      Pending
                    </option>

                    <option value="Processing">
                      Processing
                    </option>

                    <option value="Shipped">
                      Shipped
                    </option>

                    <option value="Delivered">
                      Delivered
                    </option>

                    <option value="Cancelled">
                      Cancelled
                    </option>
                  </select>
                </div>

                {/* FULL NAME */}

                <div className="form-group">
                  <label>
                    Full Name
                  </label>

                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Customer name"
                    required
                  />
                </div>

                {/* PHONE */}

                <div className="form-group">
                  <label>
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="03XXXXXXXXX"
                    required
                  />
                </div>

                {/* CITY */}

                <div className="form-group">
                  <label>
                    City
                  </label>

                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Karachi"
                    required
                  />
                </div>

                {/* POSTAL CODE */}

                <div className="form-group">
                  <label>
                    Postal Code
                  </label>

                  <input
                    name="postalCode"
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="74000"
                  />
                </div>

                {/* ADDRESS */}

                <div
                  className="form-group"
                  style={{
                    gridColumn:
                      "1 / -1",
                  }}
                >
                  <label>
                    Address
                  </label>

                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Complete shipping address"
                    rows="3"
                    required
                  />
                </div>
              </div>

              {/* FORM BUTTONS */}

              <div className="form-actions">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-btn"
                >
                  {editingOrder
                    ? "Update Order"
                    : "Create Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
export default Orders;

