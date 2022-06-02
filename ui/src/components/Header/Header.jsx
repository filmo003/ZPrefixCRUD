import React from 'react';
import { RuxGlobalStatusBar, RuxButton } from '@astrouxds/react';
import { Link } from 'react-router-dom';

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
};

export default Header;