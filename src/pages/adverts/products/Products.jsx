import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const Product = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(null);
  const [addProduct, setAddProduct] = useState(null);
  const { data, error, loading } = useFetch(
    import.meta.env.VITE_GET_PRODUCTS,
    {}
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    document.title = "sNup Earn | Products";
    if (data) {
      setProducts(data.products);
    }
  }, [data]);

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="flex-r mb-3">
        <h2>Product List</h2>
        <form className="search-form">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Product Name..."
          />
          <button className="search-btn">Search</button>
        </form>
        <button
          className="btn btn-sm btn-primary"
          onClick={() => openModal(addProduct, "add-pdt")}
        >
          Create More
        </button>
      </div>

      {loading && <p>Loading Products...</p>}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {!loading && !error && filteredProducts && filteredProducts.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-primary">
            <thead>
              <tr>
                <th scope="col">
                  <div className="ms-1">Cover</div>
                </th>
                <th scope="col">Advertiser</th>
                <th scope="col">Cost</th>
                <th scope="col">
                  <div className="text-end me-2"> Action</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td>
                    <img
                      src={product.imgUrl}
                      alt="photo"
                      width="32"
                      height="32"
                      className="rounded-circle"
                    />
                    <span className="ms-2">{product.productName}</span>
                  </td>
                  <td>{product.advertiser}</td>
                  <td>{product.cost}</td>
                  <td className="text-end">
                    <Link
                      className="btn btn-sm btn-outline-primary view-btn"
                      to={`/snapArt/advertisedProduct`}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && <p>No Products Available</p>
      )}

      {selectedProduct && (
        <div
          className="modal fade show custom-modal"
          tabIndex="-1"
          role="dialog"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content animate-modal">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{`Details for ${selectedProduct.productName}`}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                />
              </div>
              <div className="modal-body">
                <div className="product-details-card">
                  <div className="row g-2 align-items-center border-bottom pb-2 mb-2 ">
                    <div className="col-5">
                      <img
                        src={selectedProduct.imgUrl}
                        alt={selectedProduct.productName}
                        width="120"
                        height="120"
                        className="rounded-circle"
                      />
                    </div>
                    <div className="col-7">
                      <p>
                        <strong>Advertiser:</strong>{" "}
                        {selectedProduct.advertiser}
                      </p>
                      <p>
                        <strong>Cost:</strong> {selectedProduct.cost}
                      </p>
                    </div>
                  </div>

                  <p>{selectedProduct.description}</p>
                  <div className="row g-2">
                    <div className="col-4">
                      <Link className="btn btn-sm btn-outline-primary w-100">
                        Add Advert
                      </Link>
                    </div>
                    <div className="col-4">
                      <Link className="btn btn-sm view-btn w-100">Edit</Link>
                    </div>
                    <div className="col-4">
                      <Link className="btn btn-sm view-btn btn-outline-danger w-100">
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {selectedProduct && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Product;
