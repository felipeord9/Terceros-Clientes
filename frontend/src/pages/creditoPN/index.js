import { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import { Button, Modal } from "react-bootstrap";
import AuthContext from "../../context/authContext";
import "./styles.css";
import { createClienteNatural } from "../../services/clienteNaturalService";
import DepartmentContext  from "../../context/departamentoContext";
import { Fade } from "react-awesome-reveal";
import { Navigate } from "react-router-dom";
import { getAllDepartamentos } from "../../services/departamentoService";
import { getAllCiudades } from "../../services/ciudadService";
import { getAllAgencies } from "../../services/agencyService";
import { getAllClasificaciones } from "../../services/clasificacionService";
import { getAllDocuments } from '../../services/documentService'

export default function CreditoPersonaNatural(){
  /* instancias de contexto */
  const { user, setUser } = useContext(AuthContext);
  const {department,setDepartment}=useContext(DepartmentContext)

  /* inicializar variables */
  const [agencia, setAgencia] = useState(null);
  const [clasificacion,setClasificacion] = useState(null);
  const [document,setDocument]=useState(null);
  const [ciudad, setCiudad] = useState(null);
  const [departamento,setDepartamento]= useState('');
  
  /* inicializar para hacer la busqueda (es necesario inicializar en array vacio)*/
  const [clasificaciones, setClasificaciones]= useState([]);
  const [agencias, setAgencias] = useState([]);
  const [documentos,setDocumentos] = useState([]);
  const [ciudades,setCiudades] = useState([]);
  const [departamentos,setDepartamentos]=useState([]);

  const [search, setSearch] = useState({
    tipoPersona: "Natural",
    tipoPago: "Credito",
    observations: "",
    solicitante: "",
    clienteNombre: "",
    numeroIdentificacion:null,
    direccion:"",
    celular:"",
    telefono:"",
    correoContacto:"",
    correoFactura:""
  });
  const [loading, setLoading] = useState(false);
  const [invoiceType, setInvoiceType] = useState(false);
  /* rama seleccionada de cada variable */
  const selectBranchRef = useRef();
  const selectClasificacionRef =useRef();
  const selectDocumentoRef=useRef();
  const selectDepartamentoRef=useRef();
  const selectCiudadRef=useRef();

  const limitDeliveryDateField = new Date()
  limitDeliveryDateField.setHours(2)

  useEffect(()=>{
    getAllAgencies().then((data) => setAgencias(data));
    getAllClasificaciones().then((data) => setClasificaciones(data));
    getAllDocuments().then((data)=>setDocumentos(data));
    getAllDepartamentos().then((data) => setDepartamentos(data));
    getAllCiudades().then((data) => setCiudades(data));
},[]);

  const findById = (id, array, setItem) => {
    const item = array.find((elem) => elem.nit === id);
    if (item) {
      setItem(item);
    } else {
      setItem(null);
      /* setSucursal(null); */
      selectBranchRef.current.selectedIndex = 0;
    }
  };

  const handlerChangeSearch = (e) => {
    const { id, value } = e.target;
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
      /* setFiles(newFile); */
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      title: "¿Está seguro?",
        text: "Se realizará el registro de tercero",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#198754",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
    }) .then(({isConfirmed})=>{
      if(isConfirmed){
        setLoading(true);
        const f = new FormData();
        const body={
          clasficacion: clasificacion.description,
          agency: agencia.description,
          tipoDocumento: document.description,
          departamento: departamento.description,
          ciudad: ciudad.description,
          createdAt: new Date(),
          createdBy: user.name,
          tipoPersona:search.tipoPersona,
          tipoPago:search.tipoPago,
          solicitante:search.solicitante,
          clienteNombre:search.clienteNombre,
          numeroIdentificacion:search.numeroIdentificacion,
          direccion:search.direccion,
          celular:search.celular,
          telefono:search.telefono,
          correoContacto:search.correoContacto,
          correoFactura:search.correoFactura,
          observations:search.observations,
        };
        createClienteNatural(body)
          .then(() => {
            setLoading(false)
          /* reloadInfo(); */
          Swal.fire({
            title: 'Creación exitosa!',
            text: 'El tercero se ha creado correctamente',
            icon: 'success',
            showConfirmButton: true,
            confirmButtonText:'Aceptar',
            timer: 2500
          }).then(()=>{
            window.location.reload();
          })
      })
      .catch((err)=>{
        setLoading(false);
        Swal.fire({
          title: "¡Ha ocurrido un error!",
            text: `
              Hubo un error al momento de registrar el tercero, intente de nuevo.
              Si el problema persiste por favor comuniquese con el área de sistemas.`,
            icon: "error",
            confirmButtonText: "Aceptar",
        });
      });
    };
  });
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
          <label className="fs-3 fw-bold m-1 ms-4 me-4 text-danger" style={{fontSize:150}}><strong>Persona Natural - Pago a Crédito</strong></label>
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
                ref={selectClasificacionRef}
                className="form-select form-select-sm"
                onChange={(e)=>setClasificacion(JSON.parse(e.target.value))}
                required
              >
                <option selected value="" disabled>
                  -- Seleccione la Clasificación --
                </option>
                {clasificaciones
                  .sort((a,b)=>a.id - b.id)
                  .map((elem)=>(                    
                    <option id={elem.id} value={JSON.stringify(elem)}>
                      {elem.id + ' - ' + elem.description} 
                    </option>
                  ))
                }
              </select>
              </div>
              <div className="d-flex flex-column w-100 ">
              <label className="fw-bold" style={{fontSize:18}}>Agencia</label>
              <select
                ref={selectBranchRef}
                className="form-select form-select-sm w-100"
                required
                onChange={(e)=>setAgencia(JSON.parse(e.target.value))}
              >
                <option selected value='' disabled>
                  -- Seleccione la Agencia --
                </option>
                {agencias
                  .sort((a, b) => a.id - b.id)
                  .map((elem) => (
                    <option id={elem.id} value={JSON.stringify(elem)}>
                      {elem.id + " - " + elem.description}
                    </option>
                  ))}
              </select>
              </div>
              </div>
              <div className="d-flex flex-row mt-2 mb-2  w-100">
              <label className="fw-bold me-1" style={{fontSize:18}}>Solicitante:</label>
              <input
                  id="solicitante"
                  type="text"
                  placeholder="Nombre Solicitante"
                  value={search.solicitante}
                  onChange={handlerChangeSearch}
                  className="form-control form-control-sm "
                  autoComplete="off"
                 
              />
              </div>        
            </div>
            <hr className="my-1" />
            <div>
              <label className="fw-bold mb-1" style={{fontSize:20}}>CLIENTE</label>
              <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1 w-25">Nombres y apellidos:</label>
                  <input
                    id="clienteNombre"
                    type="text"
                    className="form-control form-control-sm me-3"
                    maxLength='50' 
                    min={0}
                    required
                    placeholder="Campo obligatorio"
                    value={search.clienteNombre}
                    onChange={handlerChangeSearch}
                  />
                </div>

              <div className="d-flex flex-row mt-2">
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">TipoDocumento:</label>
                  <select
                    ref={selectDocumentoRef}
                    className="form-select form-select-sm m-100 me-3"
                    onChange={(e)=>setDocument(JSON.parse(e.target.value))}
                    required
                  >
                    <option selected value='' disabled>
                  -- Seleccione el tipo de documento --
                </option>
                  {documentos
                  .sort((a, b) => a.id - b.id)
                  .map((elem) => (
                    <option id={elem.id} value={JSON.stringify(elem)}>
                      {elem.id + " - " + elem.description}
                    </option>
                  ))}
              </select>
                </div>
                <div>
                </div>
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">No.Identificación:</label>
                  <input
                    id="numeroIdentificacion"
                    type="number"
                    className="form-control form-control-sm w-100"
                    min={0}
                    value={search.numeroIdentificacion}
                    onChange={handlerChangeSearch}
                    required
                    placeholder="Campo obligatorio"
                    maxLength={10}
                  >
                  </input>
                </div>
              </div>
              <div className="d-flex flex-row mt-2 w-100">
                <label className="me-1">Dirección:</label>
                <input
                value={search.direccion}
                onChange={handlerChangeSearch}
                  placeholder="campo obligatorio"
                  type="text"
                  id="direccion"
                  className="form-control form-control-sm"
                  min={0}
                  required
                >
                </input>
              </div>
              <div className="d-flex flex-row mt-2">
                <div className="d-flex flex-row w-100">
                <label className="me-1">Departamento:</label>
                <select                    
                    onChange={(e)=>setDepartamento(JSON.parse(e.target.value))}
                    ref={selectDepartamentoRef}
                    className="form-select form-select-sm m-100 me-3"
                    required   
                 >
                   <option selected value='' disabled>
                    -- Seleccione el Departamento --
                  </option>
                      {departamentos
                      .sort((a,b)=>a.id - b.id)
                      .map((elem)=>(
                        <option key={elem.id} id={elem.id} value={JSON.stringify(elem)}>
                          {elem.description} 
                        </option>
                      ))
                    }
                    </select>
                </div>
                <div className="d-flex flex-row w-100">
                <label className="me-1">Ciudad:</label>
                <select
                    ref={selectCiudadRef}
                    className="form-select form-select-sm w-100"
                    required
                    disabled={departamento ? false : true}
                    onChange={(e)=>setCiudad(JSON.parse(e.target.value))} 
                  >
                    
                  <option selected value='' disabled>
                    -- Seleccione la Ciudad --
                  </option>  
                  {ciudades
                  .sort((a,b)=>a.id - b.id)
                  .map((elem)=>(
                    elem.id == departamento.id ?
                    <option id={elem.id} value={JSON.stringify(elem)}>
                    {elem.description}
                    </option>
                    : 
                    null
                  ))
                }
                  </select>
                </div>
              </div>
              <div className="d-flex flex-row mt-2 mb-2">
                <div className="d-flex flex-row align-items-start w-100">
                  <label className="me-1">No.Celular:</label>
                  <input
                  value={search.celular}
                  onChange={handlerChangeSearch}
                    id="celular"
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
                  value={search.telefono}
                  onChange={handlerChangeSearch}
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
              <div className="d-flex flex-row align-items-start">
                  <label className="me-1">Correo de contacto:</label>
                  <input
                  value={search.correoContacto}
                  onChange={handlerChangeSearch}
                    id="correoContacto"
                    type="email"
                    className="form-control form-control-sm"
                    min={0}
                    required
                    style={{width:635}} 
                    placeholder="Campo obligatorio"
                  >
                  </input>
              </div>
              <div className="d-flex flex-row align-items-start mt-2">
                  <label className="me-1">Correo para la factura electrónica:</label>
                  <input
                  value={search.correoFactura}
                  onChange={handlerChangeSearch}
                    id="correoFactura"
                    type="email"
                    className="form-control form-control-sm"
                    min={0}
                    required
                    style={{width:535}} 
                    placeholder="Campo obligatorio"
                  >
                  </input>
              </div>
              
            </div>            
            <hr className="my-1" />
            <div className="w-100 mt-1">
               
              <label className="fw-bold" style={{fontSize:24}}>DOCUMENTOS OBLIGATORIOS</label>
              
              <div className="d-flex flex-row m-1">
                <div className="me-2 w-100">
                  <label className="fw-bold mt-1 ">FORMATO DE VINCULACIÓN: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div>
                <div className="ms-2 w-100">
                  <label className="fw-bold mt-1 me-2">COMPROMISO ANTICORRUPCIÓN: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div>
              </div>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column mt-2 w-100 me-2">
                  <label className="fw-bold mt-1 me-2">CARTA DE INSTRUCCIONES: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
                <div className="d-flex flex-column mt-2 w-100 ms-2">
                  <label className="fw-bold mt-1 me-2">PAGARE: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
              </div>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column mt-2 w-100 me-2">
                  <label className="fw-bold mt-1 me-2">RUT: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
                <div className="d-flex flex-column mt-2 w-100 ms-2">
                  <label className="fw-bold mt-1 me-2">CERTIFICADO CAMARA DE COMERCIO: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
              </div>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column mt-2 w-100 me-2">
                  <label className="fw-bold mt-1 me-2">CÉDULA: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
                <div className="d-flex flex-column mt-2 w-100 ms-2">
                  <label className="fw-bold mt-1 me-2">ESTADOS FINANCIEROS O CERTIFICADO DE CONTADOR: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
              </div>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column mt-2 w-100 me-2">
                  <label className="fw-bold mt-1 me-2">CERTIFICACIÓN BANCARIA: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
                <div className="d-flex flex-column mt-2 w-100 ms-2">
                  <label className="fw-bold mt-1 me-2">REFERENCIAS COMERCIALES: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
              </div>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column mt-2 w-100 me-2">
                  <label className="fw-bold mt-1 me-2">CARTA VISTO BUENO ADMINISTRADOR DE LA AGENCIA: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
                <div className="d-flex flex-column mt-2 w-100 ms-2">
                  <label className="fw-bold mt-1 me-2">VALIDACIÓN DE ANTECEDENTES: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
              </div>
              <div className="d-flex flex-row">
              <div className="d-flex flex-column mt-2 w-100 me-2">
                  <label className="fw-bold mt-1 me-2">FICHA RELACIÓN DOCUMENTOS: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
                <div className="d-flex flex-column mt-2 w-100 ms-2">
                  <label className="fw-bold mt-1 me-2">OTROS: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf"                  />
                </div> 
              </div>
              
            </div>
          </div>
        </div>
        <div className="d-flex flex-column mb-3">
          <label className="fw-bold">OBSERVACIONES</label>
          <textarea
          value={search.observations}
          onChange={handlerChangeSearch}
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