import 'core-js/stable';

import { render } from 'react-dom';
import { createElement } from 'react';

import { App } from 'src/components/app';

render(
  createElement(App),
  document.getElementById('root')!,
);
