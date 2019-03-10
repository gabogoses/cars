/* eslint-disable react/no-typos */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getStations, deleteStation } from "../actions/stationAction.js";
import PropTypes from "prop-types";

class Stationlist extends Component {
  componentDidMount() {
    this.props.getStations();
  }

  onDeleteClick = id => {
    this.props.deleteStation(id);
  };
  render() {
    const { stations } = this.props.station;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="car-list">
            {stations.map(station => (
              <CSSTransition key={station._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <h1>{station.stationName}</h1>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, station._id)}
                  >
                    &times;
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

Stationlist.PropTypes = {
  getStation: PropTypes.func.isRequired,
  station: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  station: state.station
});

export default connect(
  mapStateToProps,
  { getStations, deleteStation }
)(Stationlist);
