import {
  FiMenu,
  FiSearch,
  FiBell,
  FiSettings,
} from "react-icons/fi";

function Topbar() {
  return (
    <header className="topbar">

      <button className="menu-button">
        <FiMenu />
      </button>

      <div className="search-box">
        <FiSearch />

        <input
          type="text"
          placeholder="Search"
        />
      </div>

      <div className="topbar-spacer"></div>

      <div className="topbar-actions">

        <button className="topbar-button">
          <FiBell />
        </button>

        <button className="topbar-button">
          <FiSettings />
        </button>

        <div className="profile">
          <div className="profile-avatar">
            A
          </div>

          <div>
            <div className="profile-name">
              Admin
            </div>

            <span className="profile-role">
              Administrator
            </span>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Topbar;