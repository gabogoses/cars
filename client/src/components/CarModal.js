import React, { Component } from "react";
import axios from "axios";

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  ButtonGroup,
  InputGroup,
  InputGroupButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import { connect } from "react-redux";
import { addCar } from "../actions/carAction";
// import { addStation } from "../actions/carStation";
// eslint-disable-next-line no-unused-expressions

class CarModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      name: "",
      rSelected: true,
      dropdownOpen: false,
      splitButtonOpen: false,
      stations: [],
      station: ""
    };
    this.changeBackfrop = this.changeBackdrop.bind(this);
  }

  async componentDidMount() {
    const response = await axios.get("http://localhost:5000/stations");
    await this.setState({
      loading: false,
      stations: response.data
    });
    this.state.stations.map(station => console.log(station.stationName));
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  changeBackdrop(e) {
    let value = e.target.value;
    if (value !== "available") {
      value = JSON.parse(value);
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newCar = {
      name: this.state.name,
      availability: this.state.rSelected,
      station: this.state.station
    };

    this.props.addCar(newCar);
  };

  onRadioBtnClick(rSelected) {
    this.setState({ rSelected });
  }

  toggleDropDown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginTop: "1.5rem", marginBottom: "1.5rem" }}
          onClick={this.toggle}
        >
          Add Car
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Car List</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="car" />
                <div>
                  <Input
                    type="text"
                    name="name"
                    id="car"
                    placeholder="Add Car"
                    onChange={this.onChange}
                  />

                  <br />
                  <br />
                  <ButtonGroup>
                    <Button
                      color="primary"
                      onClick={() => this.onRadioBtnClick(true)}
                      active={this.state.rSelected === true}
                    >
                      Available
                    </Button>
                    <Button
                      color="primary"
                      onClick={() => this.onRadioBtnClick(false)}
                      active={this.state.rSelected === false}
                    >
                      Unavailable
                    </Button>
                  </ButtonGroup>
                  <br />
                  <br />
                  <InputGroup>
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
                  </InputGroup>

                  <Button color="dark" style={{ marginTop: "2rem" }} block>
                    Add Car
                  </Button>
                </div>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  car: state.car
});

export default connect(
  mapStateToProps,
  { addCar }
)(CarModal);
