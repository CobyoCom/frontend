import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {WALKING, DRIVING, TRANSIT, DEFAULT_TRAVEL_MODE} from '../../../helpers/globalConstants';
import TravelModeSelectModal from '../../TravelModeSelect/TravelModeSelectModal';
import AttendeesListItemIcon from './AttendeesListItemIcon';
import AttendeesListItemLoading from './AttendeesListItemLoading';
import './AttendeesListItem.css';

const AttendeesListItem = props => (
  <Fragment>
    <div
      className="AttendeesListItem"
      onClick={props.onClick}
    >
      <AttendeesListItemIcon
        travelMode={props.travelMode}
        isClickable={props.isMe && !props.hasProbablyArrived}
        onClick={props.onClickTravelMode}
      />
      <div className="AttendeesListItem-content">
        <div className="AttendeesListItem-user">
          <h2 className="AttendeesListItem-name">{props.userName}</h2>
          {props.isRefreshing ? (
            <AttendeesListItemLoading travelMode={props.travelMode}/>
          ) : (
            <span className="AttendeesListItem-lut">{props.lastUpdatedStatus}</span>
          )}
        </div>
      </div>
      <div className="AttendeesListItem-eta">{props.durationStatus}</div>
    </div>
    {props.isMe && <TravelModeSelectModal
      isOpen={props.isTravelModeOpen}
      onClose={props.onCloseTravelMode}
      onChange={props.onChangeTravelMode}
      travelModeValue={props.travelMode}
    />}
  </Fragment>
);

export const AttendeePropTypes = {
  userName: PropTypes.string,
  duration: PropTypes.number,
  lastUpdated: PropTypes.number,
  travelMode: PropTypes.oneOf([WALKING, DRIVING, TRANSIT]),
  hasLeft: PropTypes.bool
};

export const AttendeeDefaultProps = {
  id: null,
  userName: '',
  duration: null,
  lastUpdated: null,
  travelMode: DEFAULT_TRAVEL_MODE,
  hasLeft: false
};

AttendeesListItem.propTypes = {
  ...AttendeePropTypes,
  isMe: PropTypes.bool.isRequired,
  isRefreshing: PropTypes.bool.isRequired,
  isTravelModeOpen: PropTypes.bool.isRequired,
  hasProbablyArrived: PropTypes.bool.isRequired,
  durationStatus: PropTypes.string.isRequired,
  lastUpdatedStatus: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onClickTravelMode: PropTypes.func.isRequired,
  onCloseTravelMode: PropTypes.func.isRequired,
  onChangeTravelMode: PropTypes.func.isRequired
};

AttendeesListItem.defaultProps = {
  ...AttendeeDefaultProps
};

export default AttendeesListItem;