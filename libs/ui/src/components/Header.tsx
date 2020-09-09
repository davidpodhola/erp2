import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';

const H : FC = () => (
  <div className="flex pa1 justify-between nowrap orange">
    <div className="flex flex-fixed black">
      <div className="fw7 mr1">Hacker News</div>
      <Link to="/" className="ml1 no-underline black">
        new
      </Link>
      <div className="ml1">|</div>
      <Link to="/customers" className="ml1 no-underline black">
        Customers
      </Link>
    </div>
  </div>
);

export const Header = withRouter(H);
