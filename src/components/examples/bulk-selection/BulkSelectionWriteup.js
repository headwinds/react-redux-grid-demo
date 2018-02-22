/* eslint-disable */
import React from 'react';

const olStyle = {
  padding: 5,
  margin: 0,
  color: '#666',
  fontFamily: 'Open Sans'
};

const BulkSelectionWriteup = ({}) => (
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
        Big Data is a common term when discussing modern web applications.
        Today, an app may need store millions of records dealing with a wide
        variety of data from registered users, financial transactions or social
        interests.
      </p>
      <p className="tutorial">
        The BulkSelection example attempts to show how to manage large data sets
        by offering the ability to page through the data. It is connected to a
        realtime{' '}
        <a href="https://console.firebase.google.com" target="_blank">
          {' '}
          Firebase
        </a>{' '}
        database which is arguably one of the easiest database to learn as
        Javascript developer.
      </p>
      <p className="tutorial">
        Instead of looking at tables, in Firebase, the database looks more like
        javascript objects. In order to update a list, you simply push another
        object similar to how you would update an array.
      </p>
      <p className="tutorial">
        If you are familiar with SQL databases, you may wonder how to do the
        same things like paginate with Firebase, a NoSQL database. My google-fu
        brought up this nice article{' '}
        <a
          href="https://howtofirebase.com/firebase-data-structures-pagination-96c16ffdb5ca"
          target="_blank"
        >
          Firebase Data Structures: Pagination
        </a>{' '}
        and{' '}
        <a
          href="https://medium.com/@wcandillon/firebase-live-pagination-474748853e52"
          target="_blank"
        >
          Firebase Live Pagination
        </a>
        . They outlines all the necessary steps, and I went with the later
        article for this tutorial for relative simplicity.
      </p>
    </div>
    <div style={{ borderLeft: '1px dotted #ccc', padding: 10 }}>
      <h2 className="gridH2">Steps</h2>
      <ul style={{ margin: 0, padding: 0 }}>
        <ol style={olStyle}>
          Sign up for{' '}
          <a href="https://console.firebase.google.com" target="_blank">
            {' '}
            Firebase
          </a>{' '}
          and create a database with public authentication settings so the users
          do not need to login.
        </ol>
        <ol style={olStyle}>
          Start this react app but ensure you have install firebase 4.8.0 and
          not{' '}
          <a href="https://github.com/angular/angularfire2/issues/1385">
            any higher versions
          </a>{' '}
          as they may not resolve properly.
        </ol>
        <ol style={olStyle}>Review BulkSelection where the grid is setup</ol>
        <ol style={olStyle}>Review BulkPager which handles the pagination</ol>
        <ol style={olStyle}>
          Review BulkSelectionAddDelete and watch what happens when you add a
          record vs bulk deleting records
        </ol>
      </ul>
    </div>
  </div>
);

export default BulkSelectionWriteup;
