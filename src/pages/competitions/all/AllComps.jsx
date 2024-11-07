import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const AllComps = () => {
  const [selectedCompetition, setSelectedCompetition] = useState(null);
  const [competitions, setCompetitions] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_COMPETITIONS,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Competitions";
    if (data) {
      setCompetitions(data.competitions);
    }
  }, [data]);

  const openModal = (competition) => {
    setSelectedCompetition(competition);
  };

  const closeModal = () => {
    setSelectedCompetition(null);
  };

  const filteredCompetitions = competitions?.filter((competition) =>
    competition.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3 ">
        <h2>Competitions List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Competitions..."
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

      {loading && <p>Loading Competitions...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading &&
      !error &&
      filteredCompetitions &&
      filteredCompetitions.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Cover</div>
                </th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Is Active</th>
                <th scope="col">Votes</th>
                <th scope="col">Contestants</th>
                <th scope="col">
                  <div className="text-end me-2">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredCompetitions.map((competition) => (
                <tr key={competition.id}>
                  <td>
                    <img
                      src={competition.profileImage}
                      alt={competition.username}
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                    <span className="ms-2">{competition.title}</span>
                  </td>
                  <td>{competition.startDate}</td>
                  <td>{competition.endDate}</td>
                  <td>{competition.isActive ? "Active" : "Inactive"}</td>
                  <td>{competition.votes}</td>
                  <td>{competition.contestants}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(competition)}
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
        !loading && <p>No Competitions Available</p>
      )}

      {selectedCompetition && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{`Details for ${selectedCompetition.title}`}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="competition-details-card row g-2">
                  <div className="row g-2 border-bottom pb-2 mb-2 align-items-center">
                    <div className="col-5">
                      <img
                        src={selectedCompetition.coverImage}
                        alt={selectedCompetition.title}
                        width={120}
                        height={120}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-7">
                      <div>
                        <strong>Prizes:</strong>
                        <ul>
                          {selectedCompetition.prizes.map((prize, index) => (
                            <li key={index}>
                              Position {prize.position}: {prize.description}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <p>
                      <strong>Start Date:</strong>{" "}
                      {selectedCompetition.startDate}
                    </p>
                    <p>
                      <strong>End Date:</strong> {selectedCompetition.endDate}
                    </p>
                  </div>
                  <div className="col-7">
                    <p>
                      <strong>Votes:</strong> {selectedCompetition.votes}
                    </p>
                    <p>
                      <Link to={"/snapArt/task_participants"}>
                        View Contestants
                      </Link>
                    </p>
                  </div>
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedCompetition.description}
                  </p>

                  <div className="row g-2">
                    <div className="col-4">
                      {selectedCompetition.isActive ? (
                        <Link className="btn btn-sm btn-outline-primary w-100">
                          Deactivate
                        </Link>
                      ) : (
                        <Link className="btn btn-sm btn-outline-primary w-100">
                          Activate
                        </Link>
                      )}
                    </div>
                    <div className="col-4">
                      <Link className="btn btn-sm view-btn w-100">Edit</Link>
                    </div>
                    <div className="col-4">
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
      {selectedCompetition && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default AllComps;
