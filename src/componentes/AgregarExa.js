import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function AgregarExa(){
    const [listaEstados, setListaEstados] = React.useState([])

    const [newCodigo, setNewCodigo] = React.useState("")
    const [newName, setNewName] = React.useState("")
    const [newArea, setNewArea] = React.useState()
    const [newTipo, setNewTipo] = React.useState()
    const [newEstado, setNewEstado] = React.useState()

    const [hashError, setHashError] = React.useState(false)
    const [hashOk, setHashOk] = React.useState(false)

    function addExamen() {
        fetch('http://localhost:9000/examen', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + sessionStorage.getItem("token")
            },
            body: JSON.stringify({
                codexamen: newCodigo,
                nameexamen: newName,
                area_idarea: newArea,
                tipomuestra_idtipomuestra: newTipo,
                estado: newEstado
            })
        }).then((response) => {
            console.log(response.status)
            if (response.status == 401) {
                setHashError(true)
            } else {
                setHashOk(true)
                setHashError(false)
                return response.json()        
            }
        }).then((data)=>{
        console.log("examen agregado")
        })
    }

    function getEstados(){
        fetch('http://localhost:9000/estados')
            .then(response => response.json())
            .then(data => setListaEstados(data))
    }
    useEffect(() =>{
        getEstados()
    }, [])

    function handleNewCodigo(event) {
        setNewCodigo(event.target.value)
    }
    function handleNewName(event) {
        setNewName(event.target.value)
    }
    function handleNewArea(event) {
        setNewArea(event.target.value)
    }
    function handleNewTipo(event) {
        setNewTipo(event.target.value)
    }
    function handleNewEstado(event) {
        setNewEstado(event.target.value)
    }

    

    return (
        <div className='container'>
            {
                hashError ? (
                    <div>A ocurrido un error, cierra y vuelva a iniciar sesión</div>
                ) : hashOk ? (
                    <div>¡¡Examen agregado Correctamente!!</div>
                ) :
                    null
            }
            <h1>Agregar Examenes de Laboratorio</h1>
            <div className='container-md'>
                <h4>Nuevo Examen:</h4>
                <div className='mb-3'>
                    <label for='codexam' className='form-label'>Código Essi: </label>
                    <input id="codexam" className='form-control' value={newCodigo} onChange={handleNewCodigo}/>
                </div>
                <div className='mb-3'>
                    <label for='namexam' className='form-label'>Nombre del Examen Essi: </label>
                    <input id="namexam" className='form-control' value={newName} onChange={handleNewName}/>
                </div>
                <div className='mb-3'>
                    <label for='area' className='form-label'>Area: </label>
                    <input id="area" className='form-control' value={newArea} onChange={handleNewArea}/>
                </div>
                <div className='mb-3'>
                    <label for='tipo' className='form-label'>Tipo de muestra: </label>
                    <input id="tipo" className='form-control' value={newTipo} onChange={handleNewTipo}/>
                </div>
                <div className='mb-3'>
                    <label for='estado' className='form-label'>Estado: </label>
                    <select id='estado' className='form-select' onChange={handleNewEstado}>
                    { listaEstados.map((estado)=>{
                        return(
                            <>
                                <option >{estado.idestado}</option>
                            </>
                        )
                    })}
                </select>
                </div>
                 <br/>
                    <button type='submit' className='btn btn-primary' onClick={addExamen}>Agregar</button>
            </div>
            
        </div>
    )
}
export default AgregarExa;