/* eslint-disable */
//import * as FirebaseConnection from './';
import * as _ from 'lodash';
import axios from 'axios';
import Promise from 'bluebird';
import * as firebase from 'firebase';
import { config } from './firebaseConfig';
import faker from 'faker';
import store from '../../../redux/configureStore';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export const addRecord = user => {
  /*
  easiest way to add a record but I want to store the key as an id too
  this make is easier for to remove the records later
    //return db.ref('/users').push(user);
  */

  const ref = db.ref('/users').push();
  return ref.set({ ...user, key: ref.key });
};

export const bulkDeleteRows = keys => {
  console.log('bulkDeleteRows: ', keys);
  const allDeletePromises = [];
  const usersRef = getUsersRef();

  _.each(keys, key => {
    const promise = usersRef.child(key).remove();
    allDeletePromises.push(promise);
  });

  return Promise.all(allDeletePromises);
};

export const onceGetUsers = () => db.ref('users').once('value');

export const getUsersRef = () => db.ref('/users');

// create a 1000 fake users
export const postFakeUsers = user => {
  const users = [];
  _.times(1000, index => {
    const user = {
      name: `${faker.name.findName()}`,
      phone: `${faker.phone.phoneNumber()}`,
      email: `${faker.internet.email()}`,
      address: `${faker.address.streetAddress()} ${faker.address.streetName()}`,
      key: index
    };

    users.push(user);
  });

  db.ref('/users').set(users);
};

export const getUsers = useShallow => {
  return db.ref('/users').once('value');
};

export const dataSource = function getData({ pageIndex, pageSize }) {
  const pageData = arguments[0];
  console.log('BulkSelection getData pageData ', pageData);

  const bulkSelectionState = store.getState().bulkSelection;

  if (!pageData.pageSize) pageData['pageSize'] = bulkSelectionState.pageSize;
  if (!pageData.pageIndex) pageData['pageIndex'] = bulkSelectionState.pageIndex;

  console.log('BulkSelection getData pageIndex', pageData.pageIndex);
  console.log('BulkSelection getData pageSize', pageData.pageSize);

  const paginator = bulkSelectionState.paginator;

  return new Promise((resolve, reject) => {
    //const newPageSize = pageData.pageSize ? pageData.pageSize : 1;

    console.log('BulkSelection getData paginator', paginator);

    // only finite strategy supports goToPage
    // infinite can only do next and previous

    if (paginator.isFinite) {
      paginator.goToPage(pageData.pageIndex, 10).then(snapshot => {
        console.log('collection', paginator.collection);

        const users = _.map(paginator.collection, user => {
          return {
            Name: user.name,
            'Phone Number': user.phone,
            Address: user.address,
            Email: user.email,
            Id: user.key
          };
        }).reverse();

        console.log('dataSource getData lastQuery users', users.length);

        resolve({
          data: users,
          total: users.length
        });
      });
    } else {
      // would need to determine if this is the next or previous click!
      paginator.next().then(snapshot => {
        console.log('collection', paginator.collection);

        const users = _.map(paginator.collection, user => {
          return {
            Name: user.name,
            'Phone Number': user.phone,
            Address: user.address,
            Email: user.email,
            Id: user.key
          };
        }).reverse();

        console.log('dataSource getData lastQuery users', users.length);

        resolve({
          data: users,
          total: users.length
        });
      });
    }
  });
};

export default dataSource;
