import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

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
      <div className="flex-r mb-3">
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
        <button
          className="btn btn-sm btn-primary"
          onClick={() => openModal(addProduct, "add-pdt")}
        >
          Create More
        </button>
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
                <th scope="col">
                  <div className="ms-1">Name</div>
                </th>
                <th scope="col">Symbol</th>
                <th scope="col">Created At</th>
                <th scope="col">Last Modified</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
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
                  <td className="text-end">
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

                    <div className="row g-2">
                      <div className="col-6">
                        <Link className="btn btn-sm view-btn w-100">Edit</Link>
                      </div>
                      <div className="col-6">
                        <Link className="btn btn-sm view-btn btn-outline-danger w-100">
                          Delete
                        </Link>
                      </div>
                    </div>
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
