import React, { useEffect } from 'react'
import '../estilos/style.css'
import 'bootstrap/dist/css/bootstrap.css';

function ListaExa(){
    const [listaExa, setListaExa] = React.useState([])

    

    function getExam(){
        fetch('http://10.1.22.203:9000/examenes')
            .then(response => response.json())
            .then(data => setListaExa(data))
    }

    useEffect(() =>{
        getExam()
    }, [])

    return (
        <div className="contenedorprincipal">
            <h1>Listado de Examenes de Laboratorio</h1>
            <div className="container text-start">
                <div className='contenedorlista'>
                    <div className='partep'>CODIGO</div>
                    <div className='partep'>EXAMEN</div>
                    <div className='partep'>AREA</div>
                    <div className='partep'>STOCK</div>
                </div>
                    { listaExa.map((examen)=>{
                        return(
                            <div className='contenedorlista'>
                                <div className='parte'>{examen.codexamen}</div>
                                <div className='parte'>{examen.nameexamen}</div>
                                <div className='parte'>{examen.namearea}</div>
                                <div className='parte'>{examen.nameestado}</div>
                            </div>
                        )
                    })}
                
            </div>
        </div>
    )
}

export default ListaExa;