
import Login from './componentes/Login';
import ListaExa from './componentes/ListaExa'
import AgregarExa from './componentes/AgregarExa'
import Principal from './componentes/Principal'
import EliminarExa from './componentes/EliminarExa2';
import './App.css';
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
    let token = localStorage.getItem('token')
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

    localStorage.removeItem("token")
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
                <Link to="/agregar" className="btn btn-dark">
                  Agregar
                </Link>
                <Link to="/eliminar" className="btn btn-dark">
                  Eliminar
                </Link>
                <button onClick={signOut}>Cerrar Sesion</button>
              </div>
              <hr />
            <Routes>
                <Route path="/listar" element={<ListaExa logoutCallback={checkLogin} />} />
            </Routes>
              <Routes>
                <Route path="/agregar" element={<AgregarExa />} />
              </Routes>
              <Routes>
                <Route path="/eliminar" element={<EliminarExa />} />
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
