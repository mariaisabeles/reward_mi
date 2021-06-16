import React from "react";
import { AppContext } from "./contexts/AppContext";
import feliz from "../rewards-store/cara_feliz.jpg";
import triste from "../rewards-store/cara_triste.png";

function Product(props) {
  const { userResponse, setIsUserUpdated } = React.useContext(AppContext);
  const { category, name, imgURL, cost, productId } = props;
  const userPoints = userResponse.points;

  const attemptToBuy = (x, productId) => {
    if (x === true) {
      var request = require("request");
      request(
        {
          method: "POST",
          url: "https://coding-challenge-api.aerolab.co/redeem",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM1MmRhNDliNzc4MTAwMjA5YzVhYzgiLCJpYXQiOjE2MjM1MzUwMTJ9.fZzElxjZGKzLuXqtWp-dlNr8EFQ0jfx_7KEJlIdciXc"
          },
          body: `{  "productId": "${productId}"}`
        },
        function (error, response, body) {
          console.log("Status:", response.statusCode);
          console.log("Headers:", JSON.stringify(response.headers));
          console.log("Response:", body);
        }
      );
      setIsUserUpdated(false);
    } else {
    }
  };
  return (
    <div className="col-md-6 col-lg-3 card-container">
      <div className="card">
        <img src={imgURL} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">
            {cost} <i className="fas fa-coins"></i>
          </p>
          <p className="card-text">
            <small className="text-muted">{category}</small>
          </p>
          {userPoints >= cost ? (
            <button
              onClick={() => attemptToBuy(true, productId)}
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#successModal"
            >
              Buy
            </button>
          ) : (
            <button
              onClick={() => attemptToBuy(false)}
              className="btn btn-danger"
              data-toggle="modal"
              data-target="#failureModal"
            >
              You lack {cost - userPoints} points
            </button>
          )}
        </div>
      </div>

      <div
        className="modal fade"
        id="successModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                <b>Redeemed Success</b>
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body" align="center">
              YOU SUCCESFULLY REDEEMED THE PRODUCT
            </div>
            <img src={feliz} alt="happy" />
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="failureModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Redeemed Failure
              </h5>
              <img src={triste} alt="triste" />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              You can not redeem that product. Not enough points.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Product;
