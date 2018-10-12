import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { capitalize } from 'inflection';
const propTypes = {
  value: PropTypes.any,
  label: PropTypes.label
};

class StateListItem extends Component {
  render() {
    const { label, icon, value } = this.props;
    return (<ListGroupItem className={"card-list-group-item"}>
      <span className={"state-item"}>
        <span className={"state-label"}>
          <i className={classnames({stateIcon: true})}></i> 
          {capitalize(label)}
        </span>
        {value &&
        <span className={"state-value"}>
          {value}
        </span>}
      </span>
    </ListGroupItem>);
  }
}

export default StateListItem;