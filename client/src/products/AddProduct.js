import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import axios from "axios";
import FileBase64 from "react-file-base64";
import { tokenValid, parseJwt } from "../utils/token";
import { useHistory } from "react-router-dom";

function AddProduct() {
  const [state, setState] = useState({
    name: "",
    model: "",
    price: "",
    region: "",
    datef: "",
    datet: "",
    image: "",
    description: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post(
      "http://localhost:8000/api/AddProduct",
      state,
      {
        headers: {
          Authorization: `Bearer ${token.slice(1, token.length - 1)}`,
        },
      }
    );
    setState({
      name: "",
      model: "",
      price: "",
      region: "",
      datef: "",
      datet: "",
      image: "",
      description: "",
    });
    e.target.reset();
  }
  const history = useHistory();
  const [tokenProfile, setTokenProfile] = useState("");
  const token = localStorage.token;

  useEffect(() => {
    const token = localStorage.token;
    const decoded = parseJwt(token);
    if (tokenValid(token)) {
      setTokenProfile(decoded);
    } else {
      history.push("/");
    }
    if (decoded?.role !== "Agence") history.push("/");
  }, [token, history]);
  return (
    <div
      className="container mt-5 py-4 px-xl-5"
      style={{ textAlign: "-webkit-center" }}
    >
      <ScrollToTopOnMount />
      <div
        style={{
          width: "40%",
          textAlign: "left",
          boxShadow: "0px 0PX 15PX 10PX #bbb",
          borderRadius: "10PX",
          padding: "1%",
        }}
      >
        <form onSubmit={handleSubmit}>
          Name:
          <input
            name="name"
            className="form-control"
            type="text"
            placeholder="Name of Car"
            aria-label="search input"
            onChange={handleChange}
          />
          <br />
          <label>
            Model:
            <select
              name="model"
              onChange={handleChange}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Select Model</option>
              <option value="model-2018">Model-2018</option>
              <option value="model-2018">Model-2019</option>
              <option value="model-2018">Model-2020</option>
              <option value="model-2018">Model-2021</option>
              <option value="model-2018">Model-2022</option>
            </select>
          </label>
          <br />
          <br />
          Price:
          <input
            name="price"
            className="form-control"
            placeholder="Price of car"
            aria-label="search input"
            onChange={handleChange}
          />
          <br />
          <label>
            Department:
            <select
              name="region"
              onChange={handleChange}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="">Choisir la region</option>
              <option value="sousse">Sousse</option>
              <option value="Tunis">Tunis</option>
              <option value="Sfax">Sfax</option>
              <option value="Djerba">Djerba</option>
              <option value="l'Ariana">l'Ariana</option>
              <option value="Nabeul">Nabeul</option>
              <option value="Bizerte">Bizerte</option>
              <option value="Le Kef">Le Kef</option>
              <option value="Monastir">Monastir</option>
              <option value="kairaouine">kairaouine</option>
              <option value="Mahdiya">Mahdiya</option>
              <option value="Jendouba">Jendouba</option>
              <option value="Gafsa">Gafsa</option>
              <option value="Gabès">Gabès</option>
              <option value="La Manouba">La Manouba</option>
              <option value="Sidi Bouzid">Sidi Bouzid</option>
              <option value="Mednine">Mednine</option>
              <option value="Touzeur">Touzeur</option>
              <option value="Kaserrine">Kaserrine</option>
              <option value="Tataouine">Tataouine</option>
              <option value="Zaghouan">Zaghouan</option>
              <option value="Béja">Béja</option>
              <option value="Siliana">Siliana</option>
              <option value="Kébili">Kébili</option>
            </select>
          </label>
          <br />
          <br />
          Date:
          <br />
          From:
          <input
            name="datet"
            className="form-control"
            type="date"
            onChange={handleChange}
          />
          to
          <input
            name="datef"
            className="form-control"
            type="date"
            onChange={handleChange}
          />
          <br />
          <br />
          Image:
          <div className="form-control">
            <FileBase64
              name="image"
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setState({
                  ...state,
                  image: base64,
                })
              }
            />
          </div>
          <br />
          Description:
          <input
            name="description"
            className="form-control"
            type="text"
            placeholder="Description of Cars"
            aria-label="search input"
            onChange={handleChange}
          />
          <br />
          <input
            type="submit"
            value="Add"
            className="btn btn-dark py-2 w-100"
          />
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
