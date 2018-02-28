/* eslint-disable */
import fetch from 'isomorphic-fetch';
import * as types from '../types/types';
import { Actions } from 'react-redux-grid';
import Promise from 'bluebird';
import Api from '../../components/examples/bulk-selection/Api';

const dataSource = Api;

export const setPageUpdateStart = () => {
  return {
    type: types.BULK_PAGE_UPDATE_START
  };
};

export const setPageUpdateComplete = () => {
  return {
    type: types.BULK_PAGE_UPDATE_COMPLETE
  };
};

export const bulkDisplay = newData => {
  return {
    type: types.BULK_DISPLAY,
    recordsRemaining: newData.removed,
    recordsRemoved: newData.remaining
  };
};

export const changePageLimit = newPageLimit => {
  return {
    type: types.PAGING_CHANGE_LIMIT,
    newPageLimit
  };
};

export const fetchCurrentPageRequest = () => {
  return {
    type: types.BULK_CURRENT_PAGE_REQUEST
  };
};

export const fetchCurrentPageReceivedSuccess = () => {
  return {
    type: types.BULK_CURRENT_PAGE_RECEIVED_SUCCESS
  };
};

export const fetchCurrentPageReceivedFail = () => {
  return {
    type: types.BULK_CURRENT_PAGE_RECEIVED_FAIL
  };
};

export const fetchCurrentPage = () => {
  return (dispatch, getState) => {
    dispatch(fetchCurrentPageRequest());

    return Promise.all([
      dispatch(
        Actions.GridActions.getAsyncData({
          dataSource,
          stateKey: 'bulk',
          extraParams: {
            pageIndex: getState().bulkSelection.currentPageIndex,
            pageSize: getState().bulkSelection.pageSize
          }
        })
      )

      // no change so probably not necessary to set again
    ]).then(response => {
      dispatch(fetchCurrentPageReceivedSuccess());
    });
  };
};

export const resetSelection = () => {
  return {
    type: '@@react-redux-grid/SET_SELECTION',
    clearSelections: true,
    stateKey: 'bulk'
  };
};
