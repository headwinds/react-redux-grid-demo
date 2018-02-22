/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import faker from 'faker';
import getBulkSelectionSelectedRows from './getBulkSelectionSelectedRows';
import { addRecord, bulkDeleteRows, postFakeUsers } from './Api';

const purple = '#644581';

class BulkSelectionAddDelete extends Component {
  constructor(props) {
    super(props);

    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleBulkActionClick = this.handleBulkActionClick.bind(this);

    this.state = {
      name: `${faker.name.findName()}`,
      phone: `${faker.phone.phoneNumber()}`,
      email: `${faker.internet.email()}`,
      address: `${faker.address.streetAddress()} ${faker.address.streetName()}`,
      serverAddFeedbackMessage: '',
      serverAddFeedbackMessageStyle: { color: purple },
      serverBulkDeleteFeedbackMessage: '',
      serverBulkDeleteFeedbackMessageStyle: { color: purple }
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
  }

  componentDidUpdate() {
    console.log('BulkSelection componentDidUpdate this.props: ', this.props);
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

    console.log('handleBulkActionClick selectedIds: ', selectedIds);

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

    /*
    bulkDeleteRows(selectedIds).then(
      response => {
        this.setState({
          serverBulkDeleteFeedbackMessage: 'Record added successfully',
          serverBulkDeleteFeedbackMessageStyle: { color: purple }
        });
      },
      error => {
        this.setState({
          serverBulkDeleteFeedbackMessage: 'Error adding Record',
          serverBulkDeleteFeedbackMessageStyle: { color: 'red' }
        });
      }
    );
    */
  }

  handleAddClick() {
    const record = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      address: this.state.address
    };
    console.log('handleAddClick record: ', record);

    addRecord().then(
      response => {
        this.setState({
          serverAddFeedbackMessage: 'Record added successfully',
          serverAddFeedbackMessageStyle: { color: purple }
        });
      },
      error => {
        this.setState({
          serverAddFeedbackMessage: 'Error adding Record',
          serverAddFeedbackMessageStyle: { color: 'red' }
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
              <label>name</label>
              <input
                style={inputStyle}
                value={this.state.name}
                readOnly={true}
              />
            </div>
            <div style={rowStyle}>
              <label>phone</label>
              <input
                style={inputStyle}
                value={this.state.phone}
                readOnly={true}
              />
            </div>
            <div style={rowStyle}>
              <label>email</label>
              <input
                style={inputStyle}
                value={this.state.email}
                readOnly={true}
              />
            </div>
            <div style={rowStyle}>
              <label>address</label>
              <input
                style={inputStyle}
                value={this.state.address}
                readOnly={true}
              />
            </div>
          </form>
          <div style={{ marginLeft: 10 }}>
            {getBulkSelectionSelectedRows(this.props)}

            <button
              className="react-redux-grid-active"
              style={{ backgroundColor: 'firebrick' }}
              onClick={this.handleBulkActionClick}
            >
              Bulk Delete Rows
            </button>
            <div>
              <span style={this.state.serverBulkDeleteFeedbackMessageStyle}>
                {' '}
                {this.state.serverBulkDeleteFeedbackMessage}
              </span>
            </div>
          </div>
        </div>
        <div style={{ margin: 10, marginLeft: 120 }}>
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
  BulkSelectionAddDelete
);
