import { useEffect, useState, useContext, useRef } from "react";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import AuthContext from "../../context/authContext";
import { sendMail } from "../../services/mailService";
import "./styles.css";
import TextField from '@mui/material/TextField';

export default function ContadoPersonaNatural(){
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
          <h1 className="fs-3 fw-bold m-1 ms-4 me-4 text-danger" ><strong>Persona Natural - Pago a contado</strong></h1>
          </center>
        </div>
      </section>
    </center>
      <form className="" onSubmit={handleSubmit}>
        <div className="bg-light rounded shadow-sm p-3 mb-3">
          <div className="d-flex flex-column gap-1">
            <div>
              <div className="d-flex flex-row">
                <div className="d-flex flex-column me-4">
              <label className="fw-bold">Clasificación</label>
              <select
                ref={selectBranchRef}
                className="form-select form-select-sm"
                onChange={(e) => setClasificacion()}
                style={{width:380}}
                required
              >
                <option selected value="" disabled>
                  -- Seleccione el Clasificación --
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
              <div className="d-flex flex-column m-100 ">
              <label className="fw-bold">Agencia</label>
              <select
                ref={selectBranchRef}
                className="form-select form-select-sm m-100"
                required
                style={{width:380}}
              >
                <option selected value='' disabled>
                  -- Seleccione la Agencia --
                </option>
                
              </select>
              </div>
              </div>
              <div className="d-flex flex-row m-2">
              <label className="me-2 mt-2 fw-bold">Solicitante:</label>
              <input
                  id="order"
                  type="text"
                  placeholder="Nombre"
                  className="form-control "
                  autoComplete="off"
                  style={{width:350}}
              />
              </div>        
            </div>
            <hr className="my-1" />
            <div>
              <label className="fw-bold">CLIENTE</label>
              <div className="row row-cols-sm-2">
                <div className="d-flex flex-column align-items-start">
                  <label>NIT/Cédula:</label>
                  <input
                    id="idCliente"
                    type="number"
                    
                    className="form-control form-control-sm"
                    placeholder="Buscar por NIT/Cédula"
                    
                    min={0}
                    required
                  />
                </div>
                <div className="d-flex flex-column align-items-start">
                  <label>Razón Social:</label>
                </div>
              </div>
              <div className="my-1">
                <label className="fw-bold">SUCURSAL</label>
                <select
                  ref={selectBranchRef}
                  className="form-select form-select-sm"
                  style={{width:250}}
                  required
                >
                  <option selected value="" disabled>
                    -- Seleccione la Sucursal --
                  </option>
                  
                </select>
              </div>
            </div>
            <div className="d-flex flex-row gap-4">
              <div className="w-50">
                <label className="fw-bold">ORDEN DE COMPRA</label>
                <input
                  id="order"
                  type="text"
                  placeholder="(Campo Opcional)"
                  className="form-control form-control-sm"
                 
                  
                  autoComplete="off"
                />
              </div>
              <div className="w-50">
                <label className="fw-bold">FECHA ENTREGA</label>
                <input
                  id="deliveryDate"
                  type="datetime-local"
                  className="form-control form-control-sm"
                  
                  required
                />
              </div>
            </div><hr className="my-1" />
            <div className="w-100">
              <label className="fw-bold">DOCUMENTOS OBLIGATORIOS</label>
              <div className="row mt-2">
                <div className="d-flex flex-row">
                  <label className="fw-bold mt-1 me-2">RUT: </label>
                  <input
                    id="files"
                    type="file"
                    placeholder="RUT"
                    className="form-control form-control-sm w-100"
                    accept=".pdf, .xls, .xlsx"
                  />
                </div>
                <div className="d-flex flex-row  mt-2">
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
              <div className="d-flex flex-row mt-2">
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
        <div className="d-flex flex-column mb-3">
          <label className="fw-bold">OBSERVACIONES</label>
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
        <div className="d-flex flex-row gap-3 mb-3">
          <button
            type="submit"
            className="btn btn-sm btn-success fw-bold w-100"
          >
            APROBAR
          </button>
          <button
            type="button"
            className="btn btn-sm btn-danger fw-bold w-100"
            onClick={refreshForm}
          >
            CANCELAR
          </button>
        </div>
      </form>
    </div>
    </div>
    </div>
  );
}