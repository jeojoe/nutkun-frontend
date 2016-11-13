import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import moment from 'moment';
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
