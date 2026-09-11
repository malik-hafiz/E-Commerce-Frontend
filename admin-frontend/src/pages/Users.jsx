import { useEffect, useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiEye,
  FiX,
  FiPlus,
} from "react-icons/fi";

const API_URL = "https://e-commerce-backend-ycdx.vercel.app";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // =========================
  // LOAD USERS
  // =========================

  useEffect(() => {
    let isMounted = true;

    const loadUsers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          throw new Error("Please login as admin");
        }

        const response = await fetch(`${API_URL}/admin/users`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load users");
        }

        if (isMounted) {
          setUsers(data.users || []);
          setError("");
        }
      } catch (err) {
        console.error("Users loading error:", err);

        if (isMounted) {
          setError(err.message || "Failed to load users");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadUsers();

    return () => {
      isMounted = false;
    };
  }, []);

  // =========================
  // FETCH USERS
  // =========================

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin");
      }

      const response = await fetch(`${API_URL}/admin/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load users");
      }

      setUsers(data.users || []);
      setError("");
    } catch (err) {
      console.error("Fetch users error:", err);
      setError(err.message || "Failed to load users");
    }
  };

  // =========================
  // VIEW USER
  // =========================

  const handleView = (user) => {
    setSelectedUser(user);
    setShowDetails(true);
  };

  // =========================
  // DELETE USER
  // =========================

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin");
      }

      const response = await fetch(`${API_URL}/admin/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete user");
      }

      setUsers((prevUsers) =>
        prevUsers.filter((user) => user._id !== id)
      );

      alert("User deleted successfully");
    } catch (err) {
      console.error("Delete user error:", err);
      alert(err.message || "Failed to delete user");
    }
  };

  // =========================
  // EDIT USER
  // =========================

  const handleEdit = (user) => {
    setEditingUser(user);

    setForm({
      name: user.name || "",
      email: user.email || "",
      password: "",
    });

    setShowForm(true);
  };

  // =========================
  // CREATE USER
  // =========================

  const handleCreate = () => {
    setEditingUser(null);

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
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("Please login as admin");
      }

      if (!form.name.trim()) {
        throw new Error("Name is required");
      }

      if (!form.email.trim()) {
        throw new Error("Email is required");
      }

      if (!editingUser && !form.password.trim()) {
        throw new Error("Password is required");
      }

      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
      };

      // Password only sent if entered
      if (form.password.trim()) {
        payload.password = form.password;
      }

      const url = editingUser
        ? `${API_URL}/admin/users/${editingUser._id}`
        : `${API_URL}/admin/users`;

      const method = editingUser ? "PUT" : "POST";

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
            (editingUser
              ? "Failed to update user"
              : "Failed to create user")
        );
      }

      setShowForm(false);
      setEditingUser(null);

      setForm({
        name: "",
        email: "",
        password: "",
      });

      await fetchUsers();

      alert(
        editingUser
          ? "User updated successfully"
          : "User created successfully"
      );
    } catch (err) {
      console.error("User submit error:", err);
      alert(err.message || "Something went wrong");
    }
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">

      {/* HEADER */}
      <div className="admin-page-header">
        <div>
          <h1>Users</h1>
          <p>Manage all registered users</p>
        </div>

        <button
          className="admin-primary-btn"
          onClick={handleCreate}
        >
          <FiPlus />
          Add User
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="admin-error">
          {error}
        </div>
      )}

      {/* TABLE */}
      <div className="admin-card">

        <div className="admin-table-wrapper">
          <table className="admin-table">

            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: "center" }}>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id}>

                    <td>
                      <strong>{user.name}</strong>
                    </td>

                    <td>{user.email}</td>

                    <td>
                      <span className="status">
                        {user.role || "customer"}
                      </span>
                    </td>

                    <td>
                      {user.createdAt
                        ? new Date(
                            user.createdAt
                          ).toLocaleDateString()
                        : "-"}
                    </td>

                    <td>
                      <div className="admin-actions">

                        <button
                          className="action-btn"
                          onClick={() => handleView(user)}
                          title="View"
                        >
                          <FiEye />
                        </button>

                        <button
                          className="action-btn"
                          onClick={() => handleEdit(user)}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>

                        <button
                          className="action-btn delete-btn"
                          onClick={() =>
                            handleDelete(user._id)
                          }
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>

                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>

      </div>

      {/* =========================
          CREATE / EDIT MODAL
      ========================= */}

      {showForm && (
        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">
              <h2>
                {editingUser
                  ? "Edit User"
                  : "Create User"}
              </h2>

              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                <FiX />
              </button>
            </div>

            <form
              className="admin-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter name"
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                />
              </div>

              <div className="form-group">
                <label>
                  Password
                  {editingUser && (
                    <span>
                      {" "}
                      (leave blank to keep current)
                    </span>
                  )}
                </label>

                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder={
                    editingUser
                      ? "Enter new password"
                      : "Enter password"
                  }
                />
              </div>

              <div className="admin-form-actions">

                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="admin-primary-btn"
                >
                  {editingUser
                    ? "Update User"
                    : "Create User"}
                </button>

              </div>

            </form>

          </div>

        </div>
      )}

      {/* =========================
          VIEW MODAL
      ========================= */}

      {showDetails && selectedUser && (
        <div className="admin-modal-overlay">

          <div className="admin-modal">

            <div className="admin-modal-header">

              <h2>User Details</h2>

              <button
                className="modal-close"
                onClick={() =>
                  setShowDetails(false)
                }
              >
                <FiX />
              </button>

            </div>

            <div className="user-details">

              <p>
                <strong>Name:</strong>{" "}
                {selectedUser.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {selectedUser.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                {selectedUser.role || "customer"}
              </p>

              <p>
                <strong>Created:</strong>{" "}
                {selectedUser.createdAt
                  ? new Date(
                      selectedUser.createdAt
                    ).toLocaleString()
                  : "-"}
              </p>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default Users;
