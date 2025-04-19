import React, { useState, useEffect } from "react";
import Layout from "../component/Layout";
import ApiService from "../service/ApiService";
import { useNavigate } from "react-router-dom";
import PaginationComponent from "../component/Pagination";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const isAdmin = ApiService.isAdmin();

  //Pagination Set-Up
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await ApiService.getAllCategory(); // You need this in your ApiService
        setCategories(res.categories);
      } catch (error) {
        showMessage("Failed to fetch categories");
      }
    };
  
    fetchCategories();
  }, []);

  const getAllProducts = async () => {
    try {
      const productData = await ApiService.getAllProducts();
      if (productData.status === 200) {
        setTotalPages(Math.ceil(productData.products.length / itemsPerPage));
        setProducts(
          productData.products.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      }
    } catch (error) {
      showMessage("Error Getting Products");
    }
  };
  
  useEffect(() => {
    if (selectedCategory) {
      fetchProductsByCategory(selectedCategory);
    } else {
      getAllProducts();
    }
  }, [currentPage, selectedCategory]);

  //Delete a product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm("Are you sure you want to delete this Product?")) {
      try {
        await ApiService.deleteProduct(productId);
        showMessage("Product sucessfully Deleted");
        window.location.reload(); //relode page
      } catch (error) {
        showMessage(
          error.response?.data?.message ||
            "Error Deleting in a product: " + error
        );
      }
    }
  };

  //metjhod to show message or errors
  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 4000);
  };

  const fetchProductsByCategory = async (categoryId) => {
    try {
      const response = await ApiService.getProductByCategory(categoryId);
      if (response.status === 200) {
        setTotalPages(Math.ceil(response.products.length / itemsPerPage));
        setProducts(
          response.products.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          )
        );
      }
    } catch (error) {
      showMessage("Error filtering products");
    }
  };

  return (
    <Layout>
      {message && <div className="message">{message}</div>}
      <div className="filter-bar">
        <label>Filter by Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1); // Reset to first page on filter
          }}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-page">
        <div className="product-header">
          <h1>Products</h1>
          {isAdmin && (
          <button
            className="add-product-btn"
            onClick={() => navigate("/add-product")}
          >
            Add Product
          </button>
          )}
        </div>

        {products && (
          <div className="product-list">
            {products.map((product) => (
              <div key={product.id} className="product-item">

                <div className="product-info">
                    <h3 className="name">{product.name}</h3>
                    <p className="sku">Sku: {product.sku}</p>
                    <p className="price">Price: {product.price}</p>
                    <p className="quantity">Quantity: {product.stockQuantity}</p>
                </div>
                {isAdmin && (
                <div className="product-actions">
                    <button className="edit-btn" onClick={()=> navigate(`/edit-product/${product.id}`)}>Edit</button>
                    <button  className="delete-btn" onClick={()=> handleDeleteProduct(product.id)}>Delete</button>
                </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <PaginationComponent
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
      />
    </Layout>
  );
};
export default ProductPage;