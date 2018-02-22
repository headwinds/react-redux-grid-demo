/* eslint-disable */
//import * as FirebaseConnection from './';
import * as _ from 'lodash';
import Promise from 'bluebird';
import * as firebase from 'firebase';
import { config } from './firebaseConfig';
import faker from 'faker';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

const pageSize = 10;
let currentPageIndex = 0;

export const addRecord = user => {
  return db.ref('users').push(user);
};

export const bulkDeleteRows = indexes => {
  //return FirebaseConnection.db.ref('users').push(user);
};

export const onceGetUsers = () => db.ref('users').once('value');

export const postUser = user => db.ref('/users').push(user);

export const getUsersRef = () => db.ref('/users');

export const deleteUsers = ids => {
  const usersRef = getUsersRef();
  const allDeletePromises = [];
  ids.each(id => {
    const promise = usersRef.child(id).remove();
    allDeletePromises.push(allDeletePromises);
  });
  return Promise.all(allDeletePromises);
};

// create a 1000 fake users
export const postFakeUsers = user => {
  const users = [];
  _.times(1000, index => {
    const user = {
      id: index,
      name: `${faker.name.findName()}`,
      phone: `${faker.phone.phoneNumber()}`,
      email: `${faker.internet.email()}`,
      address: `${faker.address.streetAddress()} ${faker.address.streetName()}`
    };

    users.push(user);
  });

  db.ref('/users').set(users);
};

export const dataSource = function getData({ pageIndex }) {
  return new Promise((resolve, reject) => {
    //reject('missing properties');
    const ref = db.ref('users');

    //pageIndex = typeof pageIndex === 'undefined' ? currentPageIndex : pageIndex;

    currentPageIndex++;
    console.log('calling', currentPageIndex, pageSize);

    const lastQuery = ref
      .limitToLast(currentPageIndex * pageSize)
      .once('value')
      .then(
        snapshot => {
          console.log('dataSource ', snapshot.val());

          const users = _.map(snapshot.val(), user => {
            return {
              Name: user.name,
              'Phone Number': user.phone,
              Address: user.address,
              Email: user.email
            };
          }).reverse();

          resolve({
            data: users,
            total: users.length
          });
        },
        error => {}
      );
  });
};

export default dataSource;
