import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Users from './pages/users';

const App = () =>{
    return(
      <>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/users" element={<Users/>}/>
          
        </Routes>
      </>
    )
}
export default App;
