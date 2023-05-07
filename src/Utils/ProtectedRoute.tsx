import { Navigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  const { isAuthenticated } = useAuth0();

    return token || isAuthenticated ? <Layout /> : <Navigate to="/authorization" />;
}
export default PrivateRoute;
