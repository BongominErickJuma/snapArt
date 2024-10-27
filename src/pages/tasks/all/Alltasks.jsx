import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const AllTasks = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [fetchUrl, setFetchUrl] = useState({
    url: import.meta.env.VITE_GET_TASKS,
    options: {},
  });

  const { data, error, loading } = useFetch(fetchUrl.url, fetchUrl.options);

  useEffect(() => {
    document.title = "sNup Earn | Tasks";
    if (data) {
      setTasks(data.tasks);
    }
  }, [data]);

  const openModal = (item) => {
    setSelectedTask(item);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update search query state
  };

  // Filter tasks based on search query
  const filteredTasks = tasks
    ? tasks.filter((task) =>
        task.taskTitle.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2 className="">Tasks List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Tasks..."
          />
          <button className="search-btn">Search</button>
        </form>
      </div>
      {loading && <p>Loading Tasks...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && tasks && filteredTasks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Cover</div>
                </th>
                <th scope="col">Task Title</th>
                <th scope="col">Unit Cost</th>
                <th scope="col">Unit Reward</th>
                <th scope="col">Category</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <img
                      src={task.image}
                      alt={task.name}
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                  </td>
                  <td>{task.taskTitle}</td>
                  <td>{task.unitCost}</td>
                  <td>{task.unitReward}</td>
                  <td>{task.category}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(task)}
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
        !loading && <p>No Tasks Available</p>
      )}

      {selectedTask && (
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
                  {`${selectedTask.taskTitle} Details`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {selectedTask && (
                  <div className="task-details-card">
                    <img
                      src={selectedTask.image}
                      alt={selectedTask.name}
                      className="img-fluid mb-3 w-100"
                    />
                    <h4>{selectedTask.taskTitle}</h4>
                    <p>
                      <strong>Link:</strong> {selectedTask.link}
                    </p>
                    <p>
                      <strong>Description:</strong> {selectedTask.description}
                    </p>
                    <p>
                      <strong>Unit Cost:</strong> {selectedTask.unitCost}
                    </p>
                    <p>
                      <strong>Reward Asset:</strong> {selectedTask.rewardAsset}
                    </p>
                    <p>
                      <strong>Unit Reward:</strong> {selectedTask.unitReward}
                    </p>
                    <p>
                      <strong>Task Status:</strong> {selectedTask.taskStatus}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {selectedTask.paymentStatus}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedTask.category}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedTask && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default AllTasks;
