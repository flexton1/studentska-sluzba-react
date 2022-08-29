import React, { useEffect, useImperativeHandle, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthService } from '../services/auth-service';

interface IState { }
interface IProps {

}

let Navbar: React.FC<IProps> = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    const checkLogin = async (): Promise<void> => {
        await AuthService.checkLogin().then((res: any) => {
            if (res.status === 200 && res.data == 'Token valid!') {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        },(err) => {
               setIsLoggedIn(false);
            
        })
    };

    useEffect((): any => {
        setInterval(() => {
            checkLogin();
          }, 5000);

          return () => {
            
          }
    }, []);

    const logout = async (): Promise<void> => {

        await AuthService.logout().then((res) => {
            if (res.status === 200) {
                
                setTimeout(() => navigate(`/login`), 100);
            }

            checkLogin();
        }, (err) => {
            checkLogin();
        })


    }




    return (
        <React.Fragment>

            <nav className="navbar navbar-dark bg-dark navbar-expand-sm navbar-toggleable-md">

                <div className="container">
                    <Link to={'/'} className="navbar-brand">Studentska sluzba</Link>
                    <button className="navbar-toggler navbar-toggler-right" type="button" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse">
                        {!isLoggedIn ? <ul className='navbar-nav d-flex align-items-right'>
                            <li className='nav-item'>
                                <Link to={'/registracija'} className='nav-link'>Registracija</Link>
                            </li>
                            <li className='nav-item'>
                                <Link to={'/login'} className='nav-link'>Prijava</Link>
                            </li>

                        </ul> :
                            <ul className='navbar-nav d-flex align-items-right'>
                                <li className='nav-item'>
                                    <span onClick={logout} className='nav-link odjava-button'>Odjava</span>
                                </li>
                            </ul>}

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