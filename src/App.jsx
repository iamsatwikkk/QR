import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SopViewer from "./pages/SopViewer";
import QrCodes from "./pages/QrCodes";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sop/:slug" element={<SopViewer />} />
        <Route path="/admin/qr-codes" element={<QrCodes />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
