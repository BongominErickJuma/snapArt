import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Competitors = () => {
  const [selectedContestant, setSelectedContestant] = useState(null);
  const [contestants, setContestants] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_CONTESTANTS,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Contestants";
    if (data) {
      setContestants(data.contestants);
    }
  }, [data]);

  const openModal = (contestant) => {
    setSelectedContestant(contestant);
  };

  const closeModal = () => {
    setSelectedContestant(null);
  };

  const filteredContestants = contestants?.filter((contestant) =>
    contestant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3 ">
        <h2>Contestants List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Contestants..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Contestants...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading &&
      !error &&
      filteredContestants &&
      filteredContestants.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Image</div>
                </th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Votes</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredContestants.map((contestant) => (
                <tr key={contestant.id}>
                  <td>
                    <img
                      src={contestant.profileImage}
                      alt={contestant.username}
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </td>
                  <td>{contestant.username}</td>
                  <td>{contestant.email}</td>
                  <td>{contestant.votes}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(contestant)}
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
        !loading && <p>No Contestants Available</p>
      )}

      {selectedContestant && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{`Details for ${selectedContestant.username}`}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="contestant-details-card">
                  <img
                    src={selectedContestant.profileImage}
                    alt={selectedContestant.username}
                    className="img-fluid mb-3 w-100"
                  />
                  <p>
                    <strong>Email:</strong> {selectedContestant.email}
                  </p>
                  <p>
                    <strong>Votes:</strong> {selectedContestant.votes}
                  </p>
                  <p>
                    <strong>Role:</strong> {selectedContestant.role}
                  </p>
                  <p>
                    <strong>Reason:</strong> {selectedContestant.reason}
                  </p>
                  <p>
                    <strong>Hobbies:</strong>{" "}
                    {selectedContestant.hobbies.join(", ")}
                  </p>
                  <div>
                    <strong>Social Links:</strong>
                    <ul>
                      {Object.entries(selectedContestant.socialLinks).map(
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
      {selectedContestant && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Competitors;
