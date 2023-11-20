import * as LiaIcons from "react-icons/lia"
import { GoHomeFill } from 'react-icons/go'
import { GoPeople } from 'react-icons/go'
import { RiContactsBook2Fill , RiContactsBookFill} from 'react-icons/ri'
import { RiContactsBook2Line , RiContactsBookLine} from 'react-icons/ri'
import { BsFillPeopleFill } from "react-icons/bs";
import { BsClipboardCheck } from "react-icons/bs";
import { BsClipboardCheckFill } from "react-icons/bs";
import { TbCircleLetterJ } from 'react-icons/tb' /*letra j*/

export const NavBarData = [
  {
    title:'Inicio',
    path:'/inicio',
    icon:<GoHomeFill/>,
    cName:'nav-text',
    access:['admin','cartera','agencias']   
  }
  ,
  {title:'Persona natural - contado',
    path:'/contado/persona/natural',
    icon:<RiContactsBook2Fill/>,
    cName:'nav-text',
    access:['admin','cartera','agencias']
  },{
    title:'Persona natural - Crédito',
    path:'/credito/persona/natural',
    icon:<RiContactsBook2Line/>,
    cName:'nav-text',
    access:['admin','agencias','cartera']
  },
  {title:'Persona Jurídica - contado',
    path:'/contado/persona/juridica',
    icon: <RiContactsBookFill/>,
    cName:'nav-text',
    access:['admin','agencias','cartera']
  },{
    title:'Persona Jurídica - Crédito',
    path:'/credito/persona/juridica',
    icon:<RiContactsBookLine/>,
    cName:'nav-text',
    access:['admin','cartera','agencias']
  },
  {
    title: "Proveedor Mcia/ Convenio - Natural",
    path: "/proveedor/convenio/natural",
    icon: <BsFillPeopleFill />,
    cName: "nav-text",
    access: ['admin','compras']
  },
  {
    title: "Proveedor Mcia/ Convenio - Jurídico",
    path: "/proveedor/convenio/natural",
    icon: <BsFillPeopleFill />,
    cName: "nav-text",
    access: ['admin','compras']
  },
  {
    title: "Prestador de servicios",
    path: "/proveedor/convenio/natural",
    icon: <BsFillPeopleFill />,
    cName: "nav-text",
    access: ['admin','compras']
  },
  {
    title: "Proveedor vario - Natural",
    path: "/proveedor/convenio/natural",
    icon: <BsFillPeopleFill />,
    cName: "nav-text",
    access: ['admin','compras']
  },
  {
    title: "Proveedor vario - Jurídico",
    path: "/proveedor/convenio/natural",
    icon: <BsFillPeopleFill />,
    cName: "nav-text",
    access: ['admin','compras']
  },
  {
    title: "Usuarios",
    path: "/usuarios",
    icon: <BsFillPeopleFill />,
    cName: "nav-text",
    access: ['admin']
  },
  {
    title: "Clientes",
    path: "/terceros",
    icon: <BsClipboardCheck />,
    cName: "nav-text",
    access: ['admin']
  }
  
];