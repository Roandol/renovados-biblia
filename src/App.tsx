import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Bible from "./Pages/Bible/Principal";
import Principal from "./Pages/Principal";

const App = () => {

  return <>
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/biblia" element={<Bible />} />
        <Route path="/harpas" />
      </Routes>
    </BrowserRouter>
  </>
};

export default App;
