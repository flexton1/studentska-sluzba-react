import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface IState{}
interface IProps{}

let Navbar:React.FC<IProps> = () => {

    

    return(
        <React.Fragment>

        <nav className="navbar navbar-dark bg-dark navbar-expand-sm navbar-toggleable-md">
        
            <div className="container">
                <Link to={'/'} className="navbar-brand">Studentska sluzba</Link>
                <button className="navbar-toggler navbar-toggler-right" type="button" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>

                <div className="collapse navbar-collapse">
                <ul className='navbar-nav d-flex align-items-right'>
                    <li className='nav-item'>
                        <Link to={'/registracija'} className='nav-link'>Registracija</Link>
                    </li>
                    <li className='nav-item'>
                        <Link to={'/login'} className='nav-link'>Prijava</Link>
                    </li>
                
                </ul>

                {/* { isExpanded ? <div className="collapse" id="navbarToggleExternalContent">
      <div className="bg-dark p-4">
      <h4 className="text-white">Collapsed content</h4>
      <span className="text-muted">Toggleable via the navbar brand.</span>
    </div>
  </div> : null} */}
            
                

                </div>
                

            </div>
        </nav>




        </React.Fragment>
    )

};

export default Navbar;