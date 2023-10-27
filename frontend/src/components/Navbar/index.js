import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as FiIcons from "react-icons/fi";
import * as FaIcons from "react-icons/fa";
import AuthContext from "../../context/authContext";
import useUser from "../../hooks/useUser";
import { NavBarData } from "./NavbarData";
import Logo from "../../assest/item.png";
import "./styles.css";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import React from "react";
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button, Modal } from "react-bootstrap";
import { AiFillEdit } from 'react-icons/ai'
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  justifyContent:'center',
  boxShadow: 24,
  p: 4,
  borderRadius:5
};

export default function Navbar() {
  const { isLogged, logout } = useUser();
  const [showSideBar, setShowSidebar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tipo,setTipo]=useState();
  const handleTipo=(e)=>{
    setTipo(e.target.value);
  }
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [cerrar,setCerrar]=useState(false);
    const handleOpenCerrar=()=>{
        setCerrar(true);
    }
    const handleCerrar=()=>{
        setCerrar(false);
    }
  return (
    <>
      {isLogged && (
        <div
          className="position-fixed bg-light shadow w-100"
          style={{ fontSize: 20, left: 0, height: "60px", zIndex: 2 }}
        >
          <div className="d-flex flex-row justify-content-between w-100 h-100 px-4 shadow">
            <div
              id="logo-header"
              className="d-flex flex-row align-items-center gap-2"
            >
            <span className="menu-bars m-0" style={{ cursor: "pointer"}}>
              <footer>
                <FaIcons.FaBars
                  className="text-danger"
                  onClick={(e) => setShowSidebar(!showSideBar)}
                  style={{height:90,width:30, userSelect:'none'}}
                />
                </footer>
              </span>
              <img
                src={Logo}
                width={100}
                className="navbar-img"
                onClick={(e) => navigate("/inicio")}
                unselectable="false"
                aria-invalid
                
                alt=""
                style={{ cursor: "pointer",height:55, width:220 , userSelect:'none'}}
              />
            </div>

            <div className="d-flex flex-row align-items-center">
              <div
                className="d-flex align-items-center position-relative bg-danger rounded-pill p-2 pe-4"
                style={{ right: "-20px", height: 35, userSelect:'none'}}
              >
                <span className="text-light text-nowrap m-0">{user.name}</span>
              </div>
              {/* iten con menu */} 
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                
                <IconButton
                  onClick={handleClick}
                  size="large"
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                  style={{backgroundColor:'#D92121',color:'white'}}
                >
                <FaIcons.FaUser className="w-100 h-75" />
                </IconButton>
                </Tooltip>
                </Box>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={open}
                  onClose={handleClose}
                  onClick={handleClose}
                  PaperProps={{
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <center>
                <p className="fw-bold mt-1 mb-1">
                  {user.role.toUpperCase()}
                </p>
                <hr style={{width:200, color:'black'}}/>
                <MenuItem onClick={(e)=>navigate('/change/password')}>
                  <Button style={{height:50}}>
                  <AiFillEdit/>
                  Cambiar Contraseña
                  </Button>
                </MenuItem>
                <MenuItem >
                <button onClick={(e)=>logout()}>
                  <FiIcons.FiLogOut style={{width:25, height:25}}/>
                  <label className="ms-2" style={{fontSize:15}}>Cerrar sección</label>
                </button>
                  </MenuItem>
                </center>
              </Menu>
            </div>
          </div>
          <nav
            className={showSideBar ? "bg-light nav-menu active" : "nav-menu"}
          >
            <ul
              className="nav-menu-items"
              onClick={(e) => setShowSidebar(!showSideBar)}
            >
              {NavBarData.map((item, index) => {
                if (item.access.includes(user.role)) {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
            <ul
              className="nav-menu-items"
              onClick={(e) => setShowSidebar(!showSideBar)}
            >
              <li className="text-center text-secondary">
                <span className="m-0">Gran Langostino S.A.S</span>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
