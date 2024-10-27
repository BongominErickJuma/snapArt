import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const History = () => {
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [histories, setHistories] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_HISTORIES,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Transaction History";
    if (data) {
      setHistories(data.histories);
    }
  }, [data]);

  const openModal = (history) => {
    setSelectedHistory(history);
  };

  const closeModal = () => {
    setSelectedHistory(null);
  };

  const filteredHistories = histories?.filter((history) =>
    history.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Transaction History</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search History..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading History...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading &&
      !error &&
      filteredHistories &&
      filteredHistories.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Username</div>
                </th>
                <th scope="col">Type</th>
                <th scope="col">Status</th>
                <th scope="col">Asset Name</th>
                <th scope="col">Date</th>
                <th scope="col">Account</th>
                <th scope="col">Reference</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHistories.map((history) => (
                <tr key={history.id}>
                  <td>{history.username}</td>
                  <td>{history.transactionType}</td>
                  <td>{history.transactionStatus}</td>
                  <td>{history.assetName}</td>
                  <td>{history.tnxDate}</td>
                  <td>{history.account}</td>
                  <td>{history.reference}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(history)}
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
        !loading && <p>No Transaction History Available</p>
      )}

      {selectedHistory && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{`Details for ${selectedHistory.username}`}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="history-details-card">
                  <p>
                    <strong>Transaction Type:</strong>{" "}
                    {selectedHistory.transactionType}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedHistory.transactionStatus}
                  </p>
                  <p>
                    <strong>Asset Name:</strong> {selectedHistory.assetName}
                  </p>
                  <p>
                    <strong>Date:</strong> {selectedHistory.tnxDate}
                  </p>
                  <p>
                    <strong>Account:</strong> {selectedHistory.account}
                  </p>
                  <p>
                    <strong>Reference:</strong> {selectedHistory.reference}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedHistory && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default History;
