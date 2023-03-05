import React, { useEffect } from 'react'
import '../estilos/style.css'

function EliminarExa(){
    const [listaExa, setListaExa] = React.useState([])
    const [idExa, setIdExa] = React.useState([])

    // const [newName, setNewName] = React.useState("")
    // const [newArea, setNewArea] = React.useState()
    // const [newTipo, setNewTipo] = React.useState()
    // const [newEstado, setNewEstado] = React.useState()

    //******************** OBTENER LISTA DE EXAMENES *************/
    function getExam(){
        fetch('http://10.1.22.203:9000/examenes')
            .then(response => response.json())
            .then(data => setListaExa(data))
    }
    
    // ---------------------OBTENER EXAMEN POR SU ID-------------------
    function getExamForId(pk){
        fetch('http://10.1.22.203:9000/examen/' + pk, {
            method: 'GET'
        })
            .then(response => response.json())
            .then(data => setIdExa(data))
            
    }

    // -------------------ELIMINAR EXAMEN DE LABORATORIO ------------------------
    function deleteExam(pk){
        fetch('http://10.1.22.203:9000/examen/' + pk, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Token ' + localStorage.getItem("token")
            }           
        }).then((response) => {
            return response.json()     
        }).then((data) => {
            getExam()
        })
    }
    
        useEffect(() =>{
            getExam()
        }, [])   
      
    
    return (
        <div className="contenedorprincipal">
            <h1>Eliminacion de exámenes de Laboratorio</h1>
            <div className="container text-start">
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
                                <div className='parte'><button type="button" className="btn btn-outline-danger" onClick={e => {deleteExam(examen.idexamen)}}>X</button>
                                &nbsp;&nbsp;<button type="button" className="btn btn-outline-success" onClick={e => {getExamForId(examen.idexamen)}}>Editar</button></div>
                            </div>
                        )
                    })}
                     {/* {
                        idExa.map((exa) => {
                            return(
                                <div>
                                <fieldset>
                                    <legend>Modifica Examen</legend>
                                    <input id="codexam" value={exa.codexamen}/>
                                    <input id="namexam" value={exa.nameexamen}/>
                                    <input id="area" value={exa.namearea}/>
                                    <input id="tipo" value={exa.nametipo}/>
                                    <input id="estado" value={exa.nameestado}/>
                                    <button>Grabar</button>
                                </fieldset>
                                </div>
                            )
                        })}    */}
           
            </div>
        </div>
    )
}

export default EliminarExa;