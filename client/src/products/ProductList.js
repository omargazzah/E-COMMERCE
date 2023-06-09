import { Link } from "react-router-dom";
import Product from "./Product";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
const axios = require("axios");

const categories = [
  "All Products",
  "Phones & Tablets",
  "Cases & Covers",
  "Screen Guards",
  "Cables & Chargers",
  "Power Banks",
];

const brands = ["Apple", "Samsung", "Google", "HTC"];

const manufacturers = ["HOCO", "Nillkin", "Remax", "Baseus"];

function FilterMenuLeft() {
  return (
    <ul className="list-group list-group-flush rounded">
      <li className="list-group-item d-none d-lg-block">
        <h5 className="mt-1 mb-2">Browse</h5>
        <div className="d-flex flex-wrap my-2">
          {categories.map((v, i) => {
            return (
              <Link
                key={i}
                to="/products"
                className="btn btn-sm btn-outline-dark rounded-pill me-2 mb-2"
                replace
              >
                {v}
              </Link>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Category</h5>
        <div className="d-flex flex-column">
          {brands.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-1">Town</h5>
        <div className="d-flex flex-column">
          {manufacturers.map((v, i) => {
            return (
              <div key={i} className="form-check">
                <input className="form-check-input" type="checkbox" />
                <label className="form-check-label" htmlFor="flexCheckDefault">
                  {v}
                </label>
              </div>
            );
          })}
        </div>
      </li>
      <li className="list-group-item">
        <h5 className="mt-1 mb-2">Price Range</h5>
        <div className="d-grid d-block mb-3">
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Min"
              defaultValue="100000"
            />
            <label htmlFor="floatingInput">Min Price</label>
          </div>
          <div className="form-floating mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Max"
              defaultValue="500000"
            />
            <label htmlFor="floatingInput">Max Price</label>
          </div>
          <button className="btn btn-dark">Apply</button>
        </div>
      </li>
    </ul>
  );
}

function ProductList() {
  const [viewType, setViewType] = useState({ grid: true });
  const [product, setCategory] = useState([]);
  const [search, setsearch] = useState("");
  useEffect(() => {
    const getallproducts = async () => {
      const res = await axios.get("http://localhost:8000/api/getallproducts");
      const getdata = await res.data;
      setCategory(getdata.data);
    };
    getallproducts();
  }, []);
  const [productNames, setProductNames] = useState([]);
  useEffect(() => {
    for (const prod of product) {
      productNames.push(prod.name);
    }
  }, [product, productNames]);

  function changeViewType() {
    setViewType({
      grid: !viewType.grid,
    });
  }

  return (
    <div className="container mt-5 py-4 px-xl-5">
      <ScrollToTopOnMount />
      <nav aria-label="breadcrumb" className="bg-custom-light rounded">
        <ol className="breadcrumb p-3 mb-0">
          <li className="breadcrumb-item">
            <Link
              className="text-decoration-none link-secondary"
              to="/products"
              replace
            >
              All Cars
            </Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page"></li>
        </ol>
      </nav>

      <div className="h-scroller d-block d-lg-none">
        <nav className="nav h-underline">
          {categories.map((v, i) => {
            return (
              <div key={i} className="h-link me-2">
                <Link
                  to="/products"
                  className="btn btn-sm btn-outline-dark rounded-pill"
                  replace
                >
                  {v}
                </Link>
              </div>
            );
          })}
        </nav>
      </div>

      <div className="row mb-3 d-block d-lg-none">
        <div className="col-12">
          <div id="accordionFilter" className="accordion shadow-sm">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button fw-bold collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseFilter"
                  aria-expanded="false"
                  aria-controls="collapseFilter"
                >
                  Filter cars
                </button>
              </h2>
            </div>
            <div
              id="collapseFilter"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFilter"
            >
              <div className="accordion-body p-0">
                <FilterMenuLeft />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="row mb-4 mt-lg-3"
        style={{
          placeContent: "center",
        }}
      >
        {/* <div className="d-none d-lg-block col-lg-3">
          <div className="border rounded shadow-sm">
            <FilterMenuLeft />
          </div>
        </div> */}
        <div className="col-lg-9">
          <div className="d-flex flex-column h-100">
            <div className="row mb-3">
              <div className="col-lg-3 d-none d-lg-block">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  defaultValue=""
                >
                  <option value="">Select Model</option>
                  <option value="model-2018">Model-2018</option>
                  <option value="model-2018">Model-2019</option>
                  <option value="model-2018">Model-2020</option>
                  <option value="model-2018">Model-2021</option>
                  <option value="model-2018">Model-2022</option>
                </select>
              </div>
              <div className="col-lg-9 col-xl-5 offset-xl-4 d-flex flex-row">
                <div
                  className="input-group"
                  style={{
                    justifyContent: "right",
                  }}
                >
                  <input
                    className="Searchbar"
                    type="searchbar"
                    placeholder="Search cars..."
                    onChange={(event) => {
                      event.preventDefault();
                      setsearch(event.target.value);
                    }}
                  />
                  <button className="btn btn-outline-dark">
                    <FontAwesomeIcon icon={["fas", "search"]} />
                  </button>
                </div>
                <button
                  className="btn btn-outline-dark ms-2 d-none d-lg-inline"
                  onClick={changeViewType}
                >
                  <FontAwesomeIcon
                    icon={["fas", viewType.grid ? "th-list" : "th-large"]}
                  />
                </button>
              </div>
            </div>
            <div
              className={
                "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 " +
                (viewType.grid ? "row-cols-xl-3" : "row-cols-xl-2")
              }
            >
              {product
                .sort(function (a, b) {
                  return Date.parse(b.createdAt) - Date.parse(a.createdAt);
                })
                .map((el, index) => {
                  if (el.name.includes(search.toLowerCase())) {
                    return (
                      <Product
                        data={el}
                        key={el._id}
                        path={"/products/" + el._id}
                      />
                    );
                  } else return "";
                })}
              {/* {product
                .filter((word) => {
                  word.name.toLowerCase().includes(search.toLowerCase());
                })
                .map((el, index) => {
                  return (
                    <Product
                      data={el}
                      key={el._id}
                      path={"/products/" + el._id}
                    />
                  );
                })} */}
            </div>
            <div className="d-flex align-items-center mt-auto">
              <span className="text-muted small d-none d-md-inline">
                Showing 1 of 100
              </span>
              <nav aria-label="Page navigation example" className="ms-auto">
                <ul className="pagination my-0">
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="!#">
                      1
                    </a>
                  </li>
                  <li className="page-item ">
                    <a className="page-link" href="!#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="!#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
