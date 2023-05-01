import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from './Pages/MainPage/MainPage';
import Layout from './Components/Layout/Layout';
import Authorization from './Pages/Authorization/Authorization';
import About from './Pages/About/About';
import CompaniesList from './Pages/CompaniesList/CompaniesList';
import CompanyProfile from './Pages/CompanyProfile/CompanyProfile';
import NoPage from './Pages/NoPage/NoPage';
import Registration from './Pages/Registration/Registration';
import UserProfile from './Pages/UserProfile/UserProfile';
import UsersList from './Pages/UsersList/UsersList';

const App = () => {
  return (
    <main className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/authorization" element={<Authorization />} />
            <Route path="/companies" element={<CompaniesList />} />
            <Route path="/companies/:id" element={<CompanyProfile />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserProfile />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
