import { Navigate } from 'react-router-dom';
import Layout from '../Components/Layout/Layout';
import { RootState, store } from '../Store/CounterStore';

const PrivateRoute = () => {
  const state: RootState = store.getState();
  const token = state.token.token?.access_token;

  return token ? <Layout /> : <Navigate to="/authorization" />;
}
export default PrivateRoute;
