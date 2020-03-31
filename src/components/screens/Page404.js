import React from 'react';
import Navbar from '../parts/Navbar';
import LoginRedirect from '../parts/LoginRedirect';

function Page404(props) {
  return (
    <div>
      <LoginRedirect/>
      <Navbar/>
      <h1>Oops! Looks like you should not be here.</h1>
      <p>Click on the navigation bar to go somewhere else</p>
    </div>
  )
}

export default Page404;
