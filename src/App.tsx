import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import AddUser from './pages/AddUser';
import EditUser from './pages/EditUser';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ViewUser from './pages/ViewUser';

function App() {
  const routeList = [
    {
      path: '/',
      title: 'Home',
      element: <Home />
    },
    {
      path: '/user/add',
      title: 'Add User',
      element: <AddUser />
    }
  ];
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<Layout routeList={routeList} />} >
            {routeList.map(({path, element}) => (
              <Route key={path} path={path} element={element} />
            ))}
            <Route path='/user/view/:id' element={<ViewUser />} />
            <Route path='/user/edit/:id' element={<EditUser />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
