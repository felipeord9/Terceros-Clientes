import { useState, useEffect } from "react";
import * as GoIcons from "react-icons/go"
import TableTerceros from "../../components/TableTerceros"
import { findClientesNaturales } from "../../services/clienteNaturalService"

export default function Terceros() {
  const [terceros, setTerceros] = useState([]);
  const [suggestions, setSuggestions] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getAllTerceros()
  }, []);

  const getAllTerceros = () => {
    setLoading(true)
    findClientesNaturales()
      .then(({ data }) => {
        setTerceros(data)
        setSuggestions(data)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
      });
  }

  const searchTerceros = (e) => {
    const { value } = e.target
    if(value !== "") {
      const filteredTerceros = terceros.filter((elem) => {
        if(
/*           elem.id.includes(value) ||
 */          elem.tipoPersona.toLowerCase().includes(value) ||
          elem.tipoPago.includes(value) ||
          elem.clasificacionDescription.includes(value) ||
          elem.agenciaDescription.includes(value) ||
          elem.solicitante.includes(value) ||
          elem.clienteNombre.includes(value) ||
          elem.tipoDocumento.includes(value) ||
/*           elem.numeroIdentificacion.includes(value) ||
 */          elem.direccion.includes(value) ||
          elem.departamento.includes(value) ||
          elem.ciudad.includes(value) ||
          elem.celular.includes(value) ||
          elem.telefono.includes(value) ||
          elem.correoContacto.includes(value) ||
          elem.correoFactura.includes(value) ||
          elem.observations.includes(value) ||
          elem.userName.includes(value) 
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
    setSearch(value)
  }

  return (
    <div className="wrapper justify-content-center  h-100 w-100 m-auto">
    <div className='rounder-4'>
    <div className="login-wrapper d-flex flex-column mt-5 pt-3" >
      <h1 className="text-danger fw-bold">Listado de Terceros registrados</h1>
      <div className="d-flex flex-column gap-2 h-100">
        <div className="d-flex justify-content-end mt-2 gap-3 mb-1">
          <input
            type="search"
            value={search}
            className="form-control form-control-sm w-100"
            placeholder="Buscar Tercero"
            onChange={searchTerceros}
            style={{width:500, fontSize:20}}
          />
          {/* <button
            title="Nuevo usuario"
            className="d-flex  text-nowrap btn btn-sm btn-danger text-light gap-1" 
            style={{fontSize:18}}
            onClick={(e) => setShowModalUsers(!showModalUsers)}>
              Nuevo usuario
              <GoIcons.GoPersonAdd style={{width: 25, height: 25}} />
          </button> */}
        </div>
        <TableTerceros terceros={suggestions} loading={loading} style={{fontSize:20}}/>
      </div>
    </div>
    </div>
    </div>
  )
} 