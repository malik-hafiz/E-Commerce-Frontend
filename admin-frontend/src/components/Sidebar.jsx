import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiUserCheck,
  FiShoppingCart,
} from "react-icons/fi";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="logo">
        BERRY
      </div>

      <div className="sidebar-section-title">
        Dashboard
      </div>

      <nav>
        <NavLink to="/" end>
          <FiGrid />
          Dashboard
        </NavLink>
      </nav>

      <div className="sidebar-section-title">
        Application
      </div>

      <nav>
        <NavLink to="/users">
          <FiUsers />
          Users
        </NavLink>

        <NavLink to="/customers">
          <FiUserCheck />
          Customers
        </NavLink>

        <NavLink to="/orders">
          <FiShoppingCart />
          Orders
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;