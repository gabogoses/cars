/* eslint-disable no-useless-constructor */
import React, { Component } from "react";
import {
  Container,
  ListGroupItem,
  Button,
  Badge,
  CardGroup,
  Card
} from "reactstrap";
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
        <TransitionGroup className="car-list">
          {cars.map(car => (
            <CSSTransition key={car._id} timeout={500} classNames="fade">
              <CardGroup>
                <Card style={{ marginTop: "1rem" }}>
                  <ListGroupItem>
                    <h1>
                      <Badge color="light">{car.name} </Badge>
                    </h1>
                    {car.availability ? (
                      <h4>Status: Available</h4>
                    ) : (
                      <h4>Status: Unavailable</h4>
                    )}
                    <h4>
                      Station Name:{" "}
                      {car.station ? car.station.stationName : "Undefiend"}
                    </h4>
                    <Link
                      to={"/edit/" + car._id}
                      className="btn btn-success btn-sm "
                    >
                      Edit
                    </Link>

                    <Button
                      color="danger"
                      style={{ marginLeft: "0.3rem" }}
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, car._id)}
                    >
                      Delete
                    </Button>
                  </ListGroupItem>
                </Card>
              </CardGroup>
            </CSSTransition>
          ))}
        </TransitionGroup>
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
