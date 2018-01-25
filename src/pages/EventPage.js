import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import moment from 'moment';
import {fetchEvent, loginEvent, fetchMyETA, getAttendees} from '../event/eventActions';
import {selectPlaceId, selectEventTime, selectIsLoggedIn} from '../event/eventSelectors';
import EventLoginForm from '../event/LoginForm/EventLoginForm';
import AttendeesListContainer from '../event/AttendeesList/AttendeesListContainer';
import NavBar from '../navigation/NavBar/NavBar';

class EventPage extends Component {
  static propTypes = {
    eventId: PropTypes.string.isRequired,
    fetchEvent: PropTypes.func.isRequired,
    loginEvent: PropTypes.func.isRequired,
    placeId: PropTypes.string,
    eventTime: PropTypes.string,
    isLoggedIn: PropTypes.bool
  };

  static defaultProps = {
    placeId: null,
    eventTime: null,
    isLoggedIn: false
  };

  async componentDidMount() {
    try {
      await this.props.fetchEvent(this.props.eventId);
    } catch(error) {
      this.props.history.replace('/404');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.placeId !== nextProps.placeId) {
      this.props.fetchMyETA(nextProps.placeId);
    }
  }

  getEventDate = () => moment(this.props.eventTime).format('dddd, MMMM DDDo');

  getEventTime = () => moment(this.props.eventTime).format('[at] h:mm a');

  handleSubmitLoginForm = (e) =>
    e.preventDefault() || (
      !!this.login.value && this.props.loginEvent(this.login.value)
    );

  handleRefLoginForm = ref => this.login = ref;

  handleRefresh = async () => {
    try {
      await this.props.fetchMyETA(this.props.placeId);
      this.props.getAttendees();
    } catch(error) {
      console.warn('Refresh failed');
    }
  };

  render() {
    return (
      <div className="EventPage">
        <button onClick={this.handleRefresh}>Refresh</button>
        <h3>
          {this.getEventDate()}
        </h3>
        <h3>
          {this.getEventTime()}
        </h3>
        {!this.props.isLoggedIn &&
          <EventLoginForm
            onSubmit={this.handleSubmitLoginForm}
            onRef={this.handleRefLoginForm}
          />
        }
        {this.props.isLoggedIn && <AttendeesListContainer/>}
        <NavBar/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  placeId: selectPlaceId(state),
  eventTime: selectEventTime(state),
  isLoggedIn: selectIsLoggedIn(state)
});

const mapDispatchToProps = {
  fetchEvent,
  loginEvent,
  fetchMyETA,
  getAttendees
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventPage);
