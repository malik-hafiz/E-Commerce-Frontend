import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Logout from "./Logout";

function Layout() {

  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/login", { replace: true });
  // };

  return (
    <div className="admin-layout">
      <Sidebar />

      {/* <button
        className="sidebar-logout"
        onClick={handleLogout}
      >
        <FiLogOut />
        Logout
      </button> */}

      <div className="main-content">
        <Topbar />

        {/* <button
          className="topbar-logout"
          onClick={handleLogout}
        >
          <FiLogOut />
          Logout
        </button> */}

        <main className="page-content">
          <Outlet />
        </main>
      </div>
      <Logout/>
    </div>
  );
}

export default Layout;