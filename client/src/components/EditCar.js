import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateCar } from "../actions/carAction";
import {
  Button,
  ButtonGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container
} from "reactstrap";
class EditCar extends Component {
  constructor(props) {
    super(props);
    this.onChangeCarName = this.onChangeCarName.bind(this);
    this.onChangeCarAvailability = this.onChangeCarAvailability.bind(this);
    this.onChangeCarStation = this.onChangeCarStation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      car_name: "",
      car_availability: "",
      car_station: "",
      dropdownOpen: false,
      stations: [],
      station: ""
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/stations").then(response => {
      this.setState({
        loading: false,
        stations: response.data
      });
      this.state.stations.map(station => console.log(station.stationName));
    });

    axios
      .get("http://localhost:5000/cars/" + this.props.match.params.id)
      .then(response => {
        this.setState({
          name: response.data.car.name,
          availability: response.data.car.availability
        });

        axios
          .get("http://localhost:5000/stations/" + response.data.car.station)
          .then(response => {
            this.setState({
              stationName: response.data.station.stationName
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  onChangeCarName(e) {
    this.setState({
      name: e.target.value
    });
  }
  onChangeCarAvailability(e) {
    this.setState({
      availability: e
    });
  }
  onChangeCarStation(e) {
    this.setState({
      stationName: e.target.value
    });
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const obj = {
      name: this.state.name,
      availability: this.state.availability,
      station: this.state.station
    };

    axios
      .post(
        "http://localhost:5000/cars/update/" + this.props.match.params.id,
        obj
      )
      .then(res => {
        window.location.href = "/carlist";
      });
  }

  render() {
    return (
      <Container>
        <div style={{ margin: 20, marginTop: 10 }}>
          <h3 align="center">Update Car</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <label>Car Name: </label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={this.onChangeCarName}
              />
            </div>
            <ButtonGroup>
              <Button
                color="primary"
                style={{ marginRight: "1rem" }}
                onClick={() => this.onChangeCarAvailability(true)}
                active={this.state.availability === true}
              >
                Available
              </Button>
              <Button
                color="primary"
                style={{ marginRight: "1rem" }}
                onClick={() => this.onChangeCarAvailability(false)}
                active={this.state.availability === false}
              >
                Unavailable
              </Button>
              <InputGroupButtonDropdown
                addonType="append"
                isOpen={this.state.dropdownOpen}
                toggle={this.toggleDropDown.bind(this)}
              >
                <DropdownToggle caret>Station</DropdownToggle>
                <DropdownMenu>
                  {this.state.stations.map(station => (
                    <DropdownItem name="station" key={station._id}>
                      <div
                        onClick={() => {
                          this.setState({
                            station: station._id
                          });
                        }}
                      >
                        {station.stationName}
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </InputGroupButtonDropdown>
            </ButtonGroup>

            <div className="form-group">
              <input
                type="submit"
                style={{ marginTop: "1rem" }}
                value="Update Car"
                className="btn btn-primary"
              />
            </div>
          </form>
        </div>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  car: state.car
});

export default connect(
  mapStateToProps,
  { updateCar }
)(EditCar);
