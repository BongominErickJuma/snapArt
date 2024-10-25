import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";

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
      <div className="flex-r mb-3 px-2">
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
                <th scope="col">Cover</th>
                <th scope="col">Title</th>
                <th scope="col">Start Date</th>
                <th scope="col">End Date</th>
                <th scope="col">Votes</th>
                <th scope="col">Contestants</th>
                <th className="text-center">Action</th>
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
                  </td>
                  <td>{competition.title}</td>
                  <td>{competition.startDate}</td>
                  <td>{competition.endDate}</td>
                  <td>{competition.votes}</td>
                  <td>{competition.contestants}</td>
                  <td className="text-center">
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
                <div className="competition-details-card">
                  <img
                    src={selectedCompetition.coverImage}
                    alt={selectedCompetition.title}
                    className="img-fluid mb-3"
                  />
                  <p>
                    <strong>Description:</strong>{" "}
                    {selectedCompetition.description}
                  </p>
                  <p>
                    <strong>Start Date:</strong> {selectedCompetition.startDate}
                  </p>
                  <p>
                    <strong>End Date:</strong> {selectedCompetition.endDate}
                  </p>
                  <p>
                    <strong>Votes:</strong> {selectedCompetition.votes}
                  </p>
                  <p>
                    <strong>Contestants:</strong>{" "}
                    {selectedCompetition.contestants}
                  </p>
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
