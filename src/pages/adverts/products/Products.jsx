import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState(null);
  const [addProduct, setAddProduct] = useState({
    productName: "",
    imgUrl: "",
    description: "",
    advertiser: "",
    cost: "",
  });
  const [addingProduct, setAddingProduct] = useState(null);

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
    setAddingProduct(product);
  };

  const closeModal = () => {
    setAddingProduct(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

      {addingProduct && (
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
                <div className="product-details-card">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="productName" className="form-label">
                        Product Name:
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={addProduct.productName}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="imgUrl" className="form-label">
                        Image URL:
                      </label>
                      <input
                        type="url"
                        id="imgUrl"
                        name="imgUrl"
                        value={addProduct.imgUrl}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description:
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={addProduct.description}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="advertiser" className="form-label">
                        Advertiser:
                      </label>
                      <input
                        type="text"
                        id="advertiser"
                        name="advertiser"
                        value={addProduct.advertiser}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="cost" className="form-label">
                        Cost:
                      </label>
                      <input
                        type="text"
                        id="cost"
                        name="cost"
                        value={addProduct.cost}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>

                    <button type="submit" className="btn btn-primary">
                      Add Product
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {addingProduct && (
        <div className="modal-backdrop fade show" onClick={closeModal}></div>
      )}
    </div>
  );
};

export default Product;
