import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import { createUser, updateUser } from "../../services/userService";
import { createSucursal, updateSucursal } from "../../services/sucursalService";
import TextField from '@mui/material/TextField';
/* import bcrypt from 'bcrypt';
 */
export default function ModalSucursal({
  user,
  setUser,
  showModal,
  setShowModal,
  reloadInfo,
}) {
  const [info, setInfo] = useState({
    cedula: "",
    codigoSucursal: "",
    nombreSucursal: "",
    direccion: "",
    ciudad: "",
    celular: "",
    correoFacturaElectronica: "",
    nombreContacto: "",
    celularContacto: "",
    correoContacto: "",
  });
  const [error, setError] = useState('')
 
  useEffect(() => {
    if(user) {
      setInfo({
        cedula: user?.cedula,
        codigoSucursal: user?.codigoSucursal,
        nombreSucursal: user?.nombreSucursal,
        direccion:user?.direccion,
        ciudad: user?.ciudad,
        celular: user?.celular,
        correoFacturaElectronica: user?.correoFacturaElectronica,
        nombreContacto: user?.nombreContacto,
        celularContacto:user?.celularContacto,
        correoContacto: user?.correoContacto,
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo({
      ...info,
      [id]: value,
    });
  };

  const handleCreateNewSucursal = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Está segur@ de querer agregar esta sucursal?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#D92121',
          denyButtonText: `Cancelar`,
          denyButtonColor:'blue',
          icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        createSucursal(info)
          .then((data) => {
            setShowModal(!showModal)
            reloadInfo();
            Swal.fire(
              '¡Correcto!', 'La sucursal se ha creado con éxito', 'success'
              
            )
            
          })
        }else if(result.isDenied){
          Swal.fire('Oops', 'La información suministrada se ha descartado', 'info')
          setShowModal(!showModal)
        }
        cleanForm()
    })
      .catch((error) => {
        setError(error.response.data.errors.original.detail)
        setTimeout(() => setError(''), 2500)
      });
  };

  const handleUpdateSucursal = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Está segur@ de querer editar esta sucursal?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#D92121',
          denyButtonText: `Cancelar`,
          denyButtonColor:'blue',
          icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        updateSucursal(user.id, info)
          .then((data) => {           
            setShowModal(!showModal)
            reloadInfo();
            Swal.fire({
              title: '¡Correcto!',
              text: 'El usuario se ha actualizado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2500
            })
          })
      }else if(result.isDenied){
        Swal.fire('Oops', 'La información suministrada se ha descartado', 'info')
        setShowModal(!showModal)
      }
      cleanForm()
    })
      .catch((error) => {
        setError(error.response.data.errors.original.detail)
        setTimeout(() => setError(''), 2500)
      });
  };

  const cleanForm = () => {
    setInfo({
      cedula: "",
      codigoSucursal: "",
      nombreSucursal: "",
      direccion: "",
      ciudad: "",
      celular: "",
      correoFacturaElectronica: "",
      nombreContacto: "",
      celularContacto: "",
      correoContacto: "",
    })
  }
  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);
  
  return (
    <div className="wrapper d-flex justify-content-center align-content-center" style={{userSelect:'none'}}>
    <Modal show={showModal} style={{ fontSize: 18, userSelect:'none' }} centered>
      <Modal.Header>
        <center>
        <Modal.Title className="text-danger" style={{fontSize:40}}>
          <strong>{user ? "Actualizar" : "Crear"} Sucursal</strong>
        </Modal.Title>
        </center>
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="m-2 h-100">
          <form onSubmit={user ? handleUpdateSucursal : handleCreateNewSucursal}>
          <div>
                <h4>Información Sucursal</h4>
              <div className="d-flex flex-row w-100">
              <div className="d-flex flex-column w-50 pe-4">
              <TextField required 
                id="cedula" 
                value={info.cedula} 
                label="Código Siesa" 
                type="number" 
                onChange={handleChange} 
                variant="outlined" 
                size="small"
                color="error"
              />
              
               
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="nombreSucursal"
                  type="text"
                  value={info.nombreSucursal}
                  className="form-control form-control-sm"
                  maxLength={10}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Nombre Sucursal"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>
              <div className="d-flex flex-row w-100 mt-2">
              <div className="d-flex flex-column w-50 pe-4">
                <TextField
                  id="direccion"
                  type="text"
                  value={info.direccion}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Dirección"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="ciudad"
                  type="text"
                  value={info.ciudad}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Ciudad"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>

              <div className="d-flex flex-row w-100 mt-2">
              <div className="d-flex flex-column w-50 pe-4">
                <TextField
                  id="celular"
                  type="number"
                  value={info.celular}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Celular"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="correoFacturaElectronica"
                  type="email"
                  value={info.correoFacturaElectronica}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Correo Factura Electrónica"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>
              <hr></hr>
              <h4>Información de contacto</h4>
              <div className="d-flex flex-row w-100 mt-2">
              <div className="d-flex flex-column w-50 pe-4">                
              <TextField
                  id="nombreContacto"
                  type="text"
                  value={info.nombreContacto}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Nombre Contacto"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="celularContacto"
                  type="number"
                  value={info.celularContacto}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Celular Contacto"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>

              
              <div className="mt-2">
                <TextField
                  id="correoContacto"
                  type="email"
                  value={info.correoContacto}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Correo Contacto"
                  variant="outlined"
                  size="small"
                  color="error"
                  
                />
              </div>
            </div>
            <div className="d-flex w-100 mt-2">
              <span 
                className="text-center text-danger w-100 m-0"
                style={{height: 15}}
              >
                {error}
              </span>
            </div>
            <div className="d-flex justify-content-center gap-2 mt-2 ">
              {/* <Button type="submit" variant="success">
                {user ? "Guardar Cambios" : "Guardar"}
              </Button> */}
              <button className="me-5" type="submit">{user ? "Editar" : "Guardar"}</button>
              <Button variant="secondary" onClick={(e) => {
                setShowModal(false)
                cleanForm()
                setUser(null)
              }}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
      {<Modal.Footer></Modal.Footer>}
    </Modal>
    </div>
  );
}


