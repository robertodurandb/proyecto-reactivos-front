import React, { useEffect } from 'react'
import '../estilos/style.css'
import { toast } from 'react-toastify';
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

function EditarExa(){
    const [listaExa, setListaExa] = React.useState([])
    const [modalInsertar, setModalInsertar] = React.useState(false)
    const [listaEstados, setListaEstados] = React.useState([])
    const [listaTipos, setListaTipos] = React.useState([])
    const [listaAreas, setListaAreas] = React.useState([])
    //para ingresar datos:
    const [newCodigo, setNewCodigo] = React.useState("")
    const [newName, setNewName] = React.useState("")
    const [newArea, setNewArea] = React.useState('Bioquimica')
    const [newArea2, setNewArea2] = React.useState('1')
    const [newTipo, setNewTipo] = React.useState('Suero')
    const [newTipo2, setNewTipo2] = React.useState('1')
    const [newEstado, setNewEstado] = React.useState('disponible')
    const [newEstado2, setNewEstado2] = React.useState('2')
    
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
    function getTipoMuestras(){
        fetch('http://localhost:9000/tipomuestras')
            .then(response => response.json())
            .then(data => setListaTipos(data))
    }
    function getAreas(){
        fetch('http://localhost:9000/areas')
            .then(response => response.json())
            .then(data => setListaAreas(data))
    }
    function limpiarModal(){
        setNewCodigo('')
        setNewName('')
        setNewArea('Bioquimica')
        setNewArea2('1')
        setNewTipo('Suero')
        setNewTipo2('1')
        setNewEstado('disponible')
        setNewEstado2('2')
    }
    
    //-------AGREGANDO EXAMEN CON FETCH Y ASYNC
    const agregarExamen = async() => {
        await 
        fetch('http://localhost:9000/examen', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Token ' + sessionStorage.getItem("token")
                    },
                    body: JSON.stringify({
                        codexamen: newCodigo,
                        nameexamen: newName,
                        area_idarea: newArea2,
                        tipomuestra_idtipomuestra: newTipo2,
                        estado: newEstado2
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
            let idarea = '0'
            if (event.target.value==='Bioquimica') {
                idarea = '1'
                setNewArea2(idarea)
            }else if(event.target.value==='Hematologia'){
                idarea = '2'
                setNewArea2(idarea)
            }else if(event.target.value==='Inmunologia'){
                idarea = '3'
                setNewArea2(idarea)
            }else if(event.target.value==='Coagulacion'){
                idarea = '4'
                setNewArea2(idarea)
            }else if(event.target.value==='Hormonas'){
                idarea = '6'
                setNewArea2(idarea)
            }else if(event.target.value==='Citometria de Flujo'){
                idarea = '7'
                setNewArea2(idarea)
            }else if(event.target.value==='Medicina Transfusional'){
                idarea = '8'
                setNewArea2(idarea)
            }else if(event.target.value==='Banco de Organos'){
                idarea = '9'
                setNewArea2(idarea)
            }
        }
        function handleNewTipo(event) {
            setNewTipo(event.target.value)
            let idtipo = '0'
            if (event.target.value==="Suero") {
                idtipo = '1'
                setNewTipo2(idtipo)
            }if(event.target.value==="Orina simple") {
                idtipo = '2'
                setNewTipo2(idtipo)
            }if(event.target.value==="Sangre Total") {
                idtipo = '3'
                setNewTipo2(idtipo)
            }if(event.target.value==="Sangre EDTA") {
                idtipo = '4'
                setNewTipo2(idtipo)
            }if(event.target.value==="Orina 24hrs") {
                idtipo = '5'
                setNewTipo2(idtipo)
            }if(event.target.value==="Plasma Citrato") {
                idtipo = '6'
                setNewTipo2(idtipo)
            }
        }

        function handleNewEstado(event) {  
            setNewEstado(event.target.value)
            let id = '0'
            if(event.target.value==="agotado"){        
                id = '1'
                setNewEstado2(id)
            }else if(event.target.value==="disponible"){
                id = '2'
                setNewEstado2(id)
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
            getTipoMuestras()
            getAreas()
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
                    {/* <input id="area" className='form-control' type='number' name='area' value={newArea} onChange={handleNewArea}/> */}
                    <select id='area' className='form-select' name='area' value={newArea} onChange={handleNewArea}>
                    { listaAreas.map((area)=>{
                        return(
                            <>
                                <option >{area.namearea}</option>
                            </>
                        )
                    })}
                </select>
                </div>
                <div className='mb-3'>
                    <label for='tipo' className='form-label'>Tipo de muestra: </label>
                    {/* <input id="tipo" className='form-control' type='number' name='tipo' value={newTipo} onChange={handleNewTipo}/> */}
                    <select id='tipo' className='form-select' name='tipo' value={newTipo} onChange={handleNewTipo}>
                    { listaTipos.map((tipomuestra)=>{
                        return(
                            <>
                                <option >{tipomuestra.nametipo}</option>
                            </>
                        )
                    })}
                </select>
                </div>
                <div className='mb-3'>
                    <label for='estado' className='form-label'>Estado: </label>
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