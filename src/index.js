import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppRouter from './routes';
import './main.css';

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
