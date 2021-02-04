import React, { Component, Suspense, lazy } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Loader from "./loader";

// ROUTES
import OnPageChange from "../utilities/hocs/OnPageChange";

// HEADER & FOOTER
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

// LAZY IMPORT
const Airdrop = lazy(() => import("../components/airdrop"));

export default class Routes extends Component {
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <OnPageChange>
            <Header />
            <Switch>
              <Route exact path={"/"} component={ Airdrop } />
              <Route
                path={"/404"}
                render={() =>
                window.location.replace("https://shop.metafactory.ai")
                }
              />
              <Redirect to={"/404"} />
            </Switch>
            <Footer />
          </OnPageChange>
        </Suspense>
      </BrowserRouter>
    );
  }
}
