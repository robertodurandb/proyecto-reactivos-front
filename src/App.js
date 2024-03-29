
import Login from './componentes/Login';
import ListaExa from './componentes/ListaExa'
import Principal from './componentes/Principal'
import EditarExa from './componentes/EditarExa';
import 'bootstrap/dist/css/bootstrap.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


import React, { useEffect } from 'react'

function App() {

  const [logged, setLogged] = React.useState(false)

  function checkLogin() {
    let token = sessionStorage.getItem('token')
    if (token) {
      setLogged(true)
    } else {
      setLogged(false)
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  function signOut() {

    sessionStorage.removeItem("token")
    checkLogin()
  }

  return (

    <div className="container-xl">
        {logged ?
        (
        <Router>
              <div className="btn-group">
                <Link to="/" className="btn btn-dark">
                  Principal
                </Link>
                <Link to="/listar" className="btn btn-dark">
                  Listar
                </Link>
                <Link to="/editar" className="btn btn-dark">
                  Editar
                </Link>
                <button onClick={signOut}>Cerrar Sesion</button>
              </div>
              <hr />
            <Routes>
                <Route path="/listar" element={<ListaExa logoutCallback={checkLogin} />} />
            </Routes>
              <Routes>
                <Route path="/editar" element={<EditarExa />} />
              </Routes>
              <Routes>
                <Route path="/" element={<Principal />} />
              </Routes>
        </Router>
          )
          :
          (
            <Login loginCallback={checkLogin}></Login>
          )}
    </div>

  );
}

export default App;
