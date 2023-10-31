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
      name: "TipoPersona",
      selector: (row) => row.tipoPersona,
      sortable: true,
      width: '120px'
    },
    {
      id: "cedula",
      name: "# identificacion",
      selector: (row) => row.cedula,
      sortable: true,
      width: '160px'
    },
    {
      id: "tipoDocumento",
      name: "TipoDoc",
      selector: (row) => row.tipoDocumento,
      sortable: true,
      width: '110px',
    }, 
    {
      id: "razonSocial",
      name: "Razon social",
      selector: (row) => row.razonSocial,
      sortable: true,
      width: '200px',
    },
    {
        id: "departamento",
        name: "Dpto",
        selector: (row) => row.departamento,
        sortable: true,
        width: '90px'
      },
      {
        id: "ciudad",
        name: "City",
        selector: (row) => row.ciudad,
        sortable: true,
        width: '100px',
      }, 
      {
        id: "correoFe",
        name: "Correo Factura",
        selector: (row) => row.correoFacturaElectronica,
        sortable: true,
        width: '180px',
      },
      {
        id: "regimen",
        name: "Regimen",
        selector: (row) => row.regimenFiscal,
        sortable: true,
        width: '120px',
      },
      {
        id: "responsabilidad",
        name: "Respo.Fiscal",
        selector: (row) => row.responsabilidadFiscal,
        sortable: true,
        width: '130px'
      },
      {
        id: "detalle",
        name: "Deta.Tributario",
        selector: (row) => row.detalleTributario,
        sortable: true,
        width: '145px'
      },
      {
        id: "nameRep",
        name: "NombreRepLegal",
        selector: (row) => row.nameRepLegal,
        sortable: true,
        width: '150px',
      },
      {
        id: "solicitante",
        name: "Solicitante",
        selector: (row) => row.solicitante,
        sortable: true,
        width: '200px'
      },
      {
        id: "observaciones",
        name: "Observaciones",
        selector: (row) => row.observations,
        sortable: true,
        width: '250px',
      },
      {
        id: "clasificacion",
        name: "Clasificación",
        selector: (row) => row.clasificacion,
        sortable: true,
        width: '130px',
      },{
        id: "agencia",
        name: "Agencia",
        selector: (row) => row.agencia,
        sortable: true,
        width: '110px',
      },{
        id: "tipoFormulario",
        name: "TipoFormulario",
        selector: (row) => row.tipoFormulario,
        sortable: true,
        width: '150px',
      },{
        id: "Create by",
        name: "Creado por",
        selector: (row) => row.userName,
        sortable: true,
        width: '150px',
      }
  ]
  
  return (
    <div
      className="wrapper justify-content-center d-flex flex-column rounded" style={{userSelect:'none',fontSize:20}}
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