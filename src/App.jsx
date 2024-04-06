import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { useContext, useEffect, useState } from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import Create from "./Components/Create/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/Post";
function App() {
  const { setUser, user } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <>loading...</>;
  }

  return (
    <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/Signup"
            element={user ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/Login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/Create"
            element={user ? <Create /> : <Navigate to="/Login" />}
          />
          <Route path="/Product/:id" element={<ViewPost />} />
        </Routes>
      </Router>
    </Post>
  );
}

export default App;
