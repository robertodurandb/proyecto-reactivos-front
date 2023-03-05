import React, { useEffect } from 'react'
import '../estilos/style.css'
import axios from 'axios';
import { toast } from 'react-toastify';

function EliminarExa2(){
    const [listaExa, setListaExa] = React.useState([])
    const [Examenes, setExamenes] = React.useState([])
    


    //******************** OBTENER LISTA DE EXAMENES *************/
    function getExam(){
        fetch('http://10.1.22.203:9000/examenes')
            .then(response => response.json())
            .then(data => setListaExa(data))
    }
    
    // ---------------------OBTENER EXAMEN POR SU ID-------------------
    // function getExamForId(pk){
    //     fetch('http://10.1.22.203:9000/examen/' + pk, {
    //         method: 'GET'
    //     })
    //         .then(response => response.json())
    //         .then(data => setIdExa(data))
            
    // }

    // -------------------ELIMINAR EXAMEN DE LABORATORIO ------------------------
    // function deleteExam(pk){
    //     fetch('http://10.1.22.203:9000/examen/' + pk, {
    //         method: 'DELETE',
    //         headers: {
    //             'Authorization': 'Token ' + localStorage.getItem("token")
    //         }           
    //     }).then((response) => {
    //         return response.json()     
    //     }).then((data) => {
    //         getExam()
    //     })
    // }


    // ------------------ELIMINAR EXAMEN SEGUNDA OPCION

    const handleDelete = async(id) => {

            await axios
            .delete('http://10.1.22.203:9000/examen/' + id, { 
                method: "delete",
                headers:{ 'Authorization': 'Token '+ localStorage.getItem("token")
            }})
            .then(({ data })=> {
                // const newArray = listaExa.filter((examen)=>examen.idexamen !== id);
                // console.log(newArray)
                // setExamenes(newArray);
                // toast.success(data);
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
                                <div className='parte'><button type="button" className="btn btn-outline-danger" onClick={() => handleDelete(examen.idexamen)}>X</button>
                                {/* &nbsp;&nbsp;<button type="button" className="btn btn-outline-success" onClick={e => {getExamForId(examen.idexamen)}}>Editar</button> */}
                                </div>
                            </div>
                        )
                    })}
                       
            </div>
        </div>
    )
}

export default EliminarExa2;