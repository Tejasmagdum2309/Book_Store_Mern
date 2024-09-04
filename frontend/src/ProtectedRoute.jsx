import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const accessToken = localStorage.getItem('accessToken');
  
  return accessToken ? Component : <Navigate to="/login" />;
};

export default ProtectedRoute;
