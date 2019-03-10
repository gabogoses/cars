/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getCars, deleteCar } from "../actions/carAction.js";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CarModal from "./CarModal";

class Carlist extends Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.getCars();
  }

  onDeleteClick = id => {
    this.props.deleteCar(id);
  };

  render() {
    const { cars } = this.props.car;
    return (
      <Container>
        <CarModal />
        <ListGroup>
          <TransitionGroup className="car-list">
            {cars.map(car => (
              <CSSTransition key={car._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <h1> {car.name} </h1>
                  {car.availability ? (
                    <h2>status: Available</h2>
                  ) : (
                    <h2>Status: Unavailable</h2>
                  )}
                  <h2>
                    Station Name:{" "}
                    {car.station ? car.station.stationName : "Undefiend"}
                  </h2>
                  <br />

                  <Link
                    to={"/edit/" + car._id}
                    className="btn btn-success btn-sm "
                  >
                    Edit
                  </Link>

                  <Button
                    color="danger"
                    style={{ marginLeft: "1rem" }}
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, car._id)}
                  >
                    Delete
                  </Button>
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

// eslint-disable-next-line react/no-typos
Carlist.PropTypes = {
  getCar: PropTypes.func.isRequired,
  car: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  car: state.car
});

export default connect(
  mapStateToProps,
  { getCars, deleteCar }
)(Carlist);
