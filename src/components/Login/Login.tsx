import React, { useState } from "react";
import { errorMessage } from "../../models/errorMessage";
import { LoginPayload } from "../../models/loginPayload";
import { AuthService } from "../../services/auth-service";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import "./loginStyles.css";

interface IState{
  login: LoginPayload
}

interface IProps{}



let Login:React.FC<IProps> = () => {
const ErrorMessage: errorMessage = {name: '', message: ''};

  // React States
  const [errorMessages, setErrorMessages] = useState(ErrorMessage);
  const [isSubmitted, setIsSubmitted] = useState(false);


  let [state, setState] = useState({
    login: {
        username: '',
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
    console.log(state.login);


   await AuthService.login(state.login.username, state.login.password).then((res) => {
          if(res.status == 200){
            setIsSubmitted(true);
            // let expires = new Date()
            // expires.setTime(expires.getTime() + (res.data.expires_in * 1000))
            // setCookie('access_token', res.data.access_token, { path: '/',  expires});
            // console.log(res)

            

          }else{
            setErrorMessages(res.data.message);
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
          <label>Korisničko ime </label>
          <InputText type="text" name="username" required 
          value={state.login.username}
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

  return (
    <React.Fragment>
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