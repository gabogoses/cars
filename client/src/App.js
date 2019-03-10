import React, { Component } from "react";

import AppNavbar from "./components/AppNavbar";
import CarModal from "./components/CarModal";
import StationModal from "./components/StationModal";
import CarList from "./components/CarList";
import CarEdit from "./components/EditCar";
import StationList from "./components/StationList";

import { Container } from "reactstrap";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Container>
              <Link to={"/carlist/"} className="btn btn-primary btn-sm ">
                View Cars
              </Link>
              &nbsp;
              <Link to={"/stationlist/"} className="btn btn-primary btn-sm ">
                View Stations
              </Link>
            </Container>
          </div>
          <Switch>
            <Route path="/addcar" component={CarModal} />
            <Route path="/carlist" component={CarList} />
            <Route path="/edit/:id" component={CarEdit} />
            <Route path="/stationlist" component={StationList} />
            <Route path="/addstation" component={StationModal} />
          </Switch>
        </Provider>
      </Router>
    );
  }
}

export default App;
