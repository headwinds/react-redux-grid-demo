/* eslint-disable */
//import * as FirebaseConnection from './';
import * as _ from 'lodash';
import axios from 'axios';
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
  /*
  easiest way to add a record but I want to store the key as an id too
  this make is easier for to remove the records later
    //return db.ref('/users').push(user);
  */

  const ref = db.ref('/users').push();
  return ref.set({ ...user, key: ref.key });

  //return db.ref('/users').push(user);
};

export const bulkDeleteRows = keys => {
  console.log('bulkDeleteRows: ', keys);
  const allDeletePromises = [];
  const usersRef = getUsersRef();

  _.each(keys, key => {
    const promise = usersRef.child(key).remove();
    allDeletePromises.push(promise);
  });
  /*
    _.each(snapshot.val(), item => {
      _.each(keys, key => {
        if (key === item.key) {
          const promise = usersRef.child(item.key).remove();
          allDeletePromises.push(promise);
        }
      });
    });
    */

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
  /* axios will work just need to research this more and remove the cors issue via express
  const url = useShallow
    ? 'https://react-redux-grid.firebaseio.com/users?shallow=true'
    : 'https://react-redux-grid.firebaseio.com/users';
  return axios.get(url);
  */

  return db.ref('/users').once('value');
};

export const dataSource = function getData({ pageIndex }) {
  console.log('datasource ', arguments);

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
            //console.log(user);

            return {
              Name: user.name,
              'Phone Number': user.phone,
              Address: user.address,
              Email: user.email,
              Id: user.key
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
