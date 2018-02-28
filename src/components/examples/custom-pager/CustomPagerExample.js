/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomPager from './CustomPager';
import CustomPagerWriteup from './CustomPagerWriteup';
import store from '../../../redux/configureStore';

import { columns, events, plugins } from '../data/demodata';

class CustomPagerExample extends Component {
  constructor(props) {
    super(props);

    console.log('BulkSelectionTutorial constructor: ', props);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.props = nextProps;
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log('BulkSelection componentDidUpdate this.props: ', this.props);
  }

  render() {
    return (
      <div>
        <CustomPager props={this.props} store={store} />
        <CustomPagerWriteup />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  faker: state.faker,
  grid: state.grid,
  app: state.app,
  selection: state.selection
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomPagerExample);
