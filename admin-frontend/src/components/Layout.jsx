import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
function Layout() {

  const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login", { replace: true });
};
  return (
    <div className="admin-layout">
      <Sidebar />
<button onClick={handleLogout}>
  <FiLogOut />
  Logout
</button>
      <div className="main-content">
        <Topbar />
       <button onClick={handleLogout}>
  <FiLogOut />
  Logout
</button>
        <main className="page-content">
          <Outlet />
          
        </main>
      </div>
    </div>
  );
}

export default Layout;