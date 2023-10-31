import React, { useEffect, useState } from 'react';
import Logo from '../../assest/logo-gran-langostino.png'
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

export default function Inicio() {
  const {login,isLoginLoading,hasLoginError,isLogged}=useUser()
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    login({email,password});
  }
  const [persona,setPersona]=useState();
  const [pago,setPago]=useState();
  const handlePersona = (e) => {
    setPersona(e.target.value);
  };
  
  return(
    <div className=" wrapper d-flex flex-row justify-content-center align-items-center vh-100 w-100 m-auto" style={{boxShadow:100,bgcolor: 'background.paper'}}>
      <div className='rounder-4'>
      <div className='d-flex flex-row p-2 m-2' >
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
{/* <div className=" wrapper d-flex justify-content-center align-items-center vh-100 w-100 m-auto ">
      <div className='rounder-4'>
      <div className='login-wrapper p-2 shadow-lg border-light rounded-4 border border-3 bg-gradient d-flexjustify-content-between ' style={{backgroundColor:'white'}}>
      <h1 className='text-danger' style={{color:'black'}}><strong>Tipo de solicitud</strong></h1>
      <div className='d-flex flex-row'>
      <h3>Tipo de persona: </h3>
      <end>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Persona</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={persona}
          label="Age"
          onChange={handlePersona}
        >
          <MenuItem value={10}>Natural</MenuItem>
          <MenuItem value={20}>Juridica</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </end>
    </div>
    <div className='d-flex flex-row m-2'>
      <h3>Tipo de pago: </h3>
      <end>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pago</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pago}
          label="Age"
          onChange={handlePersona}
        >
          <MenuItem value={10}>Contado</MenuItem>
          <MenuItem value={20}>Credito</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </end>
    </div>
    </div>
    </div>
    </div> */}