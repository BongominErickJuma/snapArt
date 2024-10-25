import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

const Assets = () => {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [assets, setAssets] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_ASSETS,
    {}
  );

  const openModal = (item) => {
    setSelectedAsset(item);
  };

  const closeModal = () => {
    setSelectedAsset(null);
  };

  useEffect(() => {
    document.title = "sNup Earn | Assets";
    if (data) {
      setAssets(data.assets);
    }
  }, [data]);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAssets = assets?.filter((asset) =>
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3 px-2">
        <h2>Assets List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Assets..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Assets...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && filteredAssets && filteredAssets.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Symbol</th>
                <th scope="col">Created At</th>
                <th scope="col">Last Modified</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.name}</td>
                  <td>
                    {" "}
                    <i className={`bi ${asset.symbol}`}></i>
                  </td>
                  <td>{asset.createdAt}</td>
                  <td>{asset.lastModified}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(asset)}
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
        !loading && <p>No Assets Available</p>
      )}
      {selectedAsset && (
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
                  {`Asset ${selectedAsset.name} Details`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {selectedAsset && (
                  <div className="assets-details-card">
                    <p>
                      <strong>Description:</strong> {selectedAsset.description}
                    </p>
                    <p>
                      <strong>symbol:</strong> {selectedAsset.symbol}
                    </p>
                    <p>
                      <strong>Created At:</strong> {selectedAsset.createdAt}
                    </p>
                    <p>
                      <strong>Last Modified:</strong>{" "}
                      {selectedAsset.lastModified}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedAsset && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Assets;
