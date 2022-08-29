import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Toast, ToastSeverityType } from "primereact/toast";
import { errorMessage } from "../../models/errorMessage";
import { AuthService } from "../../services/auth-service";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';



import "../Login/loginStyles.scss"
import { InputNumber } from "primereact/inputnumber";
import { RegisterPayload } from "../../models/RegisterPayload";



interface IState {
  register: RegisterPayload
}

interface IProps { }



let Registration: React.FC<IProps> = () => {


  // const [cookies, setCookie, removeCookie] = useCookies();

  // console.log(cookies.access_token);


  const navigate = useNavigate();

  const toast = useRef<Toast>(null);
  const ErrorMessage: errorMessage = { name: '', message: '' };

  // React States

  const [isSubmitted, setIsSubmitted] = useState(false);


  let [state, setState] = useState({
    register: {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      company: '',
      phone: 0
    }
  })

  let updateInput = (event: any): void => {

    setState({
      register: {
        ...state.register,
        [event.target.name]: event.target.value
      }
    });

  };

  const showDialog = (type: ToastSeverityType, summary: string, detail: string): void => {
    if (toast.current) {
      toast.current.show({ severity: type, summary: summary, detail: detail, life: 3000 });
    }
  }

  // const [cookies, setCookie] = useCookies(['access_token']);

  let register = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();



    await AuthService.register(state.register).then((res): void => {
      if (res.status == 200) {
        if (toast.current) {
          toast.current.show({ severity: 'success', summary: 'Registrovali ste ste!', detail: 'Uspješno ste obavili registraciju!', life: 3000 });
        }
        setIsSubmitted(true);
        // let expires = new Date()
        // expires.setTime(expires.getTime() + (res.data.expires_in * 1000))
        // setCookie('access_token', res.data.access_token, { path: '/',  expires});
        // console.log(res)
        setTimeout(() => navigate(`/login`), 1000);


      } else {
        if (toast.current) {
          toast.current.show({ severity: 'error', summary: 'Registracija neuspješna!', detail: 'Pokušajte ponovo!', life: 3000 });
        }
      }
    });


  }



  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={register}>
        <div className="input-container">
          <label>Email </label>
          <InputText type="text" name="email" required
            value={state.register.email}
            onChange={updateInput}
          />

        </div>
        <div className="input-container">
          <label>Lozinka </label>
          <InputText type="password" name="password" required
            value={state.register.password}
            onChange={updateInput}
          />
        </div>
        <div className="input-container">
          <label>Ime </label>
          <InputText type="text" name="firstName" required
            value={state.register.firstName}
            onChange={updateInput}
          />
        </div>
        <div className="input-container">
          <label>Prezime </label>
          <InputText type="text" name="lastName" required
            value={state.register.lastName}
            onChange={updateInput}
          />
        </div>
        <div className="input-container">
          <label>Fakultet </label>
          <InputText type="text" name="company" required
            value={state.register.company}
            onChange={updateInput}
          />
        </div>
        <div className="input-container">
          <label>Broj telefona </label>
          <InputNumber type="tel" name="phone" required
            value={state.register.phone}
            onValueChange={updateInput}
          />

        </div>


        <div className="button-container">
          <Button label="Registracija" className="p-button-raised p-button-rounded p-button-success" />
        </div>
      </form>
    </div>
  );

  useEffect((): void => {
    AuthService.checkLogin().then((res) => {
      if (res.status === 200) {
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
          <div className="title">Registracija</div>
          {isSubmitted ? <div>Registrovani ste!</div> : renderForm}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Registration;
