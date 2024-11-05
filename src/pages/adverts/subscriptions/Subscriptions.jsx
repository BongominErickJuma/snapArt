import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Subscriptions = () => {
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [subscriptions, setSubscriptions] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_SUBSCRIPTIONS,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Subscriptions";
    if (data) {
      setSubscriptions(data.subscriptions);
    }
  }, [data]);

  const openModal = (subscription) => {
    setSelectedSubscription(subscription);
  };

  const closeModal = () => {
    setSelectedSubscription(null);
  };

  const filteredSubscriptions = subscriptions?.filter((subscription) =>
    subscription.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Subscriptions List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Subscriptions..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Subscriptions...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading &&
      !error &&
      filteredSubscriptions &&
      filteredSubscriptions.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Name</div>
                </th>
                <th scope="col">Amount</th>
                <th scope="col">Is Active</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Last Modified</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscriptions.map((subscription) => (
                <tr key={subscription.id}>
                  <td>{subscription.name}</td>
                  <td>{subscription.amount}</td>
                  <td>{subscription.isActive ? "Active" : "Inactive"}</td>
                  <td>{subscription.creationDate}</td>
                  <td>{subscription.lastModified}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(subscription)}
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
        !loading && <p>No Subscriptions Available</p>
      )}

      {selectedSubscription && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{`Details for ${selectedSubscription.name}`}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="subscription-details-card">
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedSubscription.description}
                  </p>
                  <p>
                    <strong>Amount:</strong> {selectedSubscription.amount}
                  </p>
                  <p>
                    <strong>Is Active:</strong>{" "}
                    {selectedSubscription.isActive ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Creation Date:</strong>{" "}
                    {selectedSubscription.creationDate}
                  </p>
                  <p>
                    <strong>Last Modified:</strong>{" "}
                    {selectedSubscription.lastModified}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedSubscription && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Subscriptions;
