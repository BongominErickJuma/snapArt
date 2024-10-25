import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const TasksCompleted = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [fetchUrl, setFetchUrl] = useState({
    url: import.meta.env.VITE_GET_COMPLETE_TASKS,
    options: {},
  });

  const { data, error, loading } = useFetch(fetchUrl.url, fetchUrl.options);

  useEffect(() => {
    document.title = "sNup Earn | Tasks";
    if (data) {
      setTasks(data.tasks_complete);
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
      <div className="flex-r mb-3 px-2">
        <h2 className="">Tasks Completed</h2>
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
                <th scope="col">Cover</th>
                <th scope="col">Task Title</th>
                <th scope="col">Quantity</th>
                <th scope="col">Points</th>
                <th scope="col">Date Completed</th>
                <th scope="col" className="text-center">
                  Action
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
                  <td>{task.quantity}</td>
                  <td>{task.rewardedPoints}</td>
                  <td>{task.completionDate}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(task, "view")}
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
                      <strong>Quantity:</strong> {selectedTask.quantity}
                    </p>
                    <p>
                      <strong>Rewarded Points:</strong>{" "}
                      {selectedTask.rewardedPoints}
                    </p>
                    <p>
                      <strong>Date Completed:</strong>{" "}
                      {selectedTask.completionDate}
                    </p>
                    <p>
                      <strong>Details:</strong> {selectedTask.details}
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

export default TasksCompleted;
