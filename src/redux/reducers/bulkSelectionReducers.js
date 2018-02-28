/* eslint-disable */
import * as types from '../types/types';
import * as firebase from 'firebase';
import FirebasePaginator from '../../components/examples/bulk-selection/FirebasePaginator';
import { config } from '../../components/examples/bulk-selection/firebaseConfig';

// import {SET_DATA} from "react-redux-grid/src/constants/ActionTypes"; how can I get the types?!
const pageSize = 10;
// on bulk delete need to reset this!
const options = {
  pageSize,
  finite: true,
  retainLastPage: false,
  isBrowser: false
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const db = firebase.database();
const ref = db.ref('users');
const paginator = new FirebasePaginator(ref, options);

console.log('paginator: ', paginator);

const initialState = {
  ready: false,
  pageSize,
  pageIndex: 1,
  data: [],
  recordsRemaining: [],
  recordsRemoved: [],
  currentPageIndex: 1,
  bulkUpdateComplete: false,
  paginator
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.APP_READY:
      return {
        ...state,
        ready: true
      };
    case types.PAGING_CHANGE_LIMIT:
      return {
        ...state,
        pageSize: action.newPageLimit
      };
    case types.GRID_ROWS_BULK_DELETE:
      return {
        ...state,
        data: action.newRows
      };
    case types.BULK_PAGE_UPDATE_START:
      return {
        ...state,
        bulkUpdateComplete: false
      };
    case types.BULK_PAGE_UPDATE_COMPLETE:
      return {
        ...state,
        bulkUpdateComplete: true
      };
    case types.BULK_DISPLAY:
      return {
        ...state,
        recordsRemaining: action.recordsRemaining,
        recordsRemoved: action.recordsRemoved
      };
    case '@@react-redux-grid/SET_DATA':
      return {
        ...state,
        data: action.currentRecords,
        recordsRemaining: [],
        recordsRemoved: []
      };
    default:
      return state;
  }
}
