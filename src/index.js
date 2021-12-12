import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter,
  Route, 
  Routes
} from 'react-router-dom'
import Lobby from "./components/Lobby";
import SignUpLogInContainer from "./components/SignUpLogInContainer";
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import {
  logIn,
  signUp,
  lobby
} from './constants/routes'
import PrivateRoute from './components/PrivateRoute'
import NonPrivateRoute from './components/NonPrivateRoute'
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Raleway']
  }})

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route exact path={ lobby } element={ <PrivateRoute /> }>
              <Route exact path={ lobby } element={ <Lobby /> }/>
            </Route>
            <Route exact path={ signUp } element={ <NonPrivateRoute /> }>
              <Route exact path={ signUp } element={ <SignUpLogInContainer /> }/>
            </Route>
            <Route exact path={ logIn } element={ <NonPrivateRoute /> }>
              <Route exact path={ logIn } element={ <SignUpLogInContainer /> }/>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);