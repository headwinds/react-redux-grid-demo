/* eslint-disable */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import faker from 'faker';
import getBulkSelectionSelectedRows from './getBulkSelectionSelectedRows';
import { addRecord, bulkDeleteRows, postFakeUsers, getUsers } from './Api';
import {
  fetchCurrentPage,
  resetSelection
} from '../../../redux/actions/bulkSelectionActions';
import firebaseIcon from './firebase.svg';

const purple = '#644581';
const red = 'firebrick';
const maxRowsTotal = 5000;
const minRowsTotal = 500;

const labelStyle = { fontFamily: 'Open Sans' };

class BulkSelectionAddDelete extends Component {
  constructor(props) {
    super(props);

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleBulkActionClick = this.handleBulkActionClick.bind(this);
    this.getCurrentTotalRows = this.getCurrentTotalRows.bind(this);
    this.getCurrentPage = this.getCurrentPage.bind(this);

    this.state = {
      name: `${faker.name.findName()}`,
      phone: `${faker.phone.phoneNumber()}`,
      email: `${faker.internet.email()}`,
      address: `${faker.address.streetAddress()} ${faker.address.streetName()}`,
      serverAddFeedbackMessage: '',
      serverAddFeedbackMessageStyle: { color: purple },
      serverBulkDeleteFeedbackMessage: '',
      serverBulkDeleteFeedbackMessageStyle: { color: purple },
      currentRowsTotal: 0
    };

    console.log('BulkSelectionTutorial constructor: ', props);
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.props = nextProps;
  }

  componentDidMount() {
    //
    // this creates your database and populates it with a 1000 fake users
    //postFakeUsers();

    this.getCurrentTotalRows();
  }

  componentDidUpdate() {
    console.log('BulkSelection componentDidUpdate this.props: ', this.props);
  }

  getCurrentPage() {
    this.props.fetchCurrentPage();
    this.props.resetSelection();
  }

  getCurrentTotalRows() {
    // this is not an optimal approach - I need to learn how to use cloud functions to maintain a count
    // https://stackoverflow.com/questions/15148803/in-firebase-is-there-a-way-to-get-the-number-of-children-of-a-node-without-load
    getUsers(true).then(
      snapshot => {
        const currentRowsTotal = Object.keys(snapshot.val()).length;
        this.setState({ currentRowsTotal });
      },
      error => {}
    );
  }

  handleBulkActionClick(e) {
    e.preventDefault();

    const selection = this.props.selection.get('bulk');
    if (typeof selection === 'undefined') return;

    const selectionData = selection.toJS();
    const selectedIds = [];
    for (var key in selectionData) {
      if (selectionData[key]) {
        const selectedId = key.split('row-')[1];
        if ('NaN' !== String(Number(selectedId)))
          selectedIds.push(Number(selectedId));
      }
    }

    if (selectedIds.length === 0) {
      return this.setState({
        serverBulkDeleteFeedbackMessage: 'No rows selected',
        serverBulkDeleteFeedbackMessageStyle: { color: 'firebrick' }
      });
    }

    console.log('handleBulkActionClick selectedIds: ', selectedIds);

    const serverKeys = [];
    _.each(this.props.bulkSelection.data, (serverData, index) => {
      _.each(selectedIds, selectId => {
        if (selectId === index) {
          serverKeys.push(serverData.Id);
        }
      });
    });

    console.log('handleBulkActionClick serverKeys: ', serverKeys);

    /*
    const list = this.props.gridData.get('data');

    console.warn('handleBulkActionClick selectedIds :', selectedIds);

    const remaining = list.toJSON().filter(obj => {
      return selectedIds.indexOf(obj._id) > -1;
    });
    const removed = list.toJSON().filter(obj => {
      return selectedIds.indexOf(obj._id) === -1;
    });

    this.props.bulkDisplay({ removed, remaining });
    */

    bulkDeleteRows(serverKeys).then(
      snapshots => {
        // an array of snapshot responses for each row removed
        const record = serverKeys.length > 1 ? 'record' : 'records';
        this.setState({
          serverBulkDeleteFeedbackMessage: 'Success, ' + record + ' removed',
          serverBulkDeleteFeedbackMessageStyle: { color: purple }
        });

        this.getCurrentTotalRows();
        this.getCurrentPage(); // reset selection ids!
      },
      error => {
        this.setState({
          serverBulkDeleteFeedbackMessage: 'Error removing ' + record,
          serverBulkDeleteFeedbackMessageStyle: { color: red }
        });
      }
    );
  }

