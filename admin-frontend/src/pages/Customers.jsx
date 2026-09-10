import { useEffect, useState } from "react";

import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiPlus,
} from "react-icons/fi";

const API_URL = "https://e-commerce-backend-ycdx.vercel.app/";

function Customers() {
  // =========================
  // STATES
  // =========================

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedCustomer, setSelectedCustomer] =
    useState(null);

  const [showDetails, setShowDetails] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const [editingCustomer, setEditingCustomer] =
    useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // =========================
  // LOAD CUSTOMERS
  // =========================

  useEffect(() => {
    let isMounted = true;

    const loadCustomers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          if (isMounted) {
            setError("Please login as admin");
            setLoading(false);
          }
          return;
        }

        const response = await fetch(
          `${API_URL}/admin/customers`,
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
            data.message ||
              "Failed to load customers"
          );
        }

        if (isMounted) {
          setCustomers(
            data.customers || []
          );
          setError("");
        }
      } catch (err) {
        console.error(
          "Customers loading error:",
          err
        );

        if (isMounted) {
          setError(
            err.message ||
              "Failed to load customers"
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadCustomers();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // FETCH CUSTOMERS
  // Used after CREATE / UPDATE
  // =========================

  const fetchCustomers = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login as admin"
        );
      }

      const response = await fetch(
        `${API_URL}/admin/customers`,
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
          data.message ||
            "Failed to load customers"
        );
      }

      setCustomers(
        data.customers || []
      );

      setError("");
    } catch (err) {
      console.error(
        "Fetch customers error:",
        err
      );

      setError(
        err.message ||
          "Failed to load customers"
      );
    }
  };

  // =========================
  // VIEW CUSTOMER
  // =========================

  const handleView = async (id) => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login as admin"
        );
      }

      const response = await fetch(
        `${API_URL}/admin/customers/${id}`,
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
          data.message ||
            "Failed to load customer"
        );
      }

      setSelectedCustomer(
        data.customer
      );

      setShowDetails(true);
    } catch (err) {
      console.error(
        "View customer error:",
        err
      );

      alert(
        err.message ||
          "Failed to load customer"
      );
    }
  };

  // =========================
  // DELETE CUSTOMER
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this customer?"
      );

    if (!confirmDelete) return;

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login as admin"
        );
      }

      const response = await fetch(
        `${API_URL}/admin/customers/${id}`,
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
          data.message ||
            "Failed to delete customer"
        );
      }

      setCustomers(
        (prevCustomers) =>
          prevCustomers.filter(
            (customer) =>
              customer._id !== id
          )
      );

      alert(
        "Customer deleted successfully"
      );
    } catch (err) {
      console.error(
        "Delete customer error:",
        err
      );

      alert(
        err.message ||
          "Failed to delete customer"
      );
    }
  };

  // =========================
  // EDIT CUSTOMER
  // =========================

 const handleEdit = (customer) => {
  setEditingCustomer({
    ...customer,
    _id: customer._id || customer.id,
  });

  setForm({
    name: customer.name || "",
    email: customer.email || "",
    password: "",
  });

  setShowForm(true);
};

  // =========================
  // CREATE CUSTOMER
  // =========================

  const handleCreate = () => {
    setEditingCustomer(null);

    setForm({
      name: "",
      email: "",
      password: "",
    });

    setShowForm(true);
  };

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        throw new Error(
          "Please login as admin"
        );
      }

      if (!form.name.trim()) {
        throw new Error(
          "Name is required"
        );
      }

      if (!form.email.trim()) {
        throw new Error(
          "Email is required"
        );
      }

      if (
        !editingCustomer &&
        !form.password.trim()
      ) {
        throw new Error(
          "Password is required"
        );
      }

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
      };

      // Password only send when creating
      // or when admin entered a new password
      if (form.password.trim()) {
        payload.password =
          form.password;
      }

      const url = editingCustomer
        ? `${API_URL}/admin/customers/${editingCustomer._id}`
        : `${API_URL}/admin/customers`;

      const method = editingCustomer
        ? "PUT"
        : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type":
            "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            (editingCustomer
              ? "Failed to update customer"
              : "Failed to create customer")
        );
      }

      setShowForm(false);
      setEditingCustomer(null);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      await fetchCustomers();

      alert(
        editingCustomer
          ? "Customer updated successfully"
          : "Customer created successfully"
      );
    } catch (err) {
      console.error(
        "Customer submit error:",
        err
      );

      alert(
        err.message ||
          "Something went wrong"
      );
    }
  };

  // =========================
  // CLOSE DETAILS
  // =========================

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedCustomer(null);
  };

  // =========================
  // CLOSE FORM
  // =========================

  const closeForm = () => {
    setShowForm(false);
    setEditingCustomer(null);
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
          <h1>Customers</h1>

          <p>
            Manage all customer accounts
          </p>
        </div>

        <button
          className="admin-primary-btn"
          onClick={handleCreate}
        >
          <FiPlus />
          Add Customer
        </button>
      </div>

      {/* =========================
          ERROR
      ========================= */}

      {error && (
        <div
          className="login-error"
          style={{
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      {/* =========================
          TABLE
      ========================= */}

      <div className="dashboard-card">
        <div className="dashboard-card-header">
          <h3>
            All Customers
          </h3>

          <span>
            {customers.length} customers
          </span>
        </div>

        {loading ? (
          <p
            style={{
              color: "#7f8aaa",
            }}
          >
            Loading customers...
          </p>
        ) : customers.length === 0 ? (
          <p
            style={{
              color: "#7f8aaa",
            }}
          >
            No customers found.
          </p>
        ) : (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {customers.map(
                  (customer) => (
                    <tr
                      key={
                        customer._id
                      }
                    >
                      <td>
                        {customer.name ||
                          "Unknown"}
                      </td>

                      <td>
                        {customer.email ||
                          "-"}
                      </td>

                      <td>
                        <span
                          className={`status ${String(
                            customer.role ||
                              "customer"
                          ).toLowerCase()}`}
                        >
                          {customer.role ||
                            "customer"}
                        </span>
                      </td>

                      <td>
                        {customer.createdAt
                          ? new Date(
                              customer.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <div className="table-actions">
                          {/* VIEW */}

                          <button
                            type="button"
                            className="action-btn view"
                            onClick={() =>
                              handleView(
                                customer._id
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
                              handleEdit(
                                customer
                              )
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
                                customer._id
                              )
                            }
                            title="Delete"
                          >
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* =========================
          CUSTOMER DETAILS MODAL
      ========================= */}

      {showDetails &&
        selectedCustomer && (
          <div className="admin-modal-overlay">
            <div className="admin-modal">
              <div className="admin-modal-header">
                <div>
                  <h2>
                    Customer Details
                  </h2>

                  <p>
                    #
                    {
                      selectedCustomer._id
                    }
                  </p>
                </div>

                <button
                  type="button"
                  className="modal-close"
                  onClick={
                    closeDetails
                  }
                >
                  <FiX />
                </button>
              </div>

              <div className="order-details">
                <div>
                  <strong>
                    Name
                  </strong>

                  <p>
                    {
                      selectedCustomer.name ||
                      "-"
                    }
                  </p>
                </div>

                <div>
                  <strong>
                    Email
                  </strong>

                  <p>
                    {
                      selectedCustomer.email ||
                      "-"
                    }
                  </p>
                </div>

                <div>
                  <strong>
                    Role
                  </strong>

                  <p>
                    {
                      selectedCustomer.role ||
                      "customer"
                    }
                  </p>
                </div>

                <div>
                  <strong>
                    Customer ID
                  </strong>

                  <p>
                    {
                      selectedCustomer._id
                    }
                  </p>
                </div>

                <div>
                  <strong>
                    Created
                  </strong>

                  <p>
                    {selectedCustomer.createdAt
                      ? new Date(
                          selectedCustomer.createdAt
                        ).toLocaleString()
                      : "-"}
                  </p>
                </div>

                <div>
                  <strong>
                    Updated
                  </strong>

                  <p>
                    {selectedCustomer.updatedAt
                      ? new Date(
                          selectedCustomer.updatedAt
                        ).toLocaleString()
                      : "-"}
                  </p>
                </div>
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
            <div className="admin-modal-header">
              <div>
                <h2>
                  {editingCustomer
                    ? "Edit Customer"
                    : "Create Customer"}
                </h2>

                <p>
                  {editingCustomer
                    ? "Update customer information"
                    : "Add a new customer"}
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

            <form
              className="admin-form"
              onSubmit={handleSubmit}
            >
              <div className="form-grid">
                {/* NAME */}

                <div className="form-group">
                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={
                      handleChange
                    }
                    placeholder="Customer name"
                    required
                  />
                </div>

                {/* EMAIL */}

                <div className="form-group">
                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={
                      handleChange
                    }
                    placeholder="customer@email.com"
                    required
                  />
                </div>

                {/* PASSWORD */}

                <div className="form-group">
                  <label>
                    {editingCustomer
                      ? "New Password"
                      : "Password"}
                  </label>

                  <input
                    type="password"
                    name="password"
                    value={
                      form.password
                    }
                    onChange={
                      handleChange
                    }
                    placeholder={
                      editingCustomer
                        ? "Leave empty to keep current password"
                        : "Customer password"
                    }
                    required={
                      !editingCustomer
                    }
                  />
                </div>
              </div>

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
                  {editingCustomer
                    ? "Update Customer"
                    : "Create Customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;