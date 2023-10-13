import * as LiaIcons from "react-icons/lia"
import { GoHomeFill } from 'react-icons/go'
import { GoPeople } from 'react-icons/go'
import { RiContactsBook2Fill , RiContactsBookFill} from 'react-icons/ri'
import { RiContactsBook2Line , RiContactsBookLine} from 'react-icons/ri'
import { TbCircleLetterJ } from 'react-icons/tb' /*letra j*/

export const NavBarData = [
  {
    title:'Inicio',
    path:'/inicio',
    icon:<GoHomeFill/>,
    /* icon: <MdIcons.MdOutlineInventory />, */
    cName:'nav-text',
    access:['admin','usuario']
    
  }
  ,
  {title:'Persona natural - contado',
    path:'/contado/persona/natural',
    icon:<RiContactsBook2Fill/>,
    cName:'nav-text',
    access:['admin','usuario']
  },{
    title:'Persona natural - Crédito',
    path:'/credito/persona/natural',
    icon:<RiContactsBook2Line/>,
    cName:'nav-text',
    access:['admin','usuario']
  },
  {title:'Persona Jurídica - contado',
    path:'/contado/persona/juridica',
    icon: <RiContactsBookFill/>,
    cName:'nav-text',
    access:['admin','usuario']
  },{
    title:'Persona Jurídica - Crédito',
    path:'/credito/persona/juridica',
    icon:<RiContactsBookLine/>,
    cName:'nav-text',
    access:['admin','usuario']
  },
  {
    title: "Usuarios",
    path: "/usuarios",
    icon: <GoPeople />,
    cName: "nav-text",
    access: ['admin']
  },
  {
    title: "Terceros",
    path: "/pos/clientes",
    icon: <LiaIcons.LiaUsersSolid />,
    cName: "nav-text",
    access: ['admin']
  }
];