import Banner from "./Banner";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Product from "../products/Product";
import { useEffect, useState } from "react";
import axios from "axios";

function Landing() {
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
  return (
    <>
      <ScrollToTopOnMount />
      <Banner />
      <div className="d-flex flex-column bg-white py-4">
        <p className="text-center px-5">
          Notre site de location de voitures vous offre une grande sélection de
          véhicules de plusieures agences pour répondre à tous vos besoins de
          déplacement. Réservez en ligne dès maintenant et profitez de notre
          service clientèle attentionné pour une expérience de location de
          voiture agréable et sans tracas.
        </p>
        <div className="d-flex justify-content-center">
          <Link to="/products" className="btn btn-primary" replace>
            Browse Cars
          </Link>
        </div>
      </div>
      <h2 className="text-muted text-center mt-4 mb-3">New Arrival</h2>
      <div className="container pb-5 px-lg-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 px-md-5">
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
              }
            })}
        </div>
      </div>
      <div className="d-flex flex-column bg-white py-4">
        <h5 className="text-center mb-3">Follow us on</h5>
        <div className="d-flex justify-content-center">
          <a href="www.google.com" className="me-3">
            <FontAwesomeIcon icon={["fab", "facebook"]} size="2x" />
          </a>
          <a href="www.google.com">
            <FontAwesomeIcon icon={["fab", "instagram"]} size="2x" />
          </a>
          <a href="www.google.com" className="ms-3">
            <FontAwesomeIcon icon={["fab", "twitter"]} size="2x" />
          </a>
        </div>
      </div>
    </>
  );
}

export default Landing;
