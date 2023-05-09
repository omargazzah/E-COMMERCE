import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { tokenValid, parseJwt } from "../utils/token";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useParams } from "react-router-dom";
function UpdateProfil() {
  const history = useHistory();
  const [tokenProfile, setTokenProfile] = useState("");
  const token = localStorage.token;

  const { slug } = useParams();
  useEffect(() => {
    const token = localStorage.token;
    if (tokenValid(token)) {
      const decoded = parseJwt(token);
      setTokenProfile(decoded);
    } else {
      history.push("/");
    }
  }, [token, history]);

  const [state, setState] = useState({
    name: "",
    email: "",
    number: "",
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
    console.log(state);
    localStorage.setItem([e.target.name], e.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    history.push("/profil");
    await axios.put(
      `http://localhost:8000/api/updateUser/${slug}`,
      {
        name: state.name === "" ? null : state.name,
        email: state.email === "" ? null : state.email,
        number: state.number === "" ? null : state.number,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  //   useEffect(async () => {
  //     changeLocalStorage().catch((err) => console.log(err));
  //   }, [state, changeLocalStorage]);
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
          <div style={{ textAlign: "center" }}>
            <img
              src="https://www.nicepng.com/png/detail/522-5226533_get-beyond-the-usual-suspects-profile-pic-icon.png"
              alt="Get Beyond The Usual Suspects - Profile Pic Icon Round@nicepng.com"
              style={{ width: "116px" }}
            ></img>
          </div>
          <br />
          name:
          <input onChange={handleChange} type="text" name="name" />
          <br /> <br />
          email:
          <input onChange={handleChange} type="text" name="email" />
          <br /> <br />
          number:
          <input onChange={handleChange} type="text" name="number" />
          <br /> <br />
          <div
            style={{
              textAlign: "center",
            }}
          >
            <button type="submit" className="btn btn-outline-dark ms-auto">
              <FontAwesomeIcon icon={["fas", "edit"]} /> Update Profil
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateProfil;
