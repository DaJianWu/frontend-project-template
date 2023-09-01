import _ from 'lodash';
import printMe from './printMe.ts';
import style from './index.module.css';
import Img from './1024.jpg';

function component() {
  const element = document.createElement('div');
  const btn = document.createElement('button');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add(style['hello']);

  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  const myImg = new Image();
  myImg.src = Img;

  element.appendChild(myImg);

  return element;
}

document.body.appendChild(component());
