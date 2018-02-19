import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {addTime, fromNow} from '../../helpers/moment';
import {changeTravelMode, refreshEvent} from '../eventActions';
import AttendeesListItem, {AttendeePropTypes} from './AttendeesListItem';
import {selectUserName, selectIsRefreshing, selectEventId} from "../activeEventSelectors";

const EARLY = 'EARLY';
const LATE = 'LATE';

class AttendeesListItemContainer extends Component {

  static propTypes = {
    ...AttendeePropTypes,
    eventId: PropTypes.number.isRequired,
    isMe: PropTypes.bool.isRequired,
    isRefreshing: PropTypes.bool.isRequired,
    changeTravelMode: PropTypes.func.isRequired,
    refreshEvent: PropTypes.func.isRequired
  };

  state = {
    isTravelModeOpen: false
  };

  formatArrivalTime = eta => {
    return moment(eta).calendar(null, {
      sameDay: 'h:mm a',
      nextDay: '[Tomorrow at ] h:mm a',
      nextWeek: 'dddd h:mm a',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: '[-]'
    });
  };

  getIsIconClickable = () => this.props.isMe && !this.getHasProbablyArrived() && !this.props.isRefreshing;

  getHasProbablyArrived = () => this.props.duration < 60;

  getDurationStatus = () => {
    if (this.props.duration === null || isNaN(this.props.duration)) {
      return '';
    }

    if (!this.props.hasLeft) {
      const minutes = Math.floor(this.props.duration / 60);
      if (minutes > 0) {
        return `${minutes} minutes`;
      }

      const seconds = this.props.duration & 60;
      return `${seconds} seconds`;
    }

    return this.formatArrivalTime(addTime(this.props.duration, this.props.lastUpdated).format('YYYY-MM-DD HH:mm'));
  };

  getLastUpdatedStatus = () => {
    if (this.props.isRefreshing && this.props.isMe) {
      return 'updating...';
    }

    if (!this.props.lastUpdated && this.props.isMe) {
      return 'invalid';
    }

    return fromNow(this.props.lastUpdated);
  };

  handleClickTravelMode = () => this.setState({isTravelModeOpen: true});

  handleCloseTravelMode = () => this.setState({isTravelModeOpen: false});

  handleChangeTravelMode = async (e) => {
    this.handleCloseTravelMode();

    this.props.changeTravelMode(this.props.eventId, e);
    this.props.refreshEvent();
  };

  render() {
    return (
      <AttendeesListItem
        {...this.props}
        {...this.state}
        isIconClickable={this.getIsIconClickable()}
        hasProbablyArrived={this.getHasProbablyArrived()}
        durationStatus={this.getDurationStatus()}
        lastUpdatedStatus={this.getLastUpdatedStatus()}
        onClickTravelMode={this.handleClickTravelMode}
        onCloseTravelMode={this.handleCloseTravelMode}
        onChangeTravelMode={this.handleChangeTravelMode}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  isMe: selectUserName(state) === ownProps.userName,
  isRefreshing: selectIsRefreshing(state),
  eventId: selectEventId(state)
});

const mapDispatchToProps = {
  changeTravelMode,
  refreshEvent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttendeesListItemContainer);