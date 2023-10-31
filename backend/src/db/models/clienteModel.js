const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./userModel")

const CLIENTE_TABLE = 'clientes';

const ClienteSchema={
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    cedula:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'cedula'
    },
    numeroDocumento:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'no_Idenficacion'
    },
    tipoDocumento:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'tipo_documento'
    },
    tipoPersona:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'tipo_persona'
    },
    razonSocial:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'razon_social'
    },
    primerApellido:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'primer_apellido'
    },
    segundoApellido:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'segundo_apellido'
    },
    primerNombre:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'primer_nombre'
    },
    otrosNombres:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'otros_nombres'
    },
    departamento:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'departamento'
    },
    ciudad:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'ciudad'
    },
     direccion:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'direccion'
    },
    celular:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'celular'
    },
    telefono:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'telefono'
    },
    correoNotificaciones:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'correo_Notificacion'
    },
    nombreSucursal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'nombre_sucursal'
    },
    direccionSucursal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'direccion_sucursal'
    },
    departamentoSucursal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'cod_depart_sucursal'
    },
    ciudadSucursal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'cod_city_sucursal'
    },
    celularSucursal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'no_sucursal'
    },
    telefonoSucursal:{
        type:DataTypes.STRING,
        allowNull:true,
        field:'telefono_sucursal'
    },
    correoSucursal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'correo_sucursal'
    },
    correoFacturaElectronica:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'correo_fe'
    },
    regimenFiscal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'regimen_fiscal'
    },
    responsabilidadFiscal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'responsability_fiscal'
    },
    detalleTributario:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'detalle_tributario'
    },
    tipoDocRepLegal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'tipo_doc_replegal'
    },
    numeroDocRepLegal:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'numero_doc_replegal'
    },
    nameRepLegal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'name_replegal'
    },
    apellidoRepLegal:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'apellido_replegal'
    },
    observations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "fecha_creacion",
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'usuario_creador',
        /* references: {
          model: USER_TABLE,
          key: "id",
        }, */
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
    solicitante:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "solicitante",
    },
    docVinculacion:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_vinculacion",
    },
    docComprAntc:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_comprAntc",
    },
    docCtalnst:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_ctalnst",
    },
    docPagare:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_pagare",
    },
    docRut:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_rut",
    },
    docCcio:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_ccio",
    },
    docCrepL:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_crepL",
    },
    docEf:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_ef",
    },
    docRefcom:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_refcom",
    },
    docCvbo:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_cvbo",
    },
    docFirdoc:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_firdoc",
    },
    docInfemp:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_infemp",
    },
    docInfrl:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_infrl",
    },
    docCerBan:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'doc_cerban'
    },
    docValAnt:{
        type: DataTypes.INTEGER,
        allowNull:false,
        field:'doc_valant'
    },
    docOtros:{
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "doc_otros",
    },
    clasificacion:{
        type: DataTypes.STRING,
        allowNull: false,
        field: "clasificacion",
    },
    agencia:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'agencia'
    },
    tipoFormulario:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'tipo_formulario'
    }
    
};

class Cliente extends Model{
    static associate(models){
        /* this.belongsTo(models.User,{as:'user'}) */
    }
    static config(sequelize){
        return{
            sequelize,
            tableName:CLIENTE_TABLE,
            modelName:'Clientes',
            timestamps:false,
        };
    }
}
module.exports = {
    CLIENTE_TABLE,
    ClienteSchema,
    Cliente,
  };