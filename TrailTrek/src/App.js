
import Navbar from './components/Navbar/Navbar'
import Home from './components/pages/Home'
import Discover from './components/pages/Discover'
import Groups from './components/pages/Groups'
import Favorites from './components/pages/favorites'
import {Route, Routes} from "react-router-dom"



function App() {

  return (
    <>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/Create" element={<Create />} />
      </Routes>
      </div>
    </>
  );
}

export default App;