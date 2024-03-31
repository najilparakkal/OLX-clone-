import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import { useContext, useEffect } from "react";
import { AuthContext, FirebaseContext } from "./store/Context";
import Create from "./Components/Create/Create";
import ViewPost from "./Pages/ViewPost";
import Post from "./store/Post";
function App() {
  const { setUser } = useContext(AuthContext);
  const { auth } = useContext(FirebaseContext);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });

  return (
    <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Create" element={<Create />} />
          <Route path="/Product" element={<ViewPost />} />
        </Routes>
      </Router>
    </Post>
  );
}

export default App;
