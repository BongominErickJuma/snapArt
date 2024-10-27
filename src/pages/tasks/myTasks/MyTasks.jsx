import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";

const MyTasks = () => {
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
    url: import.meta.env.VITE_GET_MY_TASKS,
    options: {},
  });

  const { data, error, loading } = useFetch(fetchUrl.url, fetchUrl.options);

  useEffect(() => {
    document.title = "sNup Earn | My Tasks";
    if (data) {
      setTasks(data.my_tasks);
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
        task.name.toLowerCase().includes(searchQuery.toLowerCase())
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
          onClick={() => openModal(addTask, "add-task")}
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
                <th>Task Title</th>
                <th>Unit Cost</th>
                <th>Base Asset</th>
                <th>Status</th>
                <th>Category</th>
                <th>Created</th>
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
                  <td>{task.name}</td>
                  <td>{task.unitCost}</td>
                  <td>{task.baseAsset}</td>
                  <td>{`${task.inactive ? "active" : "inactive"}`}</td>
                  <td>{task.category}</td>
                  <td>{task.createdAt}</td>
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
                  <div className="task-details-card">
                    <h4>{selectedTask.name}</h4>
                    <img
                      src={selectedTask.image}
                      alt={selectedTask.name}
                      className="img-fluid mb-3 w-100"
                    />
                    <p>
                      <strong>Description:</strong> {selectedTask.description}
                    </p>
                    <p>
                      <strong>Unit Cost:</strong> {selectedTask.unitCost}
                    </p>
                    <p>
                      <strong>Reward Asset:</strong> {selectedTask.baseAsset}
                    </p>
                    <p>
                      <strong>Created:</strong> {selectedTask.createdAt}
                    </p>
                    <p>
                      <strong>Task Status:</strong>{" "}
                      {selectedTask.inactive ? "Taken" : "Not Taken"}
                    </p>
                    <p>
                      <strong>Category:</strong> {selectedTask.category}
                    </p>
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyTasks;
