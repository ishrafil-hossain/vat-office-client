import './App.css';
import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Home/Login/Login/Login';
import Register from './Pages/Home/Login/Register/Register';
import AuthProvider from './context/AuthProvider/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import PrivateRoute from './Pages/Home/Login/PrivateRoute/PrivateRoute';
import AddFile from './Pages/Dashboard/AddFile/AddFile';
import MyFile from './Pages/Dashboard/MyFile/MyFile';
import AllFile from './Pages/Dashboard/AllFile/AllFile';
import MakeReceptionist from './Pages/Dashboard/MakeReceptionist/MakeReceptionist';
import Drop from './Pages/Dashboard/Drop/Drop';
import UpdateUser from './Pages/Dashboard/UpdateUser/UpdateUser';
import Home1 from './Pages/Dashboard/Home/Home';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}>
          </Route>

          <Route path="/home" element={<Home />}>
          </Route>

          <Route path="/add-file" element={<AddFile />}>
          </Route>

          <Route path="/login" element={<Login />}>

          </Route>

          <Route path="/register" element={<Register />}>

          </Route>

          {/* dashboard nested route starting  */}
          <Route path="/dashboard" element={<PrivateRoute> <Dashboard /></PrivateRoute>}>
            <Route exact path="/dashboard" element={<Home1 />}>

            </Route>
            <Route exact path="/dashboard/home" element={<Home1 />}>

            </Route>
            <Route path={`/dashboard/myFile`} element={<MyFile />}>
            </Route>

            <Route path={`/dashboard/allFile`} element={<AllFile />}>
            </Route>

            <Route path={`/dashboard/addFile`} element={<AddFile />}>
            </Route>

            <Route path={`/dashboard/make-receptionist`} element={<MakeReceptionist />}>
            </Route>

            <Route path={`/dashboard/drop`} element={<Drop />}>
            </Route>

            <Route path={`/dashboard/update-user/:id`} element={<UpdateUser />}>
            </Route>
            <Route
              path={`/dashboard/update/:id`}
              element={<Update />}>

            </Route>s
          </Route>
          {/* dashboard nested route ending  */}

        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;
