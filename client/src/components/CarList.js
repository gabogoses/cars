import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getCars, deleteCar } from "../actions/carAction.js";
import PropTypes from "prop-types";

class Carlist extends Component {
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
        <ListGroup>
          <TransitionGroup className="car-list">
            {cars.map(car => (
              <CSSTransition key={car._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <h1> {car.name} </h1>
                  <p>
                    {car.availability ? (
                      <h1>status: Available</h1>
                    ) : (
                      <h1>Status: Unavailable</h1>
                    )}
                  </p>
                  <h1>{car.station.stationName}</h1>
                  <br />
                  <Button
                    color="danger"
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
