
import Navbar from './components/Navbar/Navbar'
import Home from './components/pages/Home'
import Discover from './components/pages/Discover'
import {Route, Routes} from "react-router-dom"



function App() {

  return (
    <>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
      </Routes>
      </div>
    </>
  );
}

export default App;