/* import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Swal from 'sweetalert2'
import { createUser, updateUser } from "../../services/userService";
import { createSucursal, updateSucursal } from "../../services/sucursalService";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import * as Bs from "react-icons/bs";

export default function ModalSucursal({
  user,
  setUser,
  showModal,
  setShowModal,
  reloadInfo,
}) {

  const [info, setInfo] = useState({
    cedula: "",
    codigoSucursal: "",
    nombreSucursal: "",
    direccion: "",
    ciudad: "",
    celular: "",
    correoFacturaElectronica: "",
    nombreContacto: "",
    celularContacto: "",
    correoContacto: "",
  });
  const [error, setError] = useState('')
 
  useEffect(() => {
    if(user) {
      setInfo({
        cedula: user?.cedula,
        codigoSucursal: user?.codigoSucursal,
        nombreSucursal: user?.nombreSucursal,
        direccion:user?.direccion,
        ciudad: user?.ciudad,
        celular: user?.celular,
        correoFacturaElectronica: user?.correoFacturaElectronica,
        nombreContacto: user?.nombreContacto,
        celularContacto:user?.celularContacto,
        correoContacto: user?.correoContacto,
      })
    }
  }, [user])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo({
      ...info,
      [id]: value,
    });
  };

  const handleCreateNewSucursal = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Está segur@ de querer agregar esta sucursal?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#D92121',
          denyButtonText: `Cancelar`,
          denyButtonColor:'blue',
          icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        createSucursal(info)
          .then((data) => {
            setShowModal(!showModal)
            reloadInfo();
            Swal.fire(
              '¡Correcto!', 'La sucursal se ha creado con éxito', 'success'
              
            )
            
          })
        }else if(result.isDenied){
          Swal.fire('Oops', 'La información suministrada se ha descartado', 'info')
          setShowModal(!showModal)
        }
        cleanForm()
    })
      .catch((error) => {
        setError(error.response.data.errors.original.detail)
        setTimeout(() => setError(''), 2500)
      });
  };

  const handleUpdateSucursal = (e) => {
    e.preventDefault();
    Swal.fire({
      title: '¿Está segur@ de querer editar esta sucursal?',
          showDenyButton: true,
          confirmButtonText: 'Confirmar',
          confirmButtonColor: '#D92121',
          denyButtonText: `Cancelar`,
          denyButtonColor:'blue',
          icon:'question'
    }).then((result)=>{
      if(result.isConfirmed){
        updateSucursal(user.id, info)
          .then((data) => {           
            setShowModal(!showModal)
            reloadInfo();
            Swal.fire({
              title: '¡Correcto!',
              text: 'El usuario se ha actualizado correctamente',
              icon: 'success',
              showConfirmButton: false,
              timer: 2500
            })
          })
      }else if(result.isDenied){
        Swal.fire('Oops', 'La información suministrada se ha descartado', 'info')
        setShowModal(!showModal)
      }
      cleanForm()
    })
      .catch((error) => {
        setError(error.response.data.errors.original.detail)
        setTimeout(() => setError(''), 2500)
      });
  };

  const cleanForm = () => {
    setInfo({
      cedula: "",
      codigoSucursal: "",
      nombreSucursal: "",
      direccion: "",
      ciudad: "",
      celular: "",
      correoFacturaElectronica: "",
      nombreContacto: "",
      celularContacto: "",
      correoContacto: "",
    })
  }
  const [shown,setShown]=useState("");
  const switchShown =()=>setShown(!shown);
  
  return (
    <div className="wrapper d-flex justify-content-center align-content-center" style={{userSelect:'none'}}>
    <Modal show={showModal} style={{ fontSize: 18, userSelect:'none' }} centered>
      <Modal.Header>
        <center>
        <Modal.Title className="text-danger" style={{fontSize:45}}>
          <strong>{user ? "Actualizar" : "Crear"} Sucursal</strong>
        </Modal.Title>
        </center>
      </Modal.Header>
      <Modal.Body className="p-2">
        <div className="m-2 h-100">
          <form onSubmit={user ? handleUpdateSucursal : handleCreateNewSucursal}>
            <div>
                <h4>Información Sucursal</h4>
              <div className="d-flex flex-row w-100">
              <div className="d-flex flex-column w-50 pe-4">
              <TextField required 
                id="cedula" 
                value={info.cedula} 
                label="Código Siesa" 
                type="number" 
                onChange={handleChange} 
                variant="outlined" 
                size="small"
                color="error"
              />
              
               
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="nombreSucursal"
                  type="text"
                  value={info.nombreSucursal}
                  className="form-control form-control-sm"
                  maxLength={10}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Nombre Sucursal"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>
              <div className="d-flex flex-row w-100 mt-2">
              <div className="d-flex flex-column w-50 pe-4">
                <TextField
                  id="direccion"
                  type="text"
                  value={info.direccion}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Dirección"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="ciudad"
                  type="text"
                  value={info.ciudad}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Ciudad"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>

              <div className="d-flex flex-row w-100 mt-2">
              <div className="d-flex flex-column w-50 pe-4">
                <TextField
                  id="celular"
                  type="number"
                  value={info.celular}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Celular"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="correoFacturaElectronica"
                  type="email"
                  value={info.correoFacturaElectronica}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Correo Factura Electrónica"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>
              <hr></hr>
              <h4>Información de contacto</h4>
              <div className="d-flex flex-row w-100 mt-2">
              <div className="d-flex flex-column w-50 pe-4">                <TextField
                  id="nombreContacto"
                  type="text"
                  value={info.nombreContacto}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Nombre Contacto"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              <div className="d-flex flex-column w-50 ms-2">
                <TextField
                  id="celularContacto"
                  type="number"
                  value={info.celularContacto}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Celular Contacto"
                  variant="outlined"
                  size="small"
                  color="error"
                />
              </div>
              </div>

              
              <div className="mt-2">
                <TextField
                  id="correoContacto"
                  type="email"
                  value={info.correoContacto}
                  className="form-control form-control-sm"
                  onChange={handleChange}
                  autoComplete="off"
                  required
                  label="Correo Contacto"
                  variant="outlined"
                  size="small"
                  color="error"
                  
                />
              </div>
            </div>
            <div className="d-flex w-100 mt-2">
              <span 
                className="text-center text-danger w-100 m-0"
                style={{height: 15}}
              >
                {error}
              </span>
            </div>
            <div className="d-flex justify-content-center gap-2 mt-2 ">
              
              <button className="me-5" type="submit">{user ? "Actualizar" : "Guardar"}</button>
              <Button variant="secondary" onClick={(e) => {
                setShowModal(false)
                cleanForm()
                
              }}>
                Cancelar
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
      {<Modal.Footer></Modal.Footer>}
    </Modal>
    </div>
  );
} */
