import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContex";

const AllTasks = () => {
  const { token } = useAuth();
  const [selectedTask, setSelectedTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [tasks, setTasks] = useState(null);
  const [addingTask, setAddingTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [addTask, setAddTask] = useState({
    name: "",
    imageUrl: "",
    description: "",
    unitCost: "",
    baseAsset: "",
    allowedSubscriptions: "",
    taskStatus: "",
    category: "",
    created: "",
  });
  const [fetchUrl, setFetchUrl] = useState({
    url: import.meta.env.VITE_GET_TASKS,
    options: {
      token,
    },
  });

  const { data, error, loading } = useFetch(fetchUrl.url, fetchUrl.options);

  useEffect(() => {
    document.title = "sNup Earn | My Tasks";
    if (data) {
      setTasks(data);
    }
  }, [data]);

  const openModal = (item, action) => {
    action === "add-task" ? setAddingTask(item) : setSelectedTask(item);
    setEditingTask(null);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setEditingTask(null);
    setAddingTask(null);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    setFetchUrl({
      url: `${import.meta.env.VITE_ADD_TASK}`,
      options: {
        method: "POST",
        body: JSON.stringify(addingTask),
        headers: { "Content-Type": "application/json" },
      },
    });
    window.location.reload();
    closeModal();
  };

  const handleVerifyTask = async (e, id) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_VERIFY_TASK}/${parseInt(id, 10)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to verify task");
      }

      // Optionally, re-fetch or update the tasks state if needed
      const updatedTask = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );

      closeModal();
    } catch (error) {
      console.error("Error verifying task:", error);
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setFetchUrl({
      url: `${import.meta.env.VITE_UPDATE_TASK}/${editingTask.id}`,
      options: {
        method: "PATCH",
        body: JSON.stringify(editingTask),
        headers: { "Content-Type": "application/json" },
      },
    });
    window.location.reload();
    closeModal();
  };

  const handleDelete = () => {
    setFetchUrl({
      url: `${import.meta.env.VITE_DELETE_TASK}/${selectedTask.id}`,
      options: {
        method: "DELETE",
      },
    });
    window.location.reload();
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddChange = (e) => {
    const { name, value } = e.target;
    setAddingTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTasks = tasks
    ? tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Tasks List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Tasks..."
          />
          <button className="search-btn">Search</button>
        </form>
        <button
          className="btn btn-sm btn-primary"
          // onClick={() => openModal(addTask, "add-task")}
        >
          Create More
        </button>
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
                <th>
                  <div className="ms-1">Cover</div>
                </th>
                <th>Category</th>
                <th>Payment</th>
                <th>Unit Cost</th>
                <th>Progress</th>
                <th>Link</th>
                <th scope="col">
                  <div className="text-end me-2">Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>
                    <img
                      src={task.user.profileImg}
                      alt=""
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                    <span className="ms-2">{task.title}</span>
                  </td>
                  <td>{task.category.name}</td>
                  <td>
                    <div
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
                    </div>
                  </td>
                  <td>{task.unitCost}</td>
                  <td
                    className={`fw-bold ${
                      task.taskStatus.toLowerCase() === "in_progress"
                        ? "text-info"
                        : ""
                    }`}
                  >
                    {task.taskStatus}
                  </td>
                  <td>
                    <Link
                      to={`${task.link}`}
                      className="text-white"
                      target="_blank"
                    >
                      check
                    </Link>
                  </td>
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

      {(selectedTask || addingTask) && (
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
                  {addingTask ? "Add Task" : `${selectedTask.name} Details`}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                {selectedTask && !addingTask && (
                  <div className="task-details-card row g-2">
                    <div className="row g-2 border-bottom pb-2 mb-2">
                      <div className="col-5">
                        <img
                          src={selectedTask.user.profileImg}
                          alt=""
                          width="120"
                          height="120"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="col-7">
                        <h3>{selectedTask.user.username}</h3>
                        <p>
                          <strong>Subscription:</strong>{" "}
                          {selectedTask.user.subscriptionName}
                        </p>
                        <p>
                          <strong>Email:</strong> {selectedTask.user.email}
                        </p>
                      </div>
                    </div>

                    <div className="col-lg-5">
                      <p>
                        <strong>Unit Cost:</strong> {selectedTask.unitCost}
                      </p>
                      <p>
                        <strong>Reward:</strong> {selectedTask.reward}
                      </p>
                      <p>
                        <strong>Reward Asset:</strong>{" "}
                        {selectedTask.rewardAsset}
                      </p>
                    </div>
                    <div className="col-lg-6">
                      <p>
                        <strong>Verification:</strong> {selectedTask.taskStatus}
                      </p>
                      <p>
                        <strong>Category:</strong> {selectedTask.category.name}
                      </p>
                      <p>
                        <strong>Created:</strong>{" "}
                        {selectedTask.category.createdAt.split("T")[0]}
                      </p>
                    </div>
                    <p>{selectedTask.description}</p>
                    <div className="d-flex align-items-center">
                      <p>
                        <Link
                          to={`${selectedTask.link}`}
                          color="text-info"
                          target="_blank"
                        >
                          Link
                        </Link>
                      </p>
                      <p className="ms-2">
                        <Link
                          to={`/snapArt/task_participants`}
                          color="text-info"
                        >
                          Participants
                        </Link>
                      </p>
                    </div>
                  </div>
                )}

                {addingTask && (
                  <form onSubmit={handleAddTask}>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="title">
                        Task Title
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="title"
                        value={addingTask.name || ""}
                        onChange={handleAddChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="imageUrl">
                        Image URL
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="imageUrl"
                        id="imageUrl"
                        value={addingTask.imageUrl || ""}
                        onChange={handleAddChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        className="form-control"
                        name="description"
                        id="description"
                        value={addingTask.description || ""}
                        onChange={handleAddChange}
                        required
                      ></textarea>
                    </div>
                    {/* Additional form fields here */}
                    <button type="submit" className="btn btn-primary w-100">
                      Save Task
                    </button>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <div className="row g-2 w-100">
                  <div className="col-lg-4">
                    <button
                      className="btn btn-primary w-100"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col-lg-4">
                    <button
                      className="btn btn-info w-100"
                      onClick={(e) => handleVerifyTask(e, selectedTask.id)}
                    >
                      {" "}
                      {selectedTask.inactive ? "Unverify" : "Verify"}
                    </button>
                  </div>
                  <div className="col-lg-4">
                    <button className="btn btn-danger w-100">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllTasks;
