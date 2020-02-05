import React, {Fragment} from 'react';
import { Link } from 'react-router-dom';

import 'chota/src/_nav.css';

function Header() {
  return(
    <Fragment>
      <nav
        className="nav"
        data-test="crate-header"
      >
        <Link
          to="/"
          className="brand"
          data-test="crate-logo-link"
        >
          <strong> CRATE </strong>
        </Link>
      </nav>
      <hr />

    </Fragment>
  );
}

export default Header;
