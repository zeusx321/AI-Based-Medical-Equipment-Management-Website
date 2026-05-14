import axios from 'axios';
import React, { useState, useEffect } from 'react'
import trashIcon from '../../../assets/Trash.svg'
import conformIcon from '../../../assets/Checkmark.svg'
import closeIcon from '../../../assets/Close.svg'

function UserEdit({editOpen, setEditOpen, userName, userRole, userEmail, userDeleted, userColor, userID}) {

  const token = localStorage.getItem("token");
  const [ newUserRole, setNewUserRole ] = useState('');

  useEffect(() => {
    if (editOpen) {
      setNewUserRole(userRole);
    }
  }, [editOpen, userRole]);

    const handleUpdate = async () => {
      try {
        // Matching the documentation strictly to fix validation failure
        const payload = {
          username: userName,
          email: userEmail,
          password: "", // Accepted but ignored according to rules
          enabled: !userDeleted
        };


        const res = await axios.put(`http://localhost:8080/api/users/${userID}`, payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        setEditOpen(false);
        window.location.reload();
      } catch (e) {
        console.error("Update Failed! Response Data:", e.response?.data);
        console.error("Error Message:", e.message);
        alert(`Update Failed: ${e.response?.data?.message || e.response?.data?.error || e.message}`);
      }
    } 

    const handleDeactivate = async () => {
      if (!window.confirm(`Are you sure you want to deactivate user ${userName}?`)) return;

      try {
        const res = await axios.patch(`http://localhost:8080/api/users/${userID}/deactivate`, {}, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setEditOpen(false);
        window.location.reload();
      } catch (e) {
        console.error("Deactivate Failed! Response Data:", e.response?.data);
        console.error("Error Message:", e.message);
        alert(`Deactivation Failed: ${e.response?.data?.message || e.message}`);
      }
    };

    const colors = ["bg-gradient-to-bl from-indigo-600 to-indigo-700", "bg-gradient-to-tr from-sky-700 to-sky-600", "bg-gradient-to-tr from-green-500 to-green-600", "bg-gradient-to-tr from-amber-500 to-amber-600", "bg-gradient-to-tr from-pink-500 to-pink-600"];

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-300 ${editOpen ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => { setEditOpen(false); }}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-[450px] bg-color-gray1 border border-color-white/10 rounded-[8px] transition-all duration-300 transform
          ${editOpen ? "scale-100 translate-y-0" : "scale-95 translate-y-4"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-color-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-color-purple/10 flex items-center justify-center text-color-purple">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </div>
            <div>
              <h3 className="font-bold text-[18px] text-white leading-tight">Edit User Access</h3>
              <p className="text-[12px] text-color-white/40 font-semibold uppercase tracking-wider">Modify Permissions</p>
            </div>
          </div>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-color-white/5 transition-all text-color-white/40 hover:text-white"
            onClick={() => { setEditOpen(false); }}
          >
            <img src={closeIcon} alt="Close" className="w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-4 w-full">
            <div className={`${colors[userColor]} w-20 h-20 rounded-full flex justify-center items-center text-white font-bold text-2xl border-4 border-color-white/5 shadow-xl`}>
              {userName ? userName[0].toUpperCase() : "?"}
            </div>
            <div className="text-center">
              <h2 className="text-[20px] font-bold text-white tracking-tight">{userName}</h2>
              <p className="text-[14px] text-color-white/40 font-medium">{userEmail}</p>
            </div>
          </div>

          <div className="w-full bg-color-gray2/40 border border-color-white/5 rounded-[8px] p-4 flex flex-col gap-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[13px] font-bold text-color-white/60 uppercase tracking-widest">Access Role</label>
              <select
                name="roles"
                id="roles"
                value={newUserRole === "ROLE_ADMIN" ? "admin" : newUserRole === "ROLE_BIOMED" ? "biomed" : "user"}
                className="bg-color-gray1 border border-color-white/10 text-white p-2 rounded-[8px] text-[13px] font-bold focus:outline-none focus:border-color-purple transition-all outline-none cursor-pointer"
                onChange={(e) => {
                  setNewUserRole(
                    e.target.value === "user" ? "ROLE_USER" : e.target.value === "admin" ? "ROLE_ADMIN" : "ROLE_BIOMED"
                  );
                }}
              >
                <option value="user">Standard User</option>
                <option value="biomed">Biomedical Engineer</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 w-full">
            <button
              className="flex-1 p-3 bg-color-purple text-white rounded-[8px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-95"
              onClick={handleUpdate}
            >
              <img src={conformIcon} alt="Check" className="w-5" />
              Update Access
            </button>
            <button 
              onClick={handleDeactivate}
              className="p-3 px-5 bg-color-red/10 border border-color-red/20 text-color-red rounded-[8px] font-bold text-[14px] flex items-center justify-center gap-2 transition-all hover:bg-color-red hover:text-white active:scale-95"
            >
              <img src={trashIcon} alt="Trash" className="w-5" />
              Deactivate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit
