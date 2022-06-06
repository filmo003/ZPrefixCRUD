import React from 'react';
import { RuxGlobalStatusBar, RuxButton } from '@astrouxds/react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Header.css';

const getPageTitle = location => {

  switch (true) {
    case /\/about/.test(location):
      return 'Developer Info';
    case /\/login*/.test(location):
      return 'Login';
    default:
      return 'ZPrefix Blog Application';
  }
};

const Header = ({ location }) => {

  if (Cookies.get('username')) {
    return (
      <RuxGlobalStatusBar
      id="page-title"
      style={{ 
        backgroundColor: '#1DAA64',
        fontSize: "2rem"
      }}
      app-name={getPageTitle(location)}
      include-icon="true"
      menu-icon="apps"
      >
        <span id="welcomeUser">
          Welcome: {Cookies.get('username')}
        </span>
        <Link className='loginButton' to="/">
          <RuxButton
            id="logout-button"
            style={{ backgroundColor: '#1DAA64' }}
            icon="exit_to_app"
            onClick={() => {
              Cookies.remove('username');
              Cookies.remove('userId');
              console.log('logged out');
            }
            }
          >Logout</RuxButton>
        </Link>
      </RuxGlobalStatusBar>
    );
    }
  else {
    return (
      <RuxGlobalStatusBar
      id="page-title"
      style={{
        backgroundColor: '#1DAA64',
        fontSize: '2rem'
      }}
      app-name={getPageTitle(location)}
      include-icon="true"
      menu-icon="apps"
      >
        <Link className='loginButton' to="/login">
          <RuxButton slot="right-side">Login</RuxButton>
        </Link>
      </RuxGlobalStatusBar>
    );
  }
};

export default Header;