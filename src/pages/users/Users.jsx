import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";

const User = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const { data, error, loading } = useFetch(import.meta.env.VITE_GET_USERS, {});
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
        <h2>Users List</h2>
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
                  <div className="ms-1">Image</div>
                </th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Contests</th>
                <th scope="col">Views</th>
                <th scope="col">Votes</th>
                <th scope="col">Subscription</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
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
                  </td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.contestsCount}</td>
                  <td>{user.totalViewsCount}</td>
                  <td>{user.totalVotesCount}</td>
                  <td>{user.subscription}</td>
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
                <div className="user-details-card">
                  <img
                    src={selectedUser.profileImage}
                    alt={selectedUser.username}
                    className="img-fluid mb-3 w-100"
                  />
                  <p>
                    <strong>Email:</strong> {selectedUser.email}
                  </p>
                  <p>
                    <strong>Contests Count:</strong>{" "}
                    {selectedUser.contestsCount}
                  </p>
                  <p>
                    <strong>Total Views:</strong> {selectedUser.totalViewsCount}
                  </p>
                  <p>
                    <strong>Daily Votes:</strong> {selectedUser.dailyVotesCount}
                  </p>
                  <p>
                    <strong>Total Votes:</strong> {selectedUser.totalVotesCount}
                  </p>
                  <p>
                    <strong>Due Date:</strong> {selectedUser.dueDate}
                  </p>
                  <p>
                    <strong>Subscription:</strong> {selectedUser.subscription}
                  </p>
                  <div>
                    <strong>Social Links:</strong>
                    <ul>
                      {Object.entries(selectedUser.socialLinks).map(
                        ([platform, link]) => (
                          <li key={platform}>
                            <a
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {platform.charAt(0).toUpperCase() +
                                platform.slice(1)}
                            </a>
                          </li>
                        )
                      )}
                    </ul>
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

export default User;
