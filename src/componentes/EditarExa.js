import React, { useEffect } from 'react'
import '../estilos/style.css'
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function EditarExa(){
    const [listaExa, setListaExa] = React.useState([])
    const [modalInsertar, setModalInsertar] = React.useState(false)
    const [listaEstados, setListaEstados] = React.useState([])
    //para ingresar datos:
    const [newCodigo, setNewCodigo] = React.useState("")
    const [newName, setNewName] = React.useState("")
    const [newArea, setNewArea] = React.useState()
    const [newTipo, setNewTipo] = React.useState()
    const [newEstado, setNewEstado] = React.useState(2)
    
    const ventanaModal = () => setModalInsertar(!modalInsertar)

    //******************** OBTENER LISTA DE EXAMENES *************/
    function getExam(){
        fetch('http://localhost:9000/examenes')
            .then(response => response.json())
            .then(data => setListaExa(data))
    }
    function getEstados(){
        fetch('http://localhost:9000/estados')
            .then(response => response.json())
            .then(data => setListaEstados(data))
    }
    function limpiarModal(){
        setNewCodigo('')
        setNewName('')
        setNewArea()
        setNewTipo()
       
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
    }
    function ventanaModalAbrir() {
        limpiarModal()
        ventanaModal()
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
            const estado = event.target.value
            if (estado="disponible") {
                setNewEstado(1)
            }else if(estado="agotado"){
                setNewEstado(2)
            } 
        }
    
    
    // -----------------ELIMINAR CON FETCH Y ASYNC

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
            getEstados()
        }, []) 
      
      
    
    return (
        <div className="contenedorprincipal">
            <h1>Editar exámenes de Laboratorio</h1>
            <div className="container text-start">
                <br/>
                <button className='btn btn-success' onClick={ventanaModalAbrir}>Agregar Examen</button>
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
                                &nbsp;&nbsp;<button type="button" className="btn btn-outline-success" onClick={ventanaModal}>Editar</button>
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
                    {/* <input id='estado' className='form-control' type='number' name='estado' value={newEstado} onChange={handleNewEstado}/> */}
                    <select id='estado' className='form-select' name='estado' value={newEstado} onChange={handleNewEstado}>
                    { listaEstados.map((estado)=>{
                        return(
                            <>
                                <option >{estado.nameestado}</option>
                            </>
                        )
                    })}
                </select>
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

export default EditarExa;