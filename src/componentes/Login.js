import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../estilos/style.css'

function Login(props){

const [username, setUsername] = React.useState("")
const [password, setPassword] = React.useState("")
const [hashError, setHashError] = React.useState(false)

const {loginCallback} = props

function doLogin() {
    fetch('http://10.1.22.203:9000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then ((response) => {
        console.log(response.status)
        if (response.status == 401){
            setHashError(true)
        }else{
            return response.json()
            setHashError(false)
        }
        
    }).then((data) =>{
        localStorage.setItem("token", data.token)
        loginCallback()
    })
}

function handleUsernameChanged (event) {
    setUsername(event.target.value)
}
function handlePasswordChanged (event) {
    setPassword(event.target.value)
}

    return(
        <div className='container'>
            <div className='login border border-secondary border-2 rounded p-3'>
                <div className='text-center pb-2'>
                    <h3>Login</h3>
                </div>
                <div className='text-center mb-3'>
                    <input placeholder='Username' className="form-control" id="exampleInputPassword1" value={username} onChange={handleUsernameChanged}/>
                    <input placeholder='Password' type='password' className="form-control" id="exampleInputPassword1" value={password} onChange={handlePasswordChanged}/>
                    { hashError ? (
                    <div>A ocurrido un error</div>
                    ) : 
                    null}
                </div>
                <div className='text-center'>
                    <button type="button" className="btn btn-primary" onClick={doLogin}>Iniciar Sesion</button>
                </div>
                
           
            </div>
            
        </div>
    )
}
export default Login;