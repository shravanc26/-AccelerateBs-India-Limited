import './App.css';
import Test from './Task/Test';
import List from './projects/list';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />}></Route>
      <Route path="project/:id" element={<Test />} />
      </Routes>
      
    </BrowserRouter>
  );
}

export default App;
