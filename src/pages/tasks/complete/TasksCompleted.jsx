import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const TasksCompleted = () => {
  const [tasks, setTasks] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [fetchUrl, setFetchUrl] = useState({
    url: import.meta.env.VITE_GET_MY_TASKS,
    options: {},
  });

  const { data, error, loading } = useFetch(fetchUrl.url, fetchUrl.options);

  useEffect(() => {
    document.title = "sNup Earn | My Tasks";
    if (data) {
      const completedTasks = data.my_tasks.filter(
        (mt) => mt.part_completed == "100"
      );
      setTasks(completedTasks);
    }
  }, [data]);

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
        <h2>Completed Tasks</h2>
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
                <th>
                  <div className="ms-1">Cover</div>
                </th>
                <th>Category</th>
                <th>Quantity</th>
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
                    <span className="ms-2">{task.name}</span>
                  </td>
                  <td>{task.category}</td>
                  <td>{task.quantity}</td>
                  <td className="text-end">
                    <Link
                      to={"/snapArt/task_paticipants"}
                      className="btn btn-sm btn-outline-primary view-btn"
                      onClick={() => openModal(task, "view")}
                    >
                      Participants
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No Tasks Available</p>
      )}
    </div>
  );
};

export default TasksCompleted;
