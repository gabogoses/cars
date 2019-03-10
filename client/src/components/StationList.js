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
            {stations.map(({ _id, stationName }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={this.onDeleteClick.bind(this, _id)}
                  >
                    &times;
                  </Button>
                  {stationName}
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
