import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import History from "./History";
import ProductsDisplay from "./ProductsDisplay";
import { AppContext } from "./contexts/AppContext";
import "./styles.css";

function App() {
  const {
    productsResponse,
    setProductsResponse,
    setUserResponse,
    setIsLoading,
    isUserUpdated,
    setIsUserUpdated,
    setCategoryList
  } = React.useContext(AppContext);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://coding-challenge-api.aerolab.co/products", {
      method: "GET",
      headers: new Headers({
        ContentType: "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM1MmRhNDliNzc4MTAwMjA5YzVhYzgiLCJpYXQiOjE2MjM1MzUwMTJ9.fZzElxjZGKzLuXqtWp-dlNr8EFQ0jfx_7KEJlIdciXc"
      })
    })
      .then((res) => res.json())
      .then((response) => {
        setProductsResponse(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, [setIsLoading, setProductsResponse]);

  useEffect(() => {
    var categories = [];
    productsResponse.forEach((element) => {
      if (!categories.includes(element.category)) {
        categories.push(element.category);
      }
    });
    setCategoryList(categories);
  }, [productsResponse, setCategoryList]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://coding-challenge-api.aerolab.co/user/me", {
      method: "GET",
      headers: new Headers({
        ContentType: "application/json",
        Accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM1MmRhNDliNzc4MTAwMjA5YzVhYzgiLCJpYXQiOjE2MjM1MzUwMTJ9.fZzElxjZGKzLuXqtWp-dlNr8EFQ0jfx_7KEJlIdciXc"
      })
    })
      .then((res) => res.json())
      .then((response) => {
        setUserResponse(response);
        setIsLoading(false);
        setIsUserUpdated(true);
      })
      .catch((error) => console.log(error));
  }, [isUserUpdated, setIsLoading, setIsUserUpdated, setUserResponse]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <ProductsDisplay pageNumber={"1"} />}
        />
        <Route
          exact
          path="/store-project"
          render={() => <ProductsDisplay pageNumber={"1"} />}
        />
        <Route
          path="/page/:pageNumber"
          render={({ match }) => (
            <ProductsDisplay pageNumber={match.params.pageNumber} />
          )}
        />
        <Route exact path="/history" render={() => <History />} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
