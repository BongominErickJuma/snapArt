import React from "react";
import { Link } from "react-router-dom";

const ProductDetail = () => {
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
            <Link className="btn btn-sm btn-outline-primary w-100">
              Add Advert
            </Link>
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
      </div>
    </div>
  );
};

export default ProductDetail;
