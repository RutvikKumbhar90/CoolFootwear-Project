import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2"; // For error or success pop-up alerts

function AddProducts() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    category: "",
    price: "",
    mrp: "",
    imageUrl: "",
    brand: "",
    color: "",
    size: "",
    description: "",
  });

  const handleChange = (e) => {
    // Update state based on input changes
    setData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  // Set the category, brand, and size specifically
  const handleSelectChange = (field) => (e) => {
    setData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch existing product data for the given ID
      axios
        .get(`${import.meta.env.VITE_API_KEY}${id}`)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Error fetching product data:", error);
        });
    } else {
      // Reset form data if no ID is provided
      setData({
        title: "",
        category: "",
        price: "",
        mrp: "",
        imageUrl: "",
        brand: "",
        color: "",
        size: "",
        description: "",
      });
    }
  }, [id]); // Run effect when 'id' changes

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Validate form fields
    if (Object.values(data).some((field) => field.trim() === "")) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required!",
        icon: "error",
        confirmButtonText: "Ok",
      });
      return;
    }

    const request = id ? axios.put : axios.post;
    const endpoint = id
      ? `${import.meta.env.VITE_API_KEY}${id}`
      : import.meta.env.VITE_API_KEY;

    request(endpoint, data)
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: `Product ${id ? "updated" : "added"} successfully.`,
          icon: "success",
          confirmButtonText: "Ok",
        });
        // Reset form data
        setData({
          title: "",
          category: "",
          price: "",
          mrp: "",
          imageUrl: "",
          brand: "",
          color: "",
          size: "",
          description: "",
        });
        navigate("/admin/addproducts")
      })
      .catch((error) => {
        console.error(`Error ${id ? "updating" : "adding"} product:`, error);
      });
  };

  return (
    <>
      {/* Breadcrumbs for navigation */}
      <div className="breadcrumbs">
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <p className="bread fw-bold">
                <span>
                  <Link to={"/admin/dashboard"}>Admin</Link>
                </span>{" "}
                / <span>Add Product</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="container-fluid" id="addProducts">
        <form onSubmit={handleSubmit}>
          {/* First Row: Title, Category */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="title" className="form-label fw-bold">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                placeholder="Product Title"
                value={data.title}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="category" className="form-label fw-bold">
                Category
              </label>
              <select
                className="form-control"
                id="category"
                value={data.category}
                onChange={handleSelectChange("category")}
              >
                <option value="">Select Category</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Kid">Kid</option>
              </select>
            </div>
          </div>

          {/* Second Row: Price, MRP, Image */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="price" className="form-label fw-bold">
                Price
              </label>
              <input
                type="text"
                className="form-control"
                id="price"
                placeholder="Product Price"
                value={data.price}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="mrp" className="form-label fw-bold">
                MRP
              </label>
              <input
                type="text"
                className="form-control"
                id="mrp"
                placeholder="Product MRP"
                value={data.mrp}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="imageUrl" className="form-label fw-bold">
                Image URL
              </label>
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                placeholder="Image URL"
                value={data.imageUrl}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Third Row: Brand, Color, Size */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label htmlFor="brand" className="form-label fw-bold">
                Brand
              </label>
              <select
                id="brand"
                value={data.brand}
                className="form-control"
                onChange={handleSelectChange("brand")}
              >
                <option value="">Select Brand</option>
                <option value="Adidas">Adidas</option>
                <option value="Bata">Bata</option>
                <option value="Puma">Puma</option>
                <option value="Nike">Nike</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="color" className="form-label fw-bold">
                Color
              </label>
              <input
                type="text"
                className="form-control"
                id="color"
                placeholder="Product Color"
                value={data.color}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="size" className="form-label fw-bold">
                Size
              </label>
              <select
                id="size"
                value={data.size}
                className="form-control"
                onChange={handleSelectChange("size")}
              >
                <option value="">Select Size</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>

          {/* Fourth Row: Description */}
          <div className="row mb-3">
            <div className="col-12">
              <label htmlFor="description" className="form-label fw-bold">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                rows="4"
                placeholder="Product Description"
                value={data.description}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="row">
            <div className="col text-center">
              <button className="btn btn-success" type="submit">
                {id ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProducts;
