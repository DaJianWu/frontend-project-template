/* eslint-disable */
const module1 = require('./modules/module1');
import module2 from './modules/module2';
import './modules/module3';

import './index.css';

console.log(module1, module2);

if (module.hot) {
  module.hot.accept();
}

// console.log(process.env.NODE_ENV, process.env.APP_ENV);
