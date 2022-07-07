//import react dan route
import React, { useState,useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import {NavLink,Link} from 'react-router-dom';
import axios from 'axios';
import { confirmAlert } from 'react-confirm-alert';
import "react-confirm-alert/src/react-confirm-alert.css";


//import icons
import * as IoIcons from 'react-icons/io';
import * as AiIcons from 'react-icons/ai';

//import sidebar
import { SidebarData,SidebarAdmin,logout,SidebarPasien }from './sidebar';

//import css
import '../App.css';



function Navbar() {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const [role,setRole] = useState('');
    const [nama,setNama] = useState('');
    const history = useHistory();
    const Id = localStorage.getItem('id')

    const getRoles = () => {
        axios.get(`http://localhost:3000/user/${Id}`)
        .then(res => {
            setRole(res.data.role);
            setNama(res.data.nama_awal)
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        getRoles();
    },[])

    const Logout = () => {
        confirmAlert({
            title: 'Logout',
            message: 'Apakah anda yakin akan keluar?',
            buttons: [
              {
                label: 'Ya',
                onClick: () => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('name');
                    history.push('/');
                    }
              },
              {
                label: 'Tidak'
              }
            ]
          });
    }
    return(
    <div>
            {/* sidebar */}
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items'>
                    {SidebarData.map((item, index) => {
                        return(
                            <div className='nav-items'>
                                <li key={index} className={item.cName}>
                                    <NavLink to={item.path} activeClassName='is-active'>
                                    <div className='icon'>
                                            {item.icon}
                                            {item.title}
                                    </div>
                                    </NavLink> 
                                </li>
                            </div>
                        )
                    })}

                    

                    {role === 'admin'|| role === 'perawat' ? SidebarAdmin.map((item, index) => {
                        return(
                            <div className='nav-items'>
                                <li key={index} className={item.cName} >
                                    <NavLink to={item.path} activeClassName='is-active'>
                                        <div className='icon'>
                                            {item.icon}
                                            {item.title}
                                        </div>
                                    </NavLink>
                                </li>
                            </div>
                        )
                    }) : null} 

                    {logout.map((item, index) => {
                        return(
                            <div className='nav-items'>
                                <li key={index} className={item.cName}>
                                    <Link onClick={Logout}>
                                        <div className='icon'>
                                            {item.icon}
                                            {item.title}
                                        </div>
                                    </Link>
                                </li>
                            </div>
                        )
                    })}




                </ul>

            </nav>
        </div>

    );
}

export default Navbar;