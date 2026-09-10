import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import "./logout.css";
function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Left Bottom Logout */}
      <button
        className="logout-sidebar-btn"
        onClick={handleLogout}
        title="Logout"
      >
        <FiLogOut />
      </button>

      {/* Right Top Logout */}
      <button
        className="logout-top-btn"
        onClick={handleLogout}
      >
        <FiLogOut />
        <span>Logout</span>
      </button>
    </>
  );
}

export default Logout;
