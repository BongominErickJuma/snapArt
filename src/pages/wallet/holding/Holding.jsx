import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Holdings = () => {
  const [selectedHolding, setSelectedHolding] = useState(null);
  const [holdings, setHoldings] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_HOLDINGS,
    {}
  );

  const openModal = (item) => {
    setSelectedHolding(item);
  };

  const closeModal = () => {
    setSelectedHolding(null);
  };

  useEffect(() => {
    document.title = "sNup Earn | Holdings";
    if (data) {
      setHoldings(data.holdings);
    }
  }, [data]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredHoldings = holdings?.filter((holding) =>
    holding.Asset.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3 ">
        <h2>Holdings List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Holdings..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Holdings...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && filteredHoldings && filteredHoldings.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Asset</div>
                </th>
                <th scope="col">Amount</th>
                <th scope="col">Created At</th>
                <th scope="col">Last Modified</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHoldings.map((holding) => (
                <tr key={holding.id}>
                  <td>{holding.Asset}</td>
                  <td>{holding.amount}</td>
                  <td>{holding.createdAt}</td>
                  <td>{holding.lastModified}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(holding)}
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
        !loading && <p>No Holdings Available</p>
      )}
      {selectedHolding && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {`Holding ${selectedHolding.Asset} Details`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {selectedHolding && (
                  <div className="holding-details-card">
                    <p>
                      <strong>Asset:</strong> {selectedHolding.Asset}
                    </p>
                    <p>
                      <strong>Amount:</strong> {selectedHolding.amount}
                    </p>
                    <p>
                      <strong>Created At:</strong> {selectedHolding.createdAt}
                    </p>
                    <p>
                      <strong>Last Modified:</strong>{" "}
                      {selectedHolding.lastModified}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedHolding && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Holdings;
