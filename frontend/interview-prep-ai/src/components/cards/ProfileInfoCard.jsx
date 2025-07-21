import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    clearUser();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-lg shadow-sm border border-blue-100">
      {/* Avatar Circle with First Letter */}
      <div className="w-9 h-9 bg-blue-600 text-white flex items-center justify-center rounded-full font-semibold uppercase">
        {user.username?.charAt(0) || user.name?.charAt(0) || 'U'}
      </div>

      {/* Username and Logout */}
      <div className="flex flex-col">
        <span className="text-sm font-medium text-blue-900">
          {user.username || user.name || 'User'}
        </span>
        <button
          onClick={handleLogout}
          className="text-xs text-blue-600 hover:underline hover:text-blue-800 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfoCard;
