import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import stateListGroupTypes from './StateListGroup/Types';
import { get } from 'dot-prop-immutable';
const propTypes = {
  type: PropTypes.string,
  items: PropTypes.array
};
class StateList extends Component {
  components = stateListGroupTypes
  render() {
    let { rootKeys, items, rootKeyToComponent } = this.props;
    // rootKeys = rootKeys.sort();
    let rootBlocks = rootKeys.map((key) => {
      if (!key) {
        console.warn("Received an empty key...");
        return;
      }

      const rootData = this.props[key];
      const rootComponentKey = rootKeyToComponent[key];
      
      if (rootComponentKey) {
        const StateListGroupTag = this.components[rootComponentKey];
        return (<StateListGroupTag key={key} rootKey={key} data={rootData} />);
      } else {
        console.warn(`No component could be found for rootKey ${key}`)
        return (<StateListGroup key={key} rootKey={key} data={rootData} />);
      }
      
    });
    return (<div>{rootBlocks}</div>);
  }
}

function mapStateToProps(state,ownProps) {
  const { items, type } = ownProps;
  let props = {
    rootKeys: [],
    rootKeyToComponent: {}
  };
  items.forEach((rootItem) => {
    try {
      // console.warn("rootItem:",rootItem);
      const rootItemKey = rootItem[0];
      const rootItemChildren = rootItem[1];
      const rootItemComponent = rootItem[2];
      props.rootKeys.push(rootItemKey);
      props[rootItemKey] = {
        keys: [],
        childKeyToComponent: {}
      };
      props.rootKeyToComponent[rootItemKey] = rootItemComponent;

      rootItemChildren.forEach((itemChild) => {
        let itemChildKey = itemChild[0];
        let itemChildStatePath = itemChild[1].join(".");
        let itemChildComponent = itemChild[2];
        let itemChildState;
          itemChildState = get(state,itemChildStatePath, null);
          // console.log("rootItemKey",rootItemKey);
          // console.log("itemChildKey",itemChildKey);
          // if (itemChildKey === "EON Uptime") {
          //   console.log("uptime:", itemChildState);
          // }
          props[rootItemKey].childKeyToComponent[itemChildKey] = itemChildComponent;
          props[rootItemKey][itemChildKey] = itemChildState;
          props[rootItemKey]['keys'].push(itemChildKey);
      }); 
    } catch (e) {
      console.warn(`Error mapping keys to props...`,e);
    }
  });
  return props;
}

export default connect(
  mapStateToProps
)(StateList);