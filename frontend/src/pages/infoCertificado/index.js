import { useState, useEffect } from "react";
import * as GoIcons from "react-icons/go"
import TableCertificados from "../../components/tablaCertificados"
import { findClientes  } from "../../services/clienteService"
import { findAll , findByTercero , findCertificados } from '../../services/certificadoService'
import Swal from "sweetalert2";

export default function InfoCertificado() {
  const [terceros, setTerceros] = useState([]);
  const [suggestions, setSuggestions] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const [info,setInfo]=useState({
    nombreTercero:'',
    tercero:'',
  })

  useEffect(()=>{
    const datos = localStorage.getItem('certificado');
    const data = localStorage.getItem('dataCerti');
    if(datos){
      setInfo(JSON.parse(datos));
    }
    if(data){
      setSearch(JSON.parse(data));
      findAll(JSON.parse(data))
      .then(({data})=>{
        setTerceros(data)
        setSuggestions(data)
        setLoading(false)    
      })
    }
  },[]);

  
  /* const getAllTerceros = () => {
    setLoading(true)
    findAll(search)
    .then(({data})=>{
      setTerceros(data)
      setSuggestions(data)
      setLoading(false)    
    }) */
    /* findCertificados()
      .then(({ data }) => {
        const filteredTerceros = data.filter((elem)=>{
          if(elem.tercero.includes(info.tercero)){
            return elem
          }
        })
        if(filteredTerceros.length>0){
          setSuggestions(filteredTerceros)
          setTerceros(filteredTerceros)
          setLoading(false)
        }else{
          setTerceros(data)
          setSuggestions(data)
          setLoading(false)
        }
      })
      .catch((error) => {
        Swal.fire({
          title:'Hemos tenido un error a la hora de mostrar la informacion. ¡Intenta de nuevo!'
        })
        setLoading(false)
      }); */
  /* } */
  /* useEffect(() => {
    getAllTerceros()
  }, []); */

  const searchTerceros = () => {
    findAll(search)
    .then(({data})=>{
      setTerceros(data)
      setSuggestions(data)
      setLoading(false)    
    })
    /* const { value } = e.target
    if(value !== "") {
      const filteredTerceros = terceros.filter((elem) => {
        if(      
          elem.tercero.includes(value)
        ) {
          return elem
        }
      })
      if(filteredTerceros.length > 0) {
        setSuggestions(filteredTerceros)
      } else {
        setSuggestions(terceros)
     }
    } else {
      setSuggestions(terceros)
    }
    setSearch(value) */
  }

  return (
    <div className="wrapper justify-content-center  h-100 w-100 m-auto" style={{userSelect:'none'}}>
    <div className='rounder-4'>
    <div className="login-wrapper d-flex flex-column mt-5 pt-3" >
    <h1 className="text-danger fw-bold">Información de Tercero y Generación de Certificados</h1>
      <div className="d-flex flex-column gap-2 h-100 ">
        <div className="d-flex flex-row rounded rounded-3 p-3 border border-2" style={{backgroundColor:'white'}}>
        <div className="d-flex flex-row w-25 me-4">
          <h3>NIT:</h3>
          <input
            id="tercero"
            type="search"
            className="form-control form-control-sm d-flex justify-content-center align-content-center"
            onChange={searchTerceros}
            value={search}
            disabled
            style={{backgroundColor:'grey', color:'white',fontSize:22}}
          >
          </input>
        </div>
        <div className="d-flex flex-row w-75 ms-4">
        <h3>Nombre:</h3>
          <input
            value={info.nombreTercero}
            className="form-control form-control-sm"
            disabled
            style={{backgroundColor:'grey', color:'white', fontSize:22}}
          >
          </input>
        </div>
        </div>
        {/* <input
            type="search"
            value={search}
            className="form-control form-control-sm w-100 rounded-2"
            placeholder="Buscar Cliente por 'ID' o 'Nombre'"
            onChange={searchTerceros}
            style={{width:500, fontSize:20}}
          /> */}
        <TableCertificados terceros={suggestions} loading={loading} style={{fontSize:20}}/>
      </div>
    </div>
    </div>
    </div>
  )
} 