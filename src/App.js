import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Users from "./components/User";
import CreateUser from "./components/CreateUser";
import Home from "./components/Home";
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-details" element={<Users />} />
        <Route path="/create-account" element={<CreateUser />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
