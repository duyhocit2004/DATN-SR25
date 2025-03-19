import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return user ? (
    <div className="user-avatar">
      <img
        src={user.avatar || "https://via.placeholder.com/40"} 
        alt="Avatar"
        className="avatar-img"
        onClick={() => setMenuOpen(!menuOpen)}
      />
      {menuOpen && (
        <div className="dropdown-menu">
          <p>{user.name}</p>
          <p>{user.email}</p>
          <button onClick={handleLogout}>Đăng xuất</button>
        </div>
      )}
    </div>
  ) : (
    <></>
  );
};

export default UserAvatar;
