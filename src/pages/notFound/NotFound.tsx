import { FC } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.module.scss';

const NotFound: FC = () => {
  return (
    <div className="wrapper">
      <h1>Page not found</h1>
      <Link to="/main">Go main page</Link>
    </div>
  );
};

export default NotFound;
