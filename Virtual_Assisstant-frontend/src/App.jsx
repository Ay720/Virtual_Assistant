import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup.jsx";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Customize from "./pages/Customize";
import Customize2 from "./pages/Customize2";
import { UserDataContext } from "./context/userContext.jsx";

const App = () => {
  const { userData } = useContext(UserDataContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData
            ? <Home />
            : <Navigate to="/signin" />
        }
      />

      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to="/customize" />}
      />

      <Route
        path="/signin"
        element={!userData ? <Signin /> : <Navigate to="/" />}
      />
  <Route path="/customize" element={<Customize />} />
  <Route path="/customize2" element={<Customize2/>} />
    </Routes>
  );
};

export default App;
