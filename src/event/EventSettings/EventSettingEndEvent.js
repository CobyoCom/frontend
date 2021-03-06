import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { selectActiveEventCode } from "../activeEventSelectors";
import { endEventApi } from "../eventApi";
import { FaSignOutAlt } from "react-icons/fa";
import Modal from "react-responsive-modal";
import Button from "../../components/Button/Button";
import "./EventSettingEndEvent.css";

class EventSettingEndEvent extends Component {
  static propTypes = {
    code: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired
  };

  state = {
    isLoading: false,
    showConfirmation: false
  };

  handleEndEvent = () => {
    this.setState({ isLoading: true }, async () => {
      try {
        await endEventApi(this.props.code);
        this.setState({ isLoading: false });
        this.props.onSuccess();
      } catch (error) {
        this.setState({ isLoading: false });
      }
    });
  };

  handleClick = () => this.setState({ showConfirmation: true });

  handleClose = () => this.setState({ showConfirmation: false });

  render() {
    return (
      <Fragment>
        <Button
          onClick={this.handleClick}
          icon={<FaSignOutAlt color="white" size={16} />}
        >
          Close Event
        </Button>
        <Modal
          center
          closeOnOverlayClick
          onClose={this.handleClose}
          open={this.state.showConfirmation}
        >
          <div className="EventSettingEndEvent-message">
            Are you sure you want to end the event?
          </div>
          <div className="EventSettingEndEvent-buttons">
            <Button onClick={this.handleEndEvent}>Yes</Button>
            <Button onClick={this.handleClose}>No</Button>
          </div>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  code: selectActiveEventCode(state)
});
export default connect(mapStateToProps)(EventSettingEndEvent);
