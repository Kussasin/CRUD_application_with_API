import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './Pages/MainPage/MainPage';
import Layout from './Components/Layout/Layout';
import Authorization from './Pages/Authorization/Authorization';
import About from './Pages/About/About';
import CompaniesList from './Pages/Companies/CompaniesList/CompaniesList';
import CompanyProfile from './Pages/Companies/CompanyProfile/CompanyProfile';
import NoPage from './Pages/NoPage/NoPage';
import Registration from './Pages/Registration/Registration';
import UserDetails from './Pages/Users/UserDetails/UserDetails';
import UsersList from './Pages/Users/UsersList/UsersList';
import { Provider } from 'react-redux';
import { store } from './Store/CounterStore';
import PrivateRoute from './Utils/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <main className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<PrivateRoute />}>
              <Route path="/about" element={<About />} />
              <Route path="/companies" element={<CompaniesList />} />
              <Route path="/company/:id" element={<CompanyProfile />} />
              <Route path="/users" element={<UsersList />} />
              <Route path="/user/:id" element={<UserDetails />} />
            </Route>
            <Route path="/" element={<Layout />}>
              <Route index element={<MainPage />} />
              <Route path="/authorization" element={<Authorization />} />
              <Route path="/registration" element={<Registration />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer
                position="top-center"
                autoClose={1000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="light"
            />
    </main>
  );
}

export default App;
