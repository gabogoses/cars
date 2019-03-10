import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
// import { addCar } from "../actions/carAction";
import { addStation } from "../actions/stationAction";

class StationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      stationName: ""
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newStation = {
      stationName: this.state.stationName
    };
    this.props.addStation(newStation);
    console.log(newStation);
  };

  render() {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "4rem" }}
          onClick={this.toggle}
        >
          Add Station
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add To Station List</ModalHeader>
          <ModalBody>
            <Form inline onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="car" />
                <Input
                  type="text"
                  name="stationName"
                  id="station"
                  placeholder="Add Station"
                  onChange={this.onChange}
                />
                <Button color="dark" style={{ marginTop: "2rem" }} block>
                  Add Station
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  station: state.station
});

export default connect(
  mapStateToProps,
  { addStation }
)(StationModal);
