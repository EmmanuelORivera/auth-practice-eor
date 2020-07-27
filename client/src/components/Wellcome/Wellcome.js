import React from 'react';
import { Link } from 'react-router-dom';
const Wellcome = () => {
  return (
    <>
      <div className='row'>
        <h2>Learning Auth Basics</h2>
        <h5>With this app I try to understand how auth works</h5>
      </div>
      <Link to='/Signup' className='waves-effect waves-teal btn'>
        Sign Up
      </Link>
    </>
  );
};

export default Wellcome;
