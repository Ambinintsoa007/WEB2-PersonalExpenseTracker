"use client"

import { useState } from "react";
import { useData } from "../context/DataContext.jsx";
import '../App.css'
import {useAuth} from "../context/AuthContext.jsx";

const Profile = ({ darkMode, setDarkMode }) => {
    const { profile, updateProfile } = useData();
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [newUsername, setNewUsername] = useState(profile.username);
    const { logout } = useAuth()

    const handleSaveUsername = () => {
        if(newUsername.trim()){
            updateProfile({ username: newUsername.trim() })
            setIsEditingUsername(false);
        }
    }

    const handleCancelEdit = () => {
        setNewUsername(profile.username)
        setIsEditingUsername(false);
    }

    const handleChangePassword = () => {
        alert("Password change functionnality will be implement soon")
    }

    return (
        <div className="profile">
            <div className="page-header">
                <h1>Profile</h1>
                <p>Manage your account setting</p>
            </div>

            <div className="profile-content">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <div className="avatar-circle">
                            {profile.username.charAt(0).toUpperCase()}
                        </div>

                        <div className="profile-info">
                            <div className="info-group">
                                <label>Username</label>
                                {isEditingUsername ? (
                                    <div className="edit-username">
                                        <input
                                            type="text"
                                            value={newUsername}
                                            onChange={(e) => setNewUsername(e.target.value)}
                                            className="username-input"
                                        />
                                        <div className="edit-actions">
                                            <button className="btn btn-sm btn-success" onClick={handleSaveUsername}>
                                                Save
                                            </button>
                                            <button className="btn btn-sm btn-secondary" onClick={handleCancelEdit}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="username-display">
                                    <span className="username-text">
                                        {profile.username}
                                    </span>
                                        <button className="btn btn-sm btn-outline" onClick={() => setIsEditingUsername(true)}>
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="info-group">
                                <label>Email</label>
                                <span className="info-value">{profile.email}</span>
                            </div>

                            <div className="info-group">
                                <label>Account Created</label>
                                <span className="info-value">{profile.createdAt}</span>
                            </div>
                        </div>
                    </div>

                    <div className="settings-card">
                        <h3>Settings</h3>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Password</h4>
                                <p>Change your account password</p>
                            </div>
                            <button className="btn btn-outline" onClick={handleChangePassword}>
                                Change Password
                            </button>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Dark Mode</h4>
                                <p>Toggle dark mode theme</p>
                            </div>
                            <div className="toggle-container">
                                <label className="toggle">
                                    <input
                                        type="checkbox"
                                        checked={darkMode}
                                        onChange={(e) => setDarkMode(e.target.checked)}
                                    />
                                    <span className="toggle-slider"></span>
                                </label>
                            </div>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Logout</h4>
                                <p>Logout of your account</p>
                            </div>
                            <button className="btn btn-outline btn-danger" onClick={logout}>Sign out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;