import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./contexts/AppContext";

function Header(props) {
  const { userResponse, setIsUserUpdated } = React.useContext(AppContext);
  const name = userResponse.name;
  const points = userResponse.points;

  const addPoints = (desiredAmount) => {
    var request = require("request");
    request(
      {
        method: "POST",
        url: "https://coding-challenge-api.aerolab.co/user/points",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM1MmRhNDliNzc4MTAwMjA5YzVhYzgiLCJpYXQiOjE2MjM1MzUwMTJ9.fZzElxjZGKzLuXqtWp-dlNr8EFQ0jfx_7KEJlIdciXc"
        },
        body: `{"amount": ${desiredAmount}}`
      },
      function (error, response, body) {
        console.log("Status:", response.statusCode);
        console.log("Headers:", JSON.stringify(response.headers));
        console.log("Response:", body);
      }
    );
    setIsUserUpdated(false);
  };

  return (
    <header>
      <div className="navbar navbar-dark bg-primary box-shadow">
        <div className="container d-flex justify-content-between">
          <Link to="/">
            <i className="fas fa-shopping-cart fa-2x"></i>
          </Link>
          <h1 align="center" face="Comic Sans MS,arial">
            ELECTRONICS
          </h1>
          <div className="dropdown d-flex">
            <h3 className="nav-item my-auto user-info">
              {name} <i className="fas fa-coins"></i> {points}{" "}
            </h3>

            <button
              className="btn btn-secondary plus-btn"
              type="button"
              id="dropdownMenuButton"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-plus-circle"></i>
            </button>
            <Link to="/history">
              <button className="btn btn-secondary">
                <i className="fas fa-clipboard"></i>
              </button>
            </Link>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item" onClick={() => addPoints(1000)}>
                Add <i className="fas fa-coins"></i> 1000 points
              </button>
              <button className="dropdown-item" onClick={() => addPoints(5000)}>
                Add <i className="fas fa-coins"></i> 5000 points
              </button>
              <button className="dropdown-item" onClick={() => addPoints(7500)}>
                Add <i className="fas fa-coins"></i> 7500 points
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
