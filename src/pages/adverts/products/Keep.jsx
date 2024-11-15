import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";

const ProductDetail = () => {
  const [addingAdvert, setAddingAdvert] = useState(null);
  const [addAdvert, setAddAdvert] = useState({
    businessName: "",
    address: "",
    contact: "",
    about: "",
    websiteUrl: "",
    period: "",
    userId: "",
    file: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddAdvert((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setAddAdvert((prevAdvert) => ({
      ...prevAdvert,
      file: e.target.files[0],
    }));
  };

  const openModal = (advert) => {
    setAddingAdvert(advert);
  };

  const closeModal = () => {
    setAddingAdvert(null);
    setSubmissionMessage(""); // Clear message on close
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set loading state

    const formData = new FormData();
    formData.append("businessName", addAdvert.businessName);
    formData.append("address", addAdvert.address);
    formData.append("contact", addAdvert.contact);
    formData.append("about", addAdvert.about);
    formData.append("websiteUrl", addAdvert.websiteUrl);
    formData.append("period", addAdvert.period);
    formData.append("userId", addAdvert.userId);
    formData.append("file", addAdvert.file);

    try {
      const response = await useFetch({
        url: `${import.meta.env.VITE_ADD_ADVERT}`,
        options: {
          method: "POST",
          body: formData,
        },
      });

      setSubmissionMessage("Advertisement submitted successfully!");
    } catch (error) {
      setSubmissionMessage("Failed to submit advertisement. Please try again.");
    } finally {
      setIsSubmitting(false); // End loading state
      closeModal();
    }
  };

  const product = {
    id: "2",
    businessName: "Green Earth Goods",
    coverImage: "https://picsum.photos/id/1020/600/400",
    address: "45 Eco Lane, Portland",
    contact: "+0987654321",
    websiteUrl: "https://greenearthgoods.com",
    period: "6 months",
    status: "unverified",
    about: "Eco-friendly products for sustainable living.",
    expiryDate: "2025-03-01",
    viewsCount: 2750,
    product: "Recycled Paper",
  };

  return (
    <div className="container my-4">
      <div className="product-details-card">
        <div className="row g-3 align-items-center border-bottom pb-3 mb-3">
          <div className="col-md-5">
            <img
              src={product.coverImage}
              alt={product.businessName}
              className="img-fluid rounded-2"
              style={{ width: "250px" }}
            />
          </div>
          <div className="col-md-7">
            <h2>{product.businessName}</h2>
            <p>
              <strong>Product:</strong> {product.product}
            </p>
            <p>
              <strong>Contact:</strong> {product.contact}
            </p>
            <p>
              <strong>Address:</strong> {product.address}
            </p>
          </div>
        </div>

        <p className="mb-4">{product.about}</p>
        <div className="d-flex gap-3">
          <p>
            <strong>Subscription Period:</strong> {product.period}
          </p>
          <p>
            <strong>Expiry Date:</strong> {product.expiryDate}
          </p>
          <p>
            <strong>Views:</strong> {product.viewsCount.toLocaleString()}
          </p>
        </div>

        <div className="row g-2 mb-4 w-75">
          <div className="col-md-4">
            <button
              className="btn btn-sm btn-outline-primary w-100"
              onClick={() => openModal(addAdvert)}
            >
              Add Advert
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-sm btn-outline-secondary w-100">
              Edit
            </button>
          </div>
          <div className="col-md-4">
            <button className="btn btn-sm btn-outline-danger w-100">
              Delete
            </button>
          </div>
        </div>

        {addingAdvert && (
          <div
            className="modal fade show custom-modal"
            tabIndex="-1"
            role="dialog"
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content animate-modal">
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Add Product</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                  />
                </div>
                <div className="modal-body">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Business Name</label>
                      <input
                        type="text"
                        name="businessName"
                        value={addAdvert.businessName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={addAdvert.address}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Contact</label>
                      <input
                        type="text"
                        name="contact"
                        value={addAdvert.contact}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">About</label>
                      <textarea
                        name="about"
                        value={addAdvert.about}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Website URL</label>
                      <input
                        type="url"
                        name="websiteUrl"
                        value={addAdvert.websiteUrl}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Subscription Period</label>
                      <input
                        type="text"
                        name="period"
                        value={addAdvert.period}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">User ID</label>
                      <input
                        type="text"
                        name="userId"
                        value={addAdvert.userId}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Upload File</label>
                      <input
                        type="file"
                        onChange={handleFileChange}
                        className="form-control"
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Advertisement"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
        {addingAdvert && (
          <div className="modal-backdrop fade show" onClick={closeModal}></div>
        )}

        {submissionMessage && (
          <div className="alert alert-info mt-3" role="alert">
            {submissionMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
