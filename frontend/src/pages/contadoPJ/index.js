import { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
import AuthContext from "../../context/authContext";
import { sendMail } from "../../services/mailService";
import "./styles.css";
import TextField from '@mui/material/TextField';
import { Fade } from "react-awesome-reveal";
import { Navigate } from "react-router-dom";

export default function ContadoPersonaJuridica(){
  const [Clasificacion,setClasificacion]=useState();
    const { user, setUser } = useContext(AuthContext);
  const [agencia, setAgencia] = useState(null);
  const [sucursal, setSucursal] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [clientsPOS, setClientsPOS] = useState([]);
  const [agencias, setAgencias] = useState([]);
  const [files, setFiles] = useState(null);
  const [productosAgr, setProductosAgr] = useState({
    agregados: [],
    total: "0",
  });
  const [search, setSearch] = useState({
    idCliente: "",
    descCliente: "",
    deliveryDate: "",
    observations: "",
    order: "",
  });
  const [loading, setLoading] = useState(false);
  const [invoiceType, setInvoiceType] = useState(false);
  const selectBranchRef = useRef();
  const limitDeliveryDateField = new Date()
  limitDeliveryDateField.setHours(2)


  const findById = (id, array, setItem) => {
    const item = array.find((elem) => elem.nit === id);
    if (item) {
      setItem(item);
    } else {
      setItem(null);
      setSucursal(null);
      selectBranchRef.current.selectedIndex = 0;
    }
  };

  const handlerChangeSearch = (e) => {
    const { id, value } = e.target;
    console.log(value);
    setSearch({
      ...search,
      [id]: value,
    });
  };

  const idParser = (id) => {
    let numeroComoTexto = id.toString();
    while (numeroComoTexto.length < 8) {
      numeroComoTexto = "0" + numeroComoTexto;
    }
    return numeroComoTexto;
  };

  const getFiles = (e) => {
    const file = e.target.files[0];
    if (file) {
      const nameFile = file.name.split(".");
      const ext = nameFile[nameFile.length - 1];
      const newFile = new File([file], `Archivo-Adjunto.${ext}`, {
        type: file.type,
      });
      setFiles(newFile);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const refreshForm = () => {
    Swal.fire({
      title: "¿Está seguro?",
      text: "Se descartará todo el proceso que lleva",
      icon: "warning",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#dc3545",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
    }).then(({ isConfirmed }) => {
      if (isConfirmed) window.location.reload();
    });
  };
  const handleClasificacion=(e)=>{
    e.preventDefault();
    setClasificacion(e.target.value);
  }
    return(
    <div className=" wrapper d-flex justify-content-center w-100 m-auto">
    <div className='rounder-4'>
    <div
      className=" login-wrapper shadow rounded-4 border border-3 pt-4 mt-5 overflow-auto" style={{backgroundColor:'white'}}
    >
    <center>
      <section className="d-flex flex-row justify-content-between align-items-center mb-2">
        <div className="d-flex flex-column">
          <center>
          <Fade cascade='true'>
          <h1 className="fs-3 fw-bold m-1 ms-4 me-4 text-danger"><strong>Persona Jurídica - Pago a Contado</strong></h1>
          </Fade>
          </center>
        </div>
      </section>
    </center>
      <form className="" onSubmit={handleSubmit}>
        <div className="bg-light rounded shadow-sm p-3 mb-3">
          <div className="d-flex flex-column gap-1">
            <div>
              <div className="d-flex flex-row">
                <div className="d-flex flex-column me-4 w-100">
              <label className="fw-bold" style={{fontSize:18}}>Clasificación</label>
              <select
                ref={selectBranchRef}
                className="form-select form-select-sm"
                onChange={(e) => setClasificacion()}
                
                required
              >
                <option selected value="" disabled>
                  -- Seleccione la Clasificación --
                </option>
                <option>Grandes Superficies</option>
                <option>Mayoristas</option>
                <option>Minoristas</option>
                <option>Supermercados</option>
                {/* {agencias
                  .sort((a, b) => a.id - b.id)
                  .map((elem) => (
                    <option id={elem.id} value={JSON.stringify(elem)}>
                      {elem.id + " - " + elem.descripcion}
                    </option>
                  ))} */}
              </select>
              </div>
              <div className="d-flex flex-column w-100 ">
              <label className="fw-bold" style={{fontSize:18}}>Agencia</label>
              <select
                ref={selectBranchRef}
                className="form-select form-select-sm w-100"
                required
                
              >
                <option selected value='' disabled>
                  -- Seleccione la Agencia --
                </option>
                
              </select>
              </div>
              </div>
              <div className="d-flex flex-row mt-2 mb-2  w-100">
              <label className="fw-bold me-1" style={{fontSize:18}}>Solicitante:</label>
              <input
                  id="solicitante"
                  type="text"
                  placeholder="Nombre"
                  className="form-control form-control-sm "
                  autoComplete="off"
                 required
              />
              </div>        
            </div>
            <hr className="my-1" />
            <div>
              <label className="fw-bold mb-1" style={{fontSize:22}}>OFICINA PRINCIPAL</label>
              <div className="d-flex flex-row">
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">RazónSocial:</label>
                  <input
                    id="idCliente"
                    type="text"
                    className="form-control form-control-sm me-3"
                                  
                    min={0}
                    required
                    placeholder="Campo obligatorio"
                  />
                </div>   
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">NIT:</label>
                  <input
                    id="apellidos"
                    type="number"
                    className="form-control form-control-sm"
                    min={0}
                    required
                     
                    placeholder="Campo obligatorio"
                  >
                  </input>
                </div>
              </div>
              <div className="d-flex flex-row mt-2">
                <label className="me-1">Dirección oficina principal:</label>
                <input
                  placeholder="campo obligatorio"
                  type="text"
                  id="direccion"
                  className="form-control form-control-sm w-75"
                  min={0}
                  required
                >
                </input>
              </div>
              <div className="d-flex flex-row mt-2">
                <div className="d-flex flex-row w-100">
                <label className="me-1">Departamento:</label>
                <select
                    ref={selectBranchRef}
                    className="form-select form-select-sm m-100 me-3"
                    required
                    
                  >
                  <option selected value='' disabled>
                    -- Seleccione el Departamento --
                  </option>  
                  <option>13 - Cédula de cuidadania</option> 
                  <option>22 - Cédula de Extranjería</option> 
                  <option>31 - NIT</option> 
                  <option>42 - Tipo Doc. Extranjería</option> 
                  <option>47 - Permiso de permanencia</option> 
                  <option>99 - Otros</option> 
                </select>
                </div>
                <div className="d-flex flex-row w-100">
                <label className="me-1">Ciudad:</label>
                <select
                    ref={selectBranchRef}
                    className="form-select form-select-sm w-100"
                    required
                    
                  >
                  <option selected value='' disabled>
                    -- Seleccione la Ciudad --
                  </option>  
                  <option>13 - Cédula de cuidadania</option> 
                  <option>22 - Cédula de Extranjería</option> 
                  <option>31 - NIT</option> 
                  <option>42 - Tipo Doc. Extranjería</option> 
                  <option>47 - Permiso de permanencia</option> 
                  <option>99 - Otros</option> 
                </select>
                </div>
              </div>
              <div className="d-flex flex-row mt-2 mb-2">
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">No.Celular:</label>
                  <input
                    id="numeroCelular"
                    type="number"
                    className="form-control form-control-sm me-3"
                    min={0}
                    required
                    placeholder="Campo obligatorio"
                  />
                </div>
                <div>
                </div>
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">Teléfono:</label>
                  <input
                    id="telefono"
                    type="number"
                    className="form-control form-control-sm"
                    min={0}
                    required
                    placeholder="(Campo Opcional)"
                  >
                  </input>
                </div>
              </div>
              <div className="d-flex flex-row align-items-start mb-3 w-100">
                  <label className="me-1">Correo de notificación:</label>
                  <input
                    id="numeroDocumento"
                    type="email"
                    className="form-control form-control-sm "
                    min={0}
                    required
                    style={{width:635}} 
                    placeholder="Campo obligatorio"
                  >
                  </input>
              </div>
              
            </div>            
            <hr className="my-1" />
            <div>
              <label className="fw-bold" style={{fontSize:22}}>SUCURSAL</label>                  
              <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">NombreSucursal:</label>
                  <input
                    id="numeroDocumento"
                    type="text"
                    className="form-control form-control-sm w-100"
                    min={0}
                    required
                    style={{width:635}} 
                    placeholder="Campo obligatorio"
                  >
                  </input>
              </div>
              <div className="d-flex flex-row align-items-start w-100 mt-2">
                  <label className="me-1">DirecciónSucursal:</label>
                  <input
                    id="numeroDocumento"
                    type="text"
                    className="form-control form-control-sm w-100"
                    min={0}
                    required
                    style={{width:635}} 
                    placeholder="Campo obligatorio"
                  >
                  </input>
              </div>

              <div className="d-flex flex-row mt-2">
                <div className="d-flex flex-row w-100">
                <label className="me-1">Departamento:</label>
                <select
                    ref={selectBranchRef}
                    className="form-select form-select-sm m-100 me-3"
                    required
                    
                  >
                  <option selected value='' disabled>
                    -- Seleccione el Departamento --
                  </option>  
                  <option>13 - Cédula de cuidadania</option> 
                  <option>22 - Cédula de Extranjería</option> 
                  <option>31 - NIT</option> 
                  <option>42 - Tipo Doc. Extranjería</option> 
                  <option>47 - Permiso de permanencia</option> 
                  <option>99 - Otros</option> 
                </select>
                </div>
                <div className="d-flex flex-row w-100">
                <label className="me-1">Ciudad:</label>
                <select
                    ref={selectBranchRef}
                    className="form-select form-select-sm w-100"
                    required
                    
                  >
                  <option selected value='' disabled>
                    -- Seleccione la Ciudad --
                  </option>  
                  <option>13 - Cédula de cuidadania</option> 
                  <option>22 - Cédula de Extranjería</option> 
                  <option>31 - NIT</option> 
                  <option>42 - Tipo Doc. Extranjería</option> 
                  <option>47 - Permiso de permanencia</option> 
                  <option>99 - Otros</option> 
                </select>
                </div>
              </div>
              <div className="d-flex flex-row mt-2 mb-2">
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">No.Celular:</label>
                  <input
                    id="numeroCelular"
                    type="number"
                    className="form-control form-control-sm me-3"
                    min={0}
                    required
                    placeholder="Campo obligatorio"
                  />
                </div>
                <div>
                </div>
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">Teléfono:</label>
                  <input
                    id="telefono"
                    type="number"
                    className="form-control form-control-sm"
                    min={0}
                    required
                    placeholder="(Campo Opcional)"
                  >
                  </input>
                </div>
              </div>
              <div className="d-flex flex-row align-items-start mb-3">
                  <label className="me-1">Correo factura electrónica:</label>
                  <input
                    id="numeroDocumento"
                    type="email"
                    className="form-control form-control-sm"
                    min={0}
                    required
                    style={{width:635}} 
                    placeholder="Campo obligatorio"
                  >
                  </input>
              </div>
              <hr className="my-1" />
              <div className="mt-4">
              <label className="fw-bold mb-1" style={{fontSize:22}}>DATOS REPRESENTANTE LEGAL</label>
              <div className="d-flex flex-row">
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">Nombres:</label>
                  <input
                    id="idCliente"
                    type="text"
                    className="form-control form-control-sm me-3"
                                  
                    min={0}
                    required
                    placeholder="Campo obligatorio"
                  />
                </div>   
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">Apellidos:</label>
                  <input
                    id="apellidos"
                    type="text"
                    className="form-control form-control-sm"
                    min={0}
                    required
                     
                    placeholder="Campo obligatorio"
                  >
                  </input>
                </div>
              </div>
              <div className="d-flex flex-row mt-2 mb-4">
              <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">TipoDocumento:</label>
                  <select
                    ref={selectBranchRef}
                    className="form-select form-select-sm m-100 me-3"
                    required
                    
                  >
                  <option selected value='' disabled>
                    <center>
                    - Seleccione el Tipo de documento -
                    </center>
                  </option>  
                  <option>13 - Cédula de cuidadania</option> 
                  <option>22 - Cédula de Extranjería</option> 
                  <option>31 - NIT</option> 
                  <option>42 - Tipo Doc. Extranjería</option> 
                  <option>47 - Permiso de permanencia</option> 
                  <option>99 - Otros</option> 
              </select>
                </div>  
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">No.Identificacion:</label>
                  <input
                    id="noIdentificacion"
                    type="number"
                    className="form-control form-control-sm"
                    min={0}
                    required
                     
                    placeholder="Campo obligatorio"
                  >
                  </input>
                </div>
              </div>
              </div>
              <hr className="my-1" />
            </div> 
            <div className="w-100 mt-1">
              <label className="fw-bold" style={{fontSize:22}}>DOCUMENTOS OBLIGATORIOS</label>
              <div className="d-flex flex-row m-1">
                <div className="me-2 w-100">
                  <label className="fw-bold mt-1 ">RUT: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf, .xls, .xlsx"
                  />
                </div>
                <div className="ms-2 w-100">
                  <label className="fw-bold mt-1 me-2">INFOLAFT: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf, .xls, .xlsx"
                  />
                </div>
                {/* 
                <div className="d-flex flex-row mt-1">
                  <label className="fw-bold mt-1 me-2">OTROS: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf, .xls, .xlsx"
                  />
                </div> */}
              </div>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column mt-2 w-100 me-2">
                  <label className="fw-bold mt-1 me-2">INFOLAFT REP. LEGAL: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100 me-2"
                    accept=".pdf, .xls, .xlsx"
                  />
                </div> 
              <div className="d-flex flex-column mt-2 w-100 ms-2">
                  <label className="fw-bold mt-1 me-2">OTROS: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf, .xls, .xlsx"
                  />
                </div> 
                </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mb-3">
          <label className="fw-bold" style={{fontSize:22}}>OBSERVACIONES</label>
          <textarea
            id="observations"
            className="form-control"
            style={{ minHeight: 70, maxHeight: 100, fontSize: 12 }}
          ></textarea>
        </div>
        <Modal show={loading} centered>
          <Modal.Body>
            <div className="d-flex align-items-center">
              <strong className="text-danger" role="status">
                Cargando...
              </strong>
              <div
                className="spinner-grow text-danger ms-auto"
                role="status"
              ></div>
            </div>
          </Modal.Body>
        </Modal>
        <end>
        <div className="d-flex flex-row mb-2">
          <div className="w-75">
          </div>
          <Fade cascade direction="right">
          <div className="d-flex flex-row">
          <button
            type="submit"
            className="fw-bold w-100 ms-2 me-3"
            onSubmit={handleSubmit}
          >
            REGISTRAR
          </button>
          <Button variant="secondary" className="w-100 ms-2" onClick={refreshForm}>CANCELAR</Button>
          </div>
          </Fade>
          <div className="" style={{width:50}}>
          </div>
        </div>
        </end>
      </form>
    </div>
    </div>
    </div>
  );
}