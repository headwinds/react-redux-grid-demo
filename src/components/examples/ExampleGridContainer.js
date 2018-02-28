/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import './ExampleGridContainer.css';
import { connect } from 'react-redux';
import store from './../../redux/configureStore';
import Simple from './Simple';
import Complex from './complex/Complex';
import Sticky from './Sticky';
import Stress from './Stress';
import ColRenderer from './ColRenderer';
import Tree from './Tree';
import Bootstrap from './bootstrap/Bootstrap';
import Editable from './Editable';
import CustomPagerExample from './custom-pager/CustomPagerExample';
import ErrorMessage from './ErrorMessage';
import BulkSelectionExample from './bulk-selection/BulkSelectionExample';
import * as _ from 'lodash';
import CustomLoader from './custom-loader/CustomLoader';

class ExampleGridContainer extends Component {
  componentWillReceiveProps(nextProps, nextState) {
    this.props = nextProps;
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const title = this.props.app.featureTitle;

    const getGrid = title => {
      switch (title) {
        case 'BulkSelection':
          return <BulkSelectionExample {...{ store }} />;
        case 'Bootstrap':
          return <Bootstrap {...{ store }} />;
        case 'ColRenderer':
          return <ColRenderer {...{ store }} />;
        case 'Tree':
          return <Tree {...{ store }} />;
        case 'Stress':
          return <Stress {...{ store }} />;
        case 'Sticky':
          return <Sticky {...{ store }} />;
        case 'Editable':
          return <Editable {...{ store }} />;
        case 'Complex':
          return <Complex {...{ store }} />;
        case 'CustomPager':
          return <CustomPagerExample {...{ store }} />;
        case 'CustomLoader':
          return <CustomLoader {...{ store }} />;
        case 'ErrorMessage':
          return <ErrorMessage {...{ store }} />;
        case 'Simple':
        default:
          return <Simple {...{ store }} />;
      }
    };

    return (
      <div className="simpleContainer">
        <h2 className="gridH2">{this.props.app.featureTitle}</h2>
        {getGrid(title)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  faker: state.faker,
  grid: state.grid,
  app: state.app,
  bulkSelection: state.bulkSelection,
  selection: state.selection
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  ExampleGridContainer
);