  handleAddClick() {
    const record = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address
    };
    console.log('handleAddClick record: ', record);

    if (this.state.currentRowsTotal > 5000) {
      return this.setState({
        serverAddFeedbackMessage:
          'Record Limit reached - please delete some records to add new ones',
        serverAddFeedbackMessageStyle: { color: red }
      });
    }

    addRecord(record).then(
      response => {
        this.setState({
          serverAddFeedbackMessage: 'Record added successfully',
          serverAddFeedbackMessageStyle: { color: purple },
          name: `${faker.name.findName()}`,
          phone: `${faker.phone.phoneNumber()}`,
          email: `${faker.internet.email()}`,
          address: `${faker.address.streetAddress()} ${faker.address.streetName()}`
        });
        this.getCurrentTotalRows();
      },
      error => {
        this.setState({
          serverAddFeedbackMessage: 'Error adding Record',
          serverAddFeedbackMessageStyle: { color: red }
        });
      }
    );
  }

  render() {
    const rowStyle = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5
    };
    const inputStyle = {
      width: 250
    };

    return (
      <div
        style={{ display: 'block', backgroundColor: '#f6f6f6', padding: 10 }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            height: 'auto',
            margin: 0
          }}
        >
          <form style={{ width: 350 }}>
            <div style={rowStyle}>
              <label style={labelStyle}>name</label>
              <input
                style={inputStyle}
                value={this.state.name}
                readOnly={true}
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>phone</label>
              <input
                style={inputStyle}
                value={this.state.phone}
                readOnly={true}
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>email</label>
              <input
                style={inputStyle}
                value={this.state.email}
                readOnly={true}
              />
            </div>
            <div style={rowStyle}>
              <label style={labelStyle}>address</label>
              <input
                style={inputStyle}
                value={this.state.address}
                readOnly={true}
              />
            </div>

            <div style={{ margin: 10, marginLeft: 90 }}>
              <button
                className="react-redux-grid-active"
                onClick={this.handleAddClick}
              >
                Add Record
              </button>
              <div>
                <span style={this.state.serverAddFeedbackMessageStyle}>
                  {' '}
                  {this.state.serverAddFeedbackMessage}
                </span>
              </div>
            </div>
          </form>
          <div style={{ marginLeft: 10 }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                height: 'auto',
                margin: 0
              }}
            >
              <div>
                <img src={firebaseIcon} width="60" />
              </div>
              <div style={{ width: 500, padding: 10 }}>
                <p style={{ fontFamily: 'Open Sans' }}>
                  This firebase database currently has a total of{' '}
                  {this.state.currentRowsTotal} records with a max limit of{' '}
                  {maxRowsTotal} and a min limit of {minRowsTotal}. In this
                  example, I want to show the ids so that you can see that
                  Firebase id are generated as a unique id based on a timestamp.
                  The saved id is not the same as the visible row index.
                </p>
              </div>
            </div>
            <div style={{ float: 'right' }}>
              <button
                className="react-redux-grid-active"
                style={{ backgroundColor: 'firebrick' }}
                onClick={this.handleBulkActionClick}
              >
                Bulk Delete {getBulkSelectionSelectedRows(this.props)} Rows
              </button>
              <div>
                <span style={this.state.serverBulkDeleteFeedbackMessageStyle}>
                  {' '}
                  {this.state.serverBulkDeleteFeedbackMessage}
                </span>
              </div>
            </div>
          </div>
        </div>
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

const mapDispatchToProps = dispatch =>
  bindActionCreators({ fetchCurrentPage, resetSelection }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(
  BulkSelectionAddDelete
);
