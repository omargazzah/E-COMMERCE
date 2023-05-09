import Product from "../products/Product";
import { useEffect, useState } from "react";
import axios from "axios";

function FeatureProduct() {
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
    <div className="col">
      {product
        .sort(function (a, b) {
          return Date.parse(b.createdAt) - Date.parse(a.createdAt);
        })
        .map((el, index) => {
          if (el.name.includes(search.toLowerCase())) {
            return (
              <Product data={el} key={el._id} path={"/products/" + el._id} />
            );
          }
        })}
    </div>
  );
}

export default FeatureProduct;
