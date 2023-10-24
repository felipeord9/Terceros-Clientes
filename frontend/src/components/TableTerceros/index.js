import * as FiIcons from 'react-icons/fi';
import DataTable from 'react-data-table-component'

export default function TableTerceros({ terceros, loading }) {
  const columns = [
    {
      id: "id",
      name: "id",
      selector: (row) => row.id,
      sortable: true,
      width: '80px',
    },
    {
      id: "tipoPersona",
      name: "Tipo Persona",
      selector: (row) => row.tipoPersona,
      sortable: true,
      width: '140px'
    },
    {
      id: "tipoPago",
      name: "Tipo Pago",
      selector: (row) => row.tipoPago,
      sortable: true,
      width: '140px'
    },
    {
      id: "Clasificacion",
      name: "Clasificacion",
      selector: (row) => row.clasificacionDescription,
      sortable: true,
      width: '180px',
    },
    {
        id: "Agency",
        name: "Agencia",
        selector: (row) => row.agenciaDescription,
        sortable: true,
        width: '230px'
      },
      {
        id: "solicitante",
        name: "Solicitante",
        selector: (row) => row.solicitante,
        sortable: true,
        width: '200px'
      },
      {
        id: "clienteNombre",
        name: "Nombre Cliente",
        selector: (row) => row.clienteNombre,
        sortable: true,
        width: '200px',
      }, 
      {
        id: "tipoDocumento",
        name: "Tipo Documento",
        selector: (row) => row.tipoDocumento,
        sortable: true,
        width: '200px',
      }, 
      {
        id: "numeroDocumento",
        name: "No. identificacion",
        selector: (row) => row.numeroIdentificacion,
        sortable: true,
        width: '180px',
      },
      {
        id: "direccion",
        name: "Direccion",
        selector: (row) => row.direccion,
        sortable: true,
        width: '200px',
      },
      {
        id: "departamento",
        name: "Departamento",
        selector: (row) => row.departamento,
        sortable: true,
        width: '180px'
      },
      {
        id: "ciudad",
        name: "Ciudad",
        selector: (row) => row.ciudad,
        sortable: true,
        width: '180px'
      },
      {
        id: "celular",
        name: "Celular",
        selector: (row) => row.celular,
        sortable: true,
        width: '150px',
      },{
        id: "telefono",
        name: "telefono",
        selector: (row) => row.telefono,
        sortable: true,
        width: '150px',
      },{
        id: "correoContacto",
        name: "correoContacto",
        selector: (row) => row.correoContacto,
        sortable: true,
        width: '250px',
      },{
        id: "correoFactura",
        name: "correoFactura",
        selector: (row) => row.correoFactura,
        sortable: true,
        width: '250px',
      },{
        id: "observations",
        name: "Observaciones",
        selector: (row) => row.observations,
        sortable: true,
        width: '350px',
      },{
        id: "Create by",
        name: "Creado por",
        selector: (row) => row.userName,
        sortable: true,
        width: '200px',
      }

    
  ]
  
  return (
    <div
      className="wrapper justify-content-center d-flex flex-column rounded"
    >
    <div className='rounder-4'>
    <div className='login-wrapper rounder-4' style={{width:1000,height:400}} >
      <DataTable
        className="bg-light text-center border border-2 h-100 w-100"
        style={{fontSize:20}}
        columns={columns}
        data={terceros}
        fixedHeaderScrollHeight={200}
        
        progressPending={loading}
        progressComponent={
          <div class="d-flex align-items-center text-danger gap-2 mt-2">
            <strong>Cargando...</strong>
            <div
              class="spinner-border spinner-border-sm ms-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        }
        dense
        striped
        fixedHeader
      />
      </div>
      </div>
    </div>
  )
}