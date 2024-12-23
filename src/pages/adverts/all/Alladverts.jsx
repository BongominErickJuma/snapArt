import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const AllAdverts = () => {
  const [selectedAdvert, setSelectedAdvert] = useState(null);
  const [adverts, setAdverts] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_ADVERTS,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Advertisements";
    if (data) {
      setAdverts(data);
    }
  }, [data]);

  const openModal = (advert) => {
    setSelectedAdvert(advert);
  };

  const closeModal = () => {
    setSelectedAdvert(null);
  };

  const filteredAdverts = adverts?.filter((advert) =>
    advert.businessName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Advertisements List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Business Name..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>

      {loading && <p>Loading Advertisements...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && filteredAdverts && filteredAdverts.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Cover</div>
                </th>
                <th scope="col">Address</th>
                <th scope="col">Contact</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Views</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAdverts.map((advert) => (
                <tr key={advert.id}>
                  <td>
                    <img
                      src={advert.coverImage}
                      alt="photo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                    <span className="ms-2">{advert.businessName}</span>
                  </td>
                  <td>{advert.address}</td>
                  <td>{advert.contact}</td>
                  <td>{advert.expiryDate.split("T")[0]}</td>
                  <td>{advert.views}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(advert)}
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
        !loading && <p>No Advertisements Available</p>
      )}

      {selectedAdvert && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{`Details for ${selectedAdvert.businessName}`}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="advert-details-card row g-2">
                  <div className="row g-2 border-bottom pb-2 mb-2 align-items-center">
                    <div className="col-4">
                      {" "}
                      <img
                        src={selectedAdvert.coverImage}
                        alt={`${selectedAdvert.businessName} Cover`}
                        width="120"
                        height="120"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-8">
                      <p>
                        <strong>Address:</strong> {selectedAdvert.address}
                      </p>
                      <p>
                        <strong>Products:</strong>{" "}
                        <Link
                          to={`/snapArt/advertisedProduct`}
                          color="text-info"
                        >
                          {selectedAdvert.product}
                        </Link>
                      </p>
                    </div>
                  </div>
                  <p>
                    <strong>About:</strong> {selectedAdvert.about}
                  </p>

                  <p>
                    <strong>Website:</strong>{" "}
                    <a
                      href={selectedAdvert.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedAdvert.websiteUrl}
                    </a>
                  </p>
                  <div className="col-5">
                    <p>
                      <strong>Period:</strong> {selectedAdvert.period}
                    </p>
                    <p>
                      <strong>Expiry Date:</strong>{" "}
                      {selectedAdvert.expiryDate.split("T")[0]}
                    </p>
                  </div>
                  <div className="col-7">
                    <p>
                      <strong>Views Count:</strong> {selectedAdvert.views}
                    </p>
                    <p>
                      <strong>Contact:</strong> {selectedAdvert.contact}
                    </p>
                  </div>
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
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedAdvert && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default AllAdverts;
