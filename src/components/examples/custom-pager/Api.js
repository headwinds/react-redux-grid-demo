export const dataSource = function getData({ pageIndex }) {
  console.log('CustomPager getData datasource ', arguments[0]);
  const pageData = arguments[0];
  console.log('CustomPagerApi getDatadatasource pageIndex', pageData.pageIndex);
  console.log(' CustomPagerApi getData datasource pageSize', pageData.pageSize);

  return new Promise(resolve => {
    const request = new XMLHttpRequest();

    console.log('CustomPager dataSource pageIndex: ', pageIndex);

    const config = {
      method: 'GET',
      route: 'https://react-redux-grid.herokuapp.com/getfakeData'
    };

    if (pageIndex) {
      config.route = `${config.route}?pageIndex=${pageIndex}&pageSize=10`; // eslint-disable-line max-len
    } else {
      config.route = `${config.route}?pageSize=10`; // eslint-disable-line max-len
    }

    request.open(config.method, config.route, true);

    request.addEventListener('load', res => {
      const response = JSON.parse(res.target.responseText);

      // if you have more data than is being shown
      // ensure you return a total, so the pager knows
      // what paging actions are possible

      resolve({
        data: response.data,
        total: response.total
      });
    });

    request.send(config.data || null);
  });
};

export default dataSource;
