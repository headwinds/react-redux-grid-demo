/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import BulkSelection from './BulkSelection';
import BulkSelectionAddDelete from './BulkSelectionAddDelete';
import BulkSelectionWriteup from './BulkSelectionWriteup';
import { columns, events, plugins } from '../data/demodata';

class BulkSelectionExample extends Component {
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
        <BulkSelection props={this.props} />
        <BulkSelectionAddDelete props={this.props} />
        <BulkSelectionWriteup />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
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
  BulkSelectionExample
);
