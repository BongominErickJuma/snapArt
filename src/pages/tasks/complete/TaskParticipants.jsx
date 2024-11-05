import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const TaskParticipants = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_PARTICIPANTS,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Users";
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const openModal = (user) => {
    setSelectedUser(user);
  };

  const closeModal = () => {
    setSelectedUser(null);
  };

  const filteredUsers = users?.filter((user) =>
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Participants List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Users..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Users...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && filteredUsers && filteredUsers.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Name</div>
                </th>
                <th scope="col">Email</th>
                <th scope="col">Quantity</th>
                <th scope="col">Reward</th>
                <th scope="col">Status</th>
                <th scope="col">Date</th>
                <th scope="col">
                  <div className="text-end me-2">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img
                      src={user.profileImage}
                      alt="photo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                    <span className="ms-2">{user.username}</span>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.quantity}</td>
                  <td>{user.reward}</td>
                  <td>{user.status}</td>
                  <td>{user.date}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(user)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No Users Available</p>
      )}

      {selectedUser && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{`Details for ${selectedUser.username}`}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="user-details-card row g-2">
                  <div className="row g-2 border-bottom pb-2 mb-2 align-items-center">
                    <div className="col-5">
                      <img
                        src={selectedUser.profileImage}
                        alt={selectedUser.username}
                        width="120"
                        height="120"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-7">
                      <h3>{selectedUser.username}</h3>
                      <p>
                        <strong>Subscription:</strong>{" "}
                        {selectedUser.subscription}
                      </p>
                      <p>
                        <strong>Email:</strong> {selectedUser.email}
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-5">
                    <p>
                      <strong>Quantity:</strong> {selectedUser.quantity}
                    </p>

                    <p>
                      <strong>Reward:</strong> {selectedUser.reward}
                    </p>
                  </div>
                  <div className="col-lg-6">
                    <p>
                      <strong>Status:</strong> {selectedUser.status}
                    </p>
                    <p>
                      <strong>Created:</strong> {selectedUser.date}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedUser && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default TaskParticipants;
