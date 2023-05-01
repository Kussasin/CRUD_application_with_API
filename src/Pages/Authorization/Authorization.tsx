import React from 'react';
import { Link } from 'react-router-dom';

const Authorization = () => {
  return (
    <div>
      <p>Authorization</p>
      <Link to="/registration">If you don't have an account click here</Link>
    </div>
  );
};

export default Authorization;
