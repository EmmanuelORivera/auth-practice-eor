import React from 'react';

const Navbar = () => {
  return (
    <>
      <nav>
        <div className='nav-wrapper'>
          <div className='row'>
            <a
              href='#'
              className='brand-logo col s2 push-s2 l6  push-l1 xl6 push-xl2'
            >
              Logo
            </a>
            <ul
              id='nav-mobile'
              className='right hide-on-med-and-down col l6  push-l1 xl6 push-xl2'
            >
              <li>
                <a href='sass.html'>Sass</a>
              </li>
              <li>
                <a href='badges.html'>Components</a>
              </li>
              <li>
                <a href='collapsible.html'>JavaScript</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
