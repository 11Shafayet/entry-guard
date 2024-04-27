import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

const PrivateRoute = ({ children }: Props) => {
  const location = useLocation();
  const admin = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if (admin && token) {
    return children;
  }

  return <Navigate state={location.pathname} to={'/sign-in'} replace />;
};

export default PrivateRoute;
