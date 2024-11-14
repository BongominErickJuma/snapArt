import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useAuth } from "../../../contexts/AuthContex";

const Taskscategories = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(""); // "create", "edit", "view", "delete"
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [fetchUrl, setFetchUrl] = useState({
    url: import.meta.env.VITE_TASK_CATEGORIES,
    options: {
      token,
    },
  });

  const { data, error, loading } = useFetch(fetchUrl.url, fetchUrl.options);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  // Functions to open each modal
  const handleShowModal = (type, category = null) => {
    setModalType(type);
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Task Categories</h2>
        <form className="search-form">
          <input type="search" placeholder="Search Categories..." />
          <button className="search-btn">Search</button>
        </form>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => handleShowModal("create")}
        >
          Create More
        </button>
      </div>
      {loading && <p>Loading categories...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}
      {!loading && !error && categories.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th>Name</th>
                <th>Unit Cost</th>
                <th>Subscription</th>
                <th>Profit Rate</th>
                <th className="text-end">Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>${category.unitCost.toFixed(2)}</td>
                  <td>{category.allowedSubscription}</td>
                  <td>{(category.profitRate * 100).toFixed(0)}%</td>
                  <td className="text-end">
                    <span
                      className={`badge ${
                        category.active ? "bg-success" : "bg-danger"
                      }`}
                    >
                      {category.active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm view-btn"
                      onClick={() => handleShowModal("view", category)}
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
        !loading && <p>No categories available.</p>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modalType === "create"
                    ? "Create Category"
                    : modalType === "view"
                    ? "View Category"
                    : modalType === "edit"
                    ? "Edit Category"
                    : "Delete Category"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                {modalType === "view" && selectedCategory && (
                  <div>
                    <p>
                      <strong>Name:</strong> {selectedCategory.name}
                    </p>
                    <p>
                      <strong>Description:</strong>{" "}
                      {selectedCategory.description}
                    </p>
                    <p>
                      <strong>Unit Cost:</strong> $
                      {selectedCategory.unitCost.toFixed(2)}
                    </p>
                    <p>
                      <strong>Subscription:</strong>{" "}
                      {selectedCategory.allowedSubscription}
                    </p>
                    <p>
                      <strong>Profit Rate:</strong>{" "}
                      {(selectedCategory.profitRate * 100).toFixed(0)}%
                    </p>
                  </div>
                )}

                {modalType === "create" && (
                  <form>{/* Add form fields for creating a category */}</form>
                )}

                {modalType === "edit" && selectedCategory && (
                  <form>
                    {/* Add form fields pre-filled with selectedCategory for editing */}
                  </form>
                )}

                {modalType === "delete" && selectedCategory && (
                  <p>
                    Are you sure you want to delete {selectedCategory.name}?
                  </p>
                )}
              </div>
              <div className="modal-footer">
                {modalType === "delete" ? (
                  <button type="button" className="btn btn-danger">
                    Confirm Delete
                  </button>
                ) : (
                  <button type="button" className="btn btn-primary">
                    {modalType === "create" ? "Create" : "Save Changes"}
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Taskscategories;
