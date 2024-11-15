import CreatedModeles from './Components/CreatedModeles/CreatedModeles';
import CreateModel from './Components/CreateModel/createModel'
import Login from './Components/login/Login';
import Main from './Components/Main/Main';
import Module from './Components/Module/Module';
import PersonalAccount from './Components/PersonalAccount/PersonalAccount';
import Register from './Components/rigister/register';
import logo from './logo.svg';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Main/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/createdModeles/:role' element={<CreatedModeles />} />
          <Route path='/createModel/:role' element={<CreateModel/>}/>
          <Route path='/personalAccount/:role' element={<PersonalAccount/>}/>
          <Route path='/module' element={<Module/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
