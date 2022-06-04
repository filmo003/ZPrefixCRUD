import React from 'react';
import { RuxGlobalStatusBar, RuxButton } from '@astrouxds/react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const getPageTitle = location => {

  switch (true) {
    case /\/about/.test(location):
      return 'Developer Info';
    case /\/login*/.test(location):
      return 'Login';
    case /\/admin/.test(location):
      return 'Admin Page';
    default:
      return 'Blogs!';
  }
};

const Header = ({ location }) => {

  if (Cookies.get('username')) {
    return (
      <RuxGlobalStatusBar
      id="page-title"
      style={{ backgroundColor: '#1DAA64' }}
      app-name={getPageTitle(location)}
      menu-icon="apps"
      >
        <span>
          Welcome: {Cookies.get('username')}
        </span>
        <Link to="/">
          <RuxButton
            id="logout-button"
            style={{ backgroundColor: '#1DAA64' }}
            icon="exit_to_app"
            onClick={() => {
              Cookies.remove('username');
              console.log('logged out');
            }
            }
          >
            Logout
          </RuxButton>
        </Link>
      </RuxGlobalStatusBar>
    );
    }
  else {
    return (
      <RuxGlobalStatusBar
      id="page-title"
      style={{ backgroundColor: '#1DAA64' }}
      app-name={getPageTitle(location)}
      menu-icon="apps"
      >
        <Link to="/login">
          <RuxButton slot="right-side">Login</RuxButton>
        </Link>
      </RuxGlobalStatusBar>
    );
  }
};

export default Header;