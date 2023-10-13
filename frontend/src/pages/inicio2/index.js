import React, { useState } from "react"
import Logo from '../../assest/logo-gran-langostino.png'
import useUser from '../../hooks/useUser';
import { Navigate, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import { Divider } from "@mui/material";

export default function Inicio2(){
    const [pago,setPago]=useState();
    const [persona,setPersona]=useState();
    const [tipo,setTipo]=useState();
    const navigate = useNavigate();
  const handleTipo=(e)=>{
    setTipo(e.target.value);
  }
    const handlePago=(e)=>{
        setPago(e.target.value);
    }
    const handlePersona=(e)=>{
        setPersona(e.target.value);
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(persona==='Natural'&& pago==='Contado'){
            Navigate('/contado/persona/natural');
        }
    }
    return(
        <div className=" wrapper d-flex justify-content-center align-items-center vh-100 w-100 m-auto ">
      <div className='rounder-4'>
      <div className='login-wrapper p-2 shadow-lg border-light rounded-4 border border-3 bg-gradient d-flexjustify-content-between ' style={{backgroundColor:'white'}}>
      <label className='text-danger' style={{color:'black', marginBottom:5, fontSize:60, userSelect:'none'}}><strong>¡Bienvenid@!</strong></label>
      {/*<div className='d-flex flex-row'>
      <h3>Tipo de persona: </h3>
       <end>
        <Divider/>
      <Box sx={{ minWidth: 120, marginLeft:2 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Persona</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={persona}
          label="Age"
          onChange={handlePersona}
          placeholder="--Choose One"
        >
          <MenuItem value={10}>Natural</MenuItem>
          <MenuItem value={20}>Juridica</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </end> 
    </div>*/}
    <hr style={{width:450, color:'black'}}/>
    <h3 style={{userSelect:'none'}}>Elíge el tipo de formato que desea diligenciar</h3>
    <div className='d-flex flex-row '>
      {/* <h3>Tipo de pago: </h3> */}
      
      <div className="d-flex flex-row">
              
              <Box sx={{ minWidth: 320, margin:1,color:'red' }}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">-- Formato que desea diligenciar -- </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={tipo}
                  label="tipo"
                  onChange={handleTipo}
                  variant="standard"
                  
                >
                <MenuItem value={10} onClick={(e)=>navigate('/contado/persona/natural')}><strong>Persona Natural</strong> - Pago a Contado</MenuItem>
                <MenuItem value={20} onClick={(e)=>navigate('/credito/persona/natural')}><strong>Persona Natural</strong> - Pago a Crédito</MenuItem>
                <center>
                <hr style={{width:300, color:'black'}}/></center>
                <MenuItem value={30} onClick={(e)=>navigate('/contado/persona/juridica')}><strong>Persona Jurídica</strong> - Pago a Contado</MenuItem>
                <MenuItem value={40} onClick={(e)=>navigate('/credito/persona/juridica')}><strong>Persona Jurídica</strong> - Pago a Crédito</MenuItem>
                </Select>
              </FormControl>
            </Box>
            </div>
      {/* <end>
      <Box sx={{ minWidth: 120,marginLeft:2, position:'static'  }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Pago</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pago}
          label="Age"
          onChange={handlePago}
        >
          <MenuItem value={30}>Contado</MenuItem>
          <MenuItem value={40}>Credito</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </end> */}
    </div>
{/*     <button onSubmit={handleSubmit} style={{backgroundColor:'red'}}>Diligenciar</button>
 */}    </div>
    </div>
    </div>
    )
}