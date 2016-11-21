import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import moment from 'moment';
// import 'whatwg-fetch';
import AppRouter from './routes';
import './main.css';

moment.locale('th');

injectTapEventPlugin();

const MUIWrapper = () => (
  <MuiThemeProvider>
    <AppRouter />
  </MuiThemeProvider>
);

ReactDOM.render(
  <MUIWrapper />,
  document.getElementById('root')
);
