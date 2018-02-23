/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-redux-grid';
import * as BulkSelectionActions from '../../../redux/actions/bulkSelectionActions';
import * as _ from 'lodash';

import {
  columns,
  data,
  pageSize,
  events,
  dataSource,
  pagingDataSource
} from './../data/demodata';

class BulkPager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPageLimit: pageSize
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleNumberedPageButtonClick = this.handleNumberedPageButtonClick.bind(
      this
    );
  }

  getSelectedIds() {
    const bulkMap = this.props.selection.get('bulk');
    const selectedIds = bulkMap.get('indexes');

    if (undefined !== selectedIds) {
      return selectedIds;
    } else {
      // you could dispatch a notification...
      // this.props.displayWarningRequestMessage("No rows selected");
      console.warn('BulkPage selectedIds were false! no rows selected');
      console.log(bulkMap.toJSON());
      return [];
    }
  }

  handleSelectChange(e) {
    console.log('BulkPager handleSelectChange');
    e.preventDefault();
    const newPageLimit = Number(e.target.value);

    const currIndex =
      this.props.currentPager && this.props.currentPager.get !== undefined
        ? this.props.currentPager.get('pageIndex')
        : 0;

    this.setState({
      currentPageLimit: newPageLimit
    });

    Promise.all([
      this.props.getAsyncData({
        dataSource: this.props.api,
        stateKey: 'bulk',
        extraParams: {
          pageIndex: currIndex,
          pageSize: newPageLimit
        }
      }),
      this.props.changePageLimit(newPageLimit)
    ]);
  }

  handleNumberedPageButtonClick(e) {
    const newPageIndex = parseInt(e.target.innerHTML) - 1;

    this.props.getAsyncData({
      dataSource: this.props.api,
      stateKey: 'bulk',
      extraParams: {
        pageIndex: newPageIndex,
        pageSize: this.state.currentPageLimit
      }
    });

    Promise.all([
      this.props.getAsyncData({
        dataSource: this.props.api,
        stateKey: 'bulk',
        extraParams: {
          pageIndex: newPageIndex,
          pageSize: this.state.currentPageLimit
        }
      }),

      this.props.setPageIndexAsync({
        pageIndex: newPageIndex,
        pageSize: this.state.currentPageLimit,
        dataSource: this.props.api,
        stateKey: 'bulk'
      })
    ]);
  }

  render() {
    // how do I get this from firebase? total rows
    //const total = this.props.gridData ? this.props.gridData.total : 0;
    const total = 100;

    const currIndex =
      this.props.currentPager && this.props.currentPager.get !== undefined
        ? this.props.currentPager.get('pageIndex')
        : 0;

    const totalButtons = total / this.props.bulkSelection.pageSize;
    const buttons = [];

    _.times(totalButtons, i => {
      buttons.push(
        <button
          children={i + 1}
          onClick={this.handleNumberedPageButtonClick}
          key={'btn' + i}
          className={
            i === currIndex
              ? 'react-redux-grid-active'
              : 'react-redux-grid-inactive'
          }
        />
      );
    });

    const totalRowsSelected =
      undefined !== this.props.selection.get('bulk') &&
      undefined !== this.props.selection.get('bulk').get('indexes')
        ? this.props.selection.get('bulk').get('indexes').length
        : 0;

    return (
      <div style={{ textAlign: 'right' }}>
        Rows per Page:&nbsp;&nbsp;
        <select onChange={this.handleSelectChange}>
          <option key="0" value="10">
            10
          </option>
          <option key="1" value="20">
            20
          </option>
          <option key="2" value="50">
            50
          </option>
          <option key="3" value="100">
            100
          </option>
        </select>
        {buttons}
      </div>
    );
  }
}

const { string, object } = PropTypes;

BulkPager.propTypes = {
  pagingDataSource: string,
  store: object.isRequired
};

BulkPager.defaultProps = {};

const mapStateToProps = (state, ownProps) => ({
  grid: state.grid,
  selection: state.selection,
  currentPager: state.pager.get('bulk'),
  gridData: state.dataSource.get('bulk'),
  bulkSelection: state.bulkSelection
});

const mapDispatchToProps = dispatch => {
  return {
    getAsyncData: config => {
      dispatch(Actions.GridActions.getAsyncData(config));
    },
    setPageIndexAsync: config => {
      dispatch(Actions.PagerActions.setPageIndexAsync(config));
    },
    bulkDisplay: newData => {
      dispatch(BulkSelectionActions.bulkDisplay(newData));
    },
    changePageLimit: newPageLimit => {
      dispatch(BulkSelectionActions.changePageLimit(newPageLimit));
    },
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkPager);
