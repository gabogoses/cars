/* eslint-disable no-useless-constructor */
/* eslint-disable react/no-typos */
/* eslint-disable no-unused-expressions */
import React, { Component } from "react";
import {
  Container,
  ListGroupItem,
  Button,
  Badge,
  Card,
  CardGroup
} from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { connect } from "react-redux";
import { getStations, deleteStation } from "../actions/stationAction.js";
import PropTypes from "prop-types";
import StationModal from "./StationModal";

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
        <StationModal />
        <TransitionGroup className="station-list">
          {stations.map(station => (
            <CSSTransition key={station._id} timeout={500} classNames="fade">
              <CardGroup>
                <Card style={{ marginTop: "1rem" }}>
                  <ListGroupItem>
                    <h1>
                      <Badge color="light">{station.stationName}</Badge>
                    </h1>
                    <Button
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, station._id)}
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
