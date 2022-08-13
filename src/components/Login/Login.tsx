import React, { useEffect, useRef, useState } from "react";
import { errorMessage } from "../../models/errorMessage";
import { LoginPayload } from "../../models/loginPayload";
import { AuthService } from "../../services/auth-service";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import "./loginStyles.css";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface IState{
  login: LoginPayload
}

interface IProps{
 
}



let Login:React.FC<IProps> = () => {


  // const [cookies, setCookie, removeCookie] = useCookies();

  // console.log(cookies.access_token);


  const navigate = useNavigate();

  const toast = useRef<Toast>(null);
const ErrorMessage: errorMessage = {name: '', message: ''};

  // React States
  const [errorMessages, setErrorMessages] = useState(ErrorMessage);
  const [isSubmitted, setIsSubmitted] = useState(false);


  let [state, setState] = useState({
    login: {
        email: '',
        password: ''
    }
})

let updateInput = (event:React.ChangeEvent<HTMLInputElement>): void => {
    
   setState({
   login: { ...state.login,
    [event.target.name]: event.target.value
}
});
    
}

// const [cookies, setCookie] = useCookies(['access_token']);

let login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(!state.login.email || !state.login.password){
      if(toast.current){
        toast.current.show({severity:'error', summary: 'Unesite podatke!', detail:'Niste unijeli email i lozinku.', life: 3000});
      }
      return;
    }
    


   await AuthService.login(state.login.email, state.login.password).then((res) => {
          if(res.status == 200){
            if(toast.current){
              toast.current.show({severity:'success', summary: 'Prijavljeni ste!', detail:'Uspješno ste se prijavili!', life: 3000});
            }
            setIsSubmitted(true);
            // let expires = new Date()
            // expires.setTime(expires.getTime() + (res.data.expires_in * 1000))
            // setCookie('access_token', res.data.access_token, { path: '/',  expires});
            // console.log(res)
            setTimeout(() => navigate(`/`), 1000);
            

          }else{
            if(toast.current){
              toast.current.show({severity:'error', summary: 'Prijava neuspješna!', detail:'Pokušajte ponovo!', life: 3000});
            }
          }
        });


}

  const errors = {
    username: "invalid username",
    password: "invalid password"
  };

  

  // Generate JSX code for error message
  const renderErrorMessage = (name: errorMessage) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={login}>
        <div className="input-container">
          <label>Email </label>
          <InputText type="text" name="email" required 
          value={state.login.email}
          onChange={updateInput}
          />
          {renderErrorMessage({name: 'username', message: errors.username})}
        </div>
        <div className="input-container">
          <label>Lozinka </label>
          <InputText type="password" name="password" required 
          value={state.login.password}
          onChange={updateInput}
          />
          {renderErrorMessage({name: 'password', message: errors.password})}
        </div>
        <div className="button-container">
        <Button label="Prijava" className="p-button-raised p-button-rounded p-button-success" />
        </div>
      </form>
    </div>
  );

  useEffect( ()=> {
     AuthService.checkLogin().then((res) => {
      if(res.status === 200){
        setIsSubmitted(true);
        setTimeout(() => navigate(`/`), 1000);
      }


    })
  }, []);




  return (
    <React.Fragment>
      <Toast ref={toast} />
    <div className="app">
      <div className="login-form">
        <div className="title">Prijava</div>
        {isSubmitted ? <div>Prijavljeni ste!</div> : renderForm}
      </div>
    </div>
    </React.Fragment>
  );
}

export default Login;