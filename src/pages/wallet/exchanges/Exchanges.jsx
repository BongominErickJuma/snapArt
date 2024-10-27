import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Exchanges = () => {
  const [selectedExchange, setSelectedExchange] = useState(null);
  const [exchanges, setExchanges] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_EXCHANGES,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Exchanges";
    if (data) {
      setExchanges(data.exchanges);
    }
  }, [data]);

  const openModal = (exchange) => {
    setSelectedExchange(exchange);
  };

  const closeModal = () => {
    setSelectedExchange(null);
  };

  const filteredExchanges = exchanges?.filter((exchange) =>
    exchange.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Exchanges List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Exchanges..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Exchanges...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading &&
      !error &&
      filteredExchanges &&
      filteredExchanges.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Name</div>
                </th>
                <th scope="col">Base Asset</th>
                <th scope="col">Minor Asset</th>
                <th scope="col">Rate</th>
                <th scope="col">Created At</th>
                <th scope="col">Last Modified</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredExchanges.map((exchange) => (
                <tr key={exchange.id}>
                  <td>{exchange.name}</td>
                  <td>{exchange.baseAsset}</td>
                  <td>{exchange.minorAsset}</td>
                  <td>{exchange.rate}</td>
                  <td>{exchange.createdAt}</td>
                  <td>{exchange.lastModified}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(exchange)}
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
        !loading && <p>No Exchanges Available</p>
      )}

      {selectedExchange && (
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
                  {`Exchange Details for ${selectedExchange.name}`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="exchange-details-card">
                  <p>
                    <strong>Base Asset:</strong> {selectedExchange.baseAsset}
                  </p>
                  <p>
                    <strong>Minor Asset:</strong> {selectedExchange.minorAsset}
                  </p>
                  <p>
                    <strong>Rate:</strong> {selectedExchange.rate}
                  </p>
                  <p>
                    <strong>Created At:</strong> {selectedExchange.createdAt}
                  </p>
                  <p>
                    <strong>Last Modified:</strong>{" "}
                    {selectedExchange.lastModified}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedExchange && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Exchanges;
