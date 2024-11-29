import Login from "./pages/Login";
import { BrowserRouter , Routes, Route } from "react-router-dom";
import PeopleInfo from "./PeopleInfo";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/peopleInfo" element={<PeopleInfo />} />
        </Routes>
      </BrowserRouter>
      {/* <Login/> */}
      {/* <PeopleInfo /> */}
    </>
  );
}

export default App;
