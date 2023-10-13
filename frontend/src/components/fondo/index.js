import Logo from '../../assest/logo-gran-langostino.png'
 

export default function Fondo() {
  return (
    <div className=" wrapper d-flex flex-row justify-content-center align-items-center vh-100 w-100 m-auto">
      <div className='rounder-4'>
      <div className='d-flex flex-row p-2 m-2'>
      <img src={Logo} alt=''/>
      <div >
      <center>
      <label className='' style={{fontSize:100,color:'black'}}>¡Bienvenid@!</label>
      <h2>Para iniciar, elija el tipo de solicitud que</h2> 
      <h2>desea diligenciar en la parte superior</h2>
      </center>
      </div>
    </div>
    </div>
    </div>
  )
}