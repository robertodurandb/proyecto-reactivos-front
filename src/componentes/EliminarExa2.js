import React, { useEffect } from 'react'
import '../estilos/style.css'
// import axios from 'axios';
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function EliminarExa2(){
    const [listaExa, setListaExa] = React.useState([])
    const [modalInsertar, setModalInsertar] = React.useState(false)
    //para ingresar datos:
    const [newCodigo, setNewCodigo] = React.useState("")
    const [newName, setNewName] = React.useState("")
    const [newArea, setNewArea] = React.useState()
    const [newTipo, setNewTipo] = React.useState()
    const [newEstado, setNewEstado] = React.useState()
    
    const ventanaModal = () => setModalInsertar(!modalInsertar)
    //******************** OBTENER LISTA DE EXAMENES *************/
    function getExam(){
        fetch('http://localhost:9000/examenes')
            .then(response => response.json())
            .then(data => setListaExa(data))
    }
 
    //-------AGREGANDO EXAMEN CON FETCH Y ASYNC
    const agregarExamen = async() => {
        
        await fetch('http://localhost:9000/examen', {
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
                })
            .then(({ data })=> {
                getExam();
                ventanaModal()       
            })
        .catch(({ data })=> toast.error(data));
        // if (toast.error==true) {
        //     console.log("fallo")
        // } else {
        //     console.log("perfect")
        // }
    }

        //AGREGAR EXAMENES

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
    
    
    // -----------------ELIMINAR CON FETCH
    // function deleteExam(pk){
    //     fetch('http://localhost:9000/examen/' + pk, {
    //         method: 'DELETE',
    //         headers: {
    //             'Authorization': 'Token ' + sessionStorage.getItem("token")
    //         }           
    //     }).then((response) => {
    //         return response.json()     
    //     }).then((data) => {
    //         getExam()
    //         console.log("examen eliminado")
    //     })
    // }
    
    // ------------------ELIMINAR CON AXIOS
    const handleDelete = async(id) => {

            fetch('http://localhost:9000/examen/' + id, { 
                method: "delete",
                headers:{ 'Authorization': 'Token '+ sessionStorage.getItem("token")
            }})
            .then(({ data })=> {
                getExam();
            })
            .catch(({ data })=> toast.error(data));
    }
    
        useEffect(() =>{
            getExam()
        }, []) 
      
      
    
    return (
        <div className="contenedorprincipal">
            <h1>Eliminacion de exámenes de Laboratorio</h1>
            <div className="container text-start">
                <br/>
                <button className='btn btn-success' onClick={ventanaModal}>Agregar Examen</button>
                <div className='contenedorelimina'>
                    <div className='partep'>CODIGO</div>
                    <div className='partep'>EXAMEN</div>
                    <div className='partep'>AREA</div>
                    <div className='partep'>TIPO</div>
                    <div className='partep'>STOCK</div>
                    
                </div>
                    { listaExa.map((examen)=>{
                        return(
                            <div className='contenedorelimina'>
                                <div className='parte'>{examen.codexamen}</div>
                                <div className='parte'>{examen.nameexamen}</div>
                                <div className='parte'>{examen.namearea}</div>
                                <div className='parte'>{examen.nametipo}</div> 
                                <div className='parte'>{examen.nameestado}</div>
                                <div className='parte'><button type="button" className="btn btn-outline-danger" onClick={e => {handleDelete(examen.idexamen)}}>X</button>
                                &nbsp;&nbsp;<button type="button" className="btn btn-outline-success">Editar</button>
                                </div>
                            </div>
                        )
                    })}
                       
            </div>

            <Modal isOpen={modalInsertar} toggle={ventanaModal}>
                <ModalBody>
                <div className='from-group'>
                <h4>Nuevo Examen:</h4>
                <div className='mb-3'>
                    <label for='codexam' className='form-label'>Código Essi: </label>
                    <input id="codexam" className='form-control' type='text' name='codigo' value={newCodigo} onChange={handleNewCodigo}/>
                </div>
                <div className='mb-3'>
                    <label for='namexam' className='form-label'>Nombre del Examen Essi: </label>
                    <input id="namexam" className='form-control' type='text' name='nombre' value={newName} onChange={handleNewName}/>
                </div>
                <div className='mb-3'>
                    <label for='area' className='form-label'>Area: </label>
                    <input id="area" className='form-control' type='number' name='area' value={newArea} onChange={handleNewArea}/>
                </div>
                <div className='mb-3'>
                    <label for='tipo' className='form-label'>Tipo de muestra: </label>
                    <input id="tipo" className='form-control' type='number' name='tipo' value={newTipo} onChange={handleNewTipo}/>
                </div>
                <div className='mb-3'>
                    <label for='estado' className='form-label'>Estado: </label>
                    <input id='estado' className='form-control' type='number' name='estado' value={newEstado} onChange={handleNewEstado}/>
                </div>
            </div>
                </ModalBody>
                <ModalFooter>
                    <button type='submit' className='btn btn-primary' onClick={agregarExamen}>Agregar</button>
                    <button className='btn btn-danger' onClick={ventanaModal}>Cancelar</button>
                </ModalFooter>
            </Modal>
        </div>

    )
}

export default EliminarExa2;