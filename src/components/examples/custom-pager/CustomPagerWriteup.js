/* eslint-disable */
import React from 'react';

const olStyle = {
  padding: 5,
  margin: 0,
  color: '#666',
  fontFamily: 'Open Sans'
};

const CustomPagerWriteup = ({}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      margin: 10
    }}
  >
    <div style={{ padding: 10 }}>
      <h2 className="gridH2">Tutorial</h2>
      <p className="tutorial">
        Pagination is an important part of dealing with big data. We do not want
        to download the entire database but page through the data by loading a
        certain of records at a time. In this case, we are loading 10 records
        per page.
      </p>
      <p className="tutorial">
        The data is stored on the{' '}
        <a href="https://www.heroku.com/" target="_blank">
          heroku
        </a>{' '}
        server.
      </p>
    </div>
    <div style={{ borderLeft: '1px dotted #ccc', padding: 10 }}>
      <h2 className="gridH2">Steps</h2>
      <ul style={{ margin: 0, padding: 0 }}>
        <ol style={olStyle}>Review CustomPager to see how the grid is setup</ol>
        <ol style={olStyle}>Review Pager to see how each page is loaded</ol>
      </ul>
    </div>
  </div>
);

export default CustomPagerWriteup;
