import _ from 'lodash';
import printMe from './index.ts';
import './index.css';
import Icon from './1024.jpg';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  const myIcon = new Image();
  myIcon.src = Icon;

  element.appendChild(myIcon);

  return element;
}

document.body.appendChild(component());

if (module.hot) {
  module.hot.accept();
}

// console.log(process.env.NODE_ENV, process.env.APP_ENV);
