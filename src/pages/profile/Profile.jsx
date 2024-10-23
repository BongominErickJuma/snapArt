import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../../contexts/UserContext";

const Profile = () => {
  const [name, setName] = useState("Username");
  const [email, setEmail] = useState("useremail.com");
  const [phone, setPhone] = useState("N/A");
  const [image, setImage] = useState("images/team-1.jpg");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("warning"); // For styling success vs. warning alerts

  useEffect(() => {
    document.title = "SnapArt | Profile";
  }, []);

  const handlePasswordChange = () => {
    if (!currentPassword) {
      setAlertMessage("Please enter your current password");
      setAlertType("warning");
      return;
    }
    if (newPassword.length < 5) {
      setAlertMessage("New password must be at least 5 characters long");
      setAlertType("warning");
      return;
    }
    if (newPassword !== confirmPassword) {
      setAlertMessage("New passwords do not match");
      setAlertType("warning");
      return;
    }
    // Handle password change logic here
    setAlertMessage("Password changed successfully");
    setAlertType("success");
  };

  const handleImageChange = () => {
    // Handle image URL change logic here
    setAlertMessage("Profile image updated successfully");
    setAlertType("success");
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Profile Page</h2>

      {/* Profile Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Profile Information</h5>
          <div className="row align-items-center">
            <div className="col-md-4">
              <img
                src={image}
                alt="Profile"
                className="img-fluid rounded-circle mb-3"
                width={200}
              />
            </div>
            <div className="col-md-8">
              <p>
                <strong>Name:</strong> {name}
              </p>
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Phone:</strong> {phone || "Not Provided"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Profile Image */}
      <div className="card mb-4">
        <div className="card-body">
          {/* Info Banner */}
          <div className="alert alert-info" role="alert">
            Please use a recognizable image for your profile.
          </div>
          <h5 className="card-title">Change Profile Image</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleImageChange();
            }}
          >
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Image
            </button>
          </form>
        </div>
      </div>

      {/* Change Password Section */}
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">Change Password</h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePasswordChange();
            }}
          >
            <div className="mb-3">
              <label htmlFor="currentPassword" className="form-label">
                Current Password
              </label>
              <input
                type="password"
                className="form-control"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            {alertMessage && (
              <div className={`alert alert-${alertType}`}>{alertMessage}</div>
            )}
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
