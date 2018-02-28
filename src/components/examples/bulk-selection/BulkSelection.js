/* eslint-disable */
import React, { Component } from 'react';
import { Grid, Actions } from 'react-redux-grid';
import { connect } from 'react-redux';
import BulkPager from './BulkPager';
import store from '../../../redux/configureStore';
import Api from './Api';

import { bulkSelectionColumns, events, plugins } from '../data/demodata';

class BulkSelection extends Component {
  constructor(props) {
    super(props);

    console.log('BulkSelection constructor: ', props);

    this.state = {
      users: [],
      update: false
    };

    this.update = this.update.bind(this);
  }

  componentWillReceiveProps(nextProps, nextState) {
    console.log(
      'BulkSelection componentWillReceiveProps nextProps: ',
      nextProps
    );

    this.props = nextProps;
  }

  componentDidMount() {}

  componentDidUpdate(nextProps) {
    console.log('BulkSelection componentDidUpdate nextProps: ', nextProps);
  }

  componentWillReceiveProps(nextProps) {
    console.log(
      'BulkSelection componentWillReceiveProps nextProps: ',
      nextProps
    );
  }

  shouldComponentUpdate() {
    console.log('BulkSelection shouldComponentUpdate ');
    return true;
  }

  update() {}

  render() {
    console.log('BulkSelection render this.state: ', this.state);
    const dataSource = Api;
    const config = {
      columns: bulkSelectionColumns,
      dataSource,
      pageSize: this.props.bulkSelection.pageSize,
      plugins: {
        ...plugins,
        STICKY_HEADER: {
          enabled: true
        },
        STICKY_FOOTER: {
          enabled: true
        },
        FILTER_CONTAINER: {
          enabled: true
        },
        PAGER: {
          enabled: true,
          pagingType: 'remote',
          pagerComponent: <BulkPager api={Api} store={store} />
        },
        BULK_ACTIONS: {
          enabled: true,
          actions: [
            {
              text: 'Move',
              EVENT_HANDLER: () => {}
            },
            {
              text: 'Add',
              EVENT_HANDLER: () => {}
            }
          ]
        },
        GRID_ACTIONS: {
          iconCls: 'action-icon',
          menu: [
            {
              text: 'Delete',
              EVENT_HANDLER: ({ metaData }) => {
                const rowIndex = metaData.rowIndex;

                store.dispatch(
                  Actions.EditorActions.removeRow({
                    stateKey,
                    rowIndex
                  })
                );
              }
            }
          ]
        }
      },
      height: '',
      events,
      store,
      stateKey: 'bulk'
    };

    return <Grid {...config} />;
  }
}

const mapStateToProps = (state, ownProps) => ({
  grid: state.grid,
  bulkSelection: state.bulkSelection,
  app: state.app,
  selection: state.selection
});

const mapDispatchToProps = dispatch => {
  return {
    dispatch
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BulkSelection);
