import React from "react";
import "./App.css";
import { BrowserRouter, useNavigate, useRoutes } from "react-router-dom";
import MainLayout from "./screens/MainLayout";
import LoginScreen from "./screens/LoginScreen";

const Routes = () => {
  const routes = useRoutes([
    { path: "/home", element: <MainLayout /> },
    { path: "/", element: <LoginScreen /> },
    // Add more routes as needed
  ]);

  return routes;
};

//App starts from here.
function App() {
  document.title = "SQ Wastage Management";
  localStorage.setItem("server-ip", "10.12.3.182:3009");
  // localStorage.setItem("server-ip", "10.12.61.195:3009");
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
