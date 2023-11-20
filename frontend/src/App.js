import './App.css';
import { BrowserRouter as Router, Routes,Route,Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContextProvider } from './context/authContext';
import Login from '../src/pages/Login/login'
import Navbar from './components/Navbar';
import RecoveryPassword from './pages/RecoveryPassword';
import SendRecovery from './pages/SendRecoveryPassword'
import Page404 from './pages/Page404'
import ChangePassword from './pages/ChangePassword'
import Inicio from './pages/inicio';
import Inicio2 from './pages/inicio2';
import TipoPersona from './pages/tipoPersona';
import Tipo from './pages/tipo';
import ConvenioNatural from './pages/convenioNatural';
import ContadoPersonaNatural from './pages/contadoPN';
import React, { Component } from "react";
import PrivateRoute from '../src/components/PrivateRoute';
import ContadoPersonaJuridica from './pages/contadoPJ';
import CreditoPersonaNatural from './pages/creditoPN';
import CreditoPersonaJuridica from './pages/creditoPJ';
import Users from './pages/Users';
import Terceros from './pages/terceros';


function App() {
  return(
    <AuthContextProvider>
    <Router>
      <Navbar/>
      <div id='wrapper' className="d-flex vh-100 bg-gradient">
      <Routes>
        <Route path='/' element={<Navigate to='/login'/>}/>
        <Route path='/login' element={<Login/>}/>
{/*         <Route path='/recovery/password' element={<RecoveryPassword/>}/>
 */}        <Route path='/send/recovery' element={<SendRecovery/>}/>
        <Route path='/recuperacion/contrasena//:token' element={<RecoveryPassword/>} />

        {/* Inicios dependiendo del usuario */}
        <Route path='/inicio' element={<PrivateRoute component={Inicio}/>}/>
        <Route path='/compras' element={<PrivateRoute component={Inicio2}/>}/>

        {/* ruta 1 */}
        <Route path='/tipo/persona' element={<PrivateRoute component={TipoPersona}/>}/>
        <Route path='/proveedor/convenio/natural' element={<PrivateRoute component={ConvenioNatural}/>}/>

        {/* ruta 2 */}
        <Route path='/tipopersona' element={<PrivateRoute component={Tipo}/>}/>

        <Route path='/contado/persona/natural' element={<PrivateRoute component={ContadoPersonaNatural}/>}/>
        <Route path='/contado/persona/juridica' element={<PrivateRoute component={ContadoPersonaJuridica}/>}/>
        <Route path='/credito/persona/natural' element={<PrivateRoute component={CreditoPersonaNatural}/>}/>
        <Route path='/credito/persona/juridica' element={<PrivateRoute component={CreditoPersonaJuridica}/>}/>
        <Route path='/change/password' element={<PrivateRoute component={ChangePassword}/>}/>
        <Route path='/usuarios' element={<PrivateRoute component={Users}/>}/>
        <Route path='/terceros' element={<PrivateRoute component={Terceros}/>}/>
        <Route path='*' element={<Page404/>}/>

      </Routes>
      </div>
    </Router>
  </AuthContextProvider>
);
}

export default App;
