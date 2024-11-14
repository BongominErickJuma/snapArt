import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useAuth } from "../../../contexts/AuthContex";

const VerifiedTasks = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "view" or "delete"
  const [selectedTask, setSelectedTask] = useState(null);

  const [fetchUrl, setFetchUrl] = useState({
    url: import.meta.env.VITE_VERIFIED_TASKS,
    options: {
      token,
    },
  });

  const { data, error, loading } = useFetch(fetchUrl.url, fetchUrl.options);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data]);

  // Functions to open each modal
  const handleShowModal = (type, task = null) => {
    setModalType(type);
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTask(null);
  };

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Verified Tasks</h2>
        <form className="search-form">
          <input type="search" placeholder="Search Tasks..." />
          <button className="search-btn">Search</button>
        </form>
      </div>
      {loading && <p>Loading tasks...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
      {!loading && !error && tasks.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th>Title</th>
                <th>Link</th>
                <th>Reward</th>
                <th>Task Status</th>
                <th>Payment Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>
                    <a
                      href={task.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Link
                    </a>
                  </td>
                  <td>${task.reward.toFixed(2)}</td>
                  <td
                    className={`fw-bold ${
                      task.taskStatus.toLowerCase() === "in_progress"
                        ? "text-info"
                        : ""
                    }`}
                  >
                    {task.taskStatus}
                  </td>
                  <td
                    className={`fw-bold ${
                      task.paymentStatus.toLowerCase() === "successful"
                        ? "text-success"
                        : task.paymentStatus.toLowerCase() === "pending"
                        ? "text-info"
                        : task.paymentStatus.toLowerCase() === "unsuccessful"
                        ? "text-danger"
                        : ""
                    }`}
                  >
                    {task.paymentStatus}
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm view-btn"
                      onClick={() => handleShowModal("view", task)}
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
        !loading && <p>No verified tasks available.</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === "view" ? "View Task" : "Delete Task"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {modalType === "view" && selectedTask && (
                  <div>
                    <p>
                      <strong>Title:</strong> {selectedTask.title}
                    </p>
                    <p>
                      <strong>Description:</strong> {selectedTask.description}
                    </p>
                    <p>
                      <strong>Link:</strong>{" "}
                      <a
                        href={selectedTask.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selectedTask.link}
                      </a>
                    </p>
                    <p>
                      <strong>Unit Cost:</strong> $
                      {selectedTask.unitCost.toFixed(2)}
                    </p>
                    <p>
                      <strong>Reward:</strong> ${selectedTask.reward.toFixed(2)}
                    </p>
                    <p>
                      <strong>Task Status:</strong> {selectedTask.taskStatus}
                    </p>
                    <p>
                      <strong>Payment Status:</strong>{" "}
                      {selectedTask.paymentStatus}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedTask.category.name}
                    </p>
                    <p>
                      <strong>Assigned User:</strong>{" "}
                      {selectedTask.user.username}
                    </p>
                  </div>
                )}

                {modalType === "delete" && selectedTask && (
                  <p>
                    Are you sure you want to delete the task "
                    {selectedTask.title}"?
                  </p>
                )}
              </div>
              <div className="modal-footer">
                {modalType === "delete" ? (
                  <button type="button" className="btn btn-danger">
                    Confirm Delete
                  </button>
                ) : null}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifiedTasks;
