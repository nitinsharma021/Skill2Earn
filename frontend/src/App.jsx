import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CompleteProfile from "./pages/CompleteProfile";
import BrowseServices from "./pages/BrowseServices";
import ProviderDetails from "./pages/ProviderDetails";
import RoleSelection from "./pages/RoleSelection";


function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route path="/completeprofile" element={<CompleteProfile />} />
        <Route path="/services" element={<BrowseServices />} />
        <Route path="/provider/:id" element={<ProviderDetails />} />
        <Route path="/join" element={<RoleSelection />} />
       

      </Routes>
    </BrowserRouter>
  );
}

export default App;