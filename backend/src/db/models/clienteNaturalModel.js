const { Model, DataTypes, Sequelize } = require("sequelize");
const { USER_TABLE } = require("./userModel")

const CLIENTE_NATURAL_TABLE = 'cliente_natural';

const ClienteNaturalSchema={
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    tipoPersona:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'tipo_persona'
    },
    tipoPago:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'Tipo_pago'
    },
    clasificacionDescription:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'clasificacion_description'
    },
    agenciaDescription:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'agencia_description'
    },
    solicitante:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'solicitante'
    },
    clienteNombre:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'cliente_nombre'
    },
    tipoDocumento:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'tipo_documento'
    },
    numeroIdentificacion:{
        type:DataTypes.INTEGER,
        allowNull:false,
        field:'numero_identificacion'
    },
    direccion:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'direccion'
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
    correoContacto:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'correo_contacto'
    },
    correoFactura:{
        type:DataTypes.STRING,
        allowNull:false,
        field:'correo_factura'
    },
    observations: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'user_Name',
        /* references: {
          model: USER_TABLE,
          key: "id",
        }, */
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
    },
};

class ClienteNatural extends Model{
    static associate(models){
        /* this.belongsTo(models.User,{as:'user'}) */
    }
    static config(sequelize){
        return{
            sequelize,
            tableName:CLIENTE_NATURAL_TABLE,
            modelName:'ClienteNatural',
            timestamps:false,
        };
    }
}
module.exports = {
    CLIENTE_NATURAL_TABLE,
    ClienteNaturalSchema,
    ClienteNatural,
  };