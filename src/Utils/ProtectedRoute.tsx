import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../Components/Layout/Layout';
import { RootState } from '../Store/CounterStore';

const PrivateRoute = () => {
  const token = useSelector((state: RootState) => state.user.user);

  return token ? <Layout /> : <Navigate to="/authorization" />;
};

export default PrivateRoute;
