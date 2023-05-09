import React, { useState, useEffect } from "react";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { tokenValid, parseJwt } from "../utils/token";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profil() {
  const history = useHistory();
  const [tokenProfile, setTokenProfile] = useState("");
  const token = localStorage.token;

  const email = localStorage.email;

  const name = localStorage.name;
  const number = localStorage.number;
  useEffect(() => {
    const token = localStorage.token;
    if (tokenValid(token)) {
      const decoded = parseJwt(token);
      setTokenProfile(decoded);
    } else {
      history.push("/");
    }
  }, [token, history]);

  const decoded = parseJwt(token);
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
        <form>
          <div style={{ textAlign: "center" }}>
            <img
              src="https://www.nicepng.com/png/detail/522-5226533_get-beyond-the-usual-suspects-profile-pic-icon.png"
              alt="Get Beyond The Usual Suspects - Profile Pic Icon Round@nicepng.com"
              style={{ width: "116px" }}
            ></img>
          </div>
          <br />
          name:
          <h2>{name}</h2>
          <br />
          email:
          <h2>{email}</h2>
          <br />
          number:
          <h2>{number || tokenProfile.number}</h2>
          <br />
          <div
            style={{
              textAlign: "center",
            }}
          >
            <button
              className="btn btn-outline-dark ms-auto"
              onclick={(event) =>
                history.push(
                  "http://localhost:3000/#/UpdateUser/" + decoded._id
                )
              }
            >
              <a href={"http://localhost:3000/#/UpdateUser/" + decoded._id}>
                <FontAwesomeIcon icon={["fas", "edit"]} /> Update Profil
              </a>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profil;
