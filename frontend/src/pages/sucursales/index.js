import { useState, useEffect } from "react";
import * as GoIcons from "react-icons/go"
import TableUsers from "../../components/TableUsers"
import TableSucursales from "../../components/tableSucursales"
import ModalUsers from "../../components/ModalUsers";
import ModalSucursal from "../../components/ModalSucursal";
import { findUsers } from "../../services/userService"
import { findSucursales, findCodigo } from "../../services/sucursalService"
import Swal from "sweetalert2";

export default function Users() {
  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState(null);
  const [suggestions, setSuggestions] = useState([])
  const [ultimo,setUltimo] = useState([]);
  const [search, setSearch] = useState('')
  const [showModalSucursal, setShowModalSucursal] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllUsers()
  }, []);

  const getAllUsers = () => {
    setLoading(true)
    findSucursales()
      .then(({ data }) => {
        setSucursales(data)
        setSuggestions(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      });
  }

  const searchUsers = (e) => {
    const { value } = e.target
    if(value !== "") {
      const filteredUsers = sucursales.filter((elem) => {
        if(
          elem.cedula.includes(value)
        ) {
          return elem
        }
      })
      if(filteredUsers.length > 0) {
        setSuggestions(filteredUsers)
        /* setUltimo(filteredUsers) */
      } else {
        setSuggestions(sucursales)
     }
    } else {
      setSuggestions(sucursales)
    }
    setSearch(value)
  }

  const buscar = (e) =>{
    const { value } = e.target
    if(value !==""){
      const filtrar = sucursales.filter((elem)=>{
        if(elem.cedula.includes(value)){
          return elem[1]
        }
      })
      if(filtrar.length>0){
        setUltimo(filtrar)
      }
    }
  }

  const buscarCodigo =(e)=>{
    e.preventDefault();
    findCodigo(search)
    .then(({data})=>{
      Swal.fire({
        title:`El codigo es:${data.codigoSucursal} y el nombres es ${data.nombreSucursal}`,
        timer:5000
      })
    })  
  }

  return (
    <div className="wrapper justify-content-center  h-100 w-100 m-auto" style={{userSelect:'none'}}>
    <div className='rounder-4'>
    <div className="login-wrapper d-flex flex-column mt-5 pt-3" >
      <h1 className="text-danger fw-bold">Edición y Creación de Sucursales</h1>
      <ModalSucursal 
        user={selectedSucursal}
        setUser={setSelectedSucursal}
        showModal={showModalSucursal} 
        setShowModal={setShowModalSucursal} 
        reloadInfo={getAllUsers} 
      />
      <div className="d-flex flex-column gap-2 h-100">
        <div className="d-flex justify-content-end mt-1 gap-3 mb-1">
          <input
            type="search"
            value={search}
            className="form-control form-control-sm w-100"
            placeholder="Buscar Sucursal Por Nit"
            onChange={(e)=>(searchUsers(e),buscar(e))}
            style={{width:500, fontSize:20}}
          />
          <button
            title="Nuevo usuario"
            className="d-flex  text-nowrap btn btn-sm btn-danger text-light gap-1" 
            style={{fontSize:18}}
            onClick={(e) => setShowModalSucursal(!showModalSucursal)}>
              Nueva Sucursal
              <GoIcons.GoPersonAdd style={{width: 25, height: 25}} />
          </button>
        </div>
        <TableSucursales users={suggestions} setShowModal={setShowModalSucursal} setSelectedUser={setSelectedSucursal} loading={loading} style={{fontSize:20}}/>
        <button onClick={(e)=>buscarCodigo(e)}>buscar</button>
        <span>{ultimo}</span>
        
      </div>
    </div>
    </div>
    </div>
  )
}  