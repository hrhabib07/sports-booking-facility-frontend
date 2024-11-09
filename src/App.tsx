import { Outlet } from "react-router-dom";
import Navbar from "./components/ui/Navbar/Navbar";
import Footer from "./components/ui/Footer/Footer";

const App = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default App;
