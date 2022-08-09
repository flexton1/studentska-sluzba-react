import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useState } from 'react';
import { StudentService } from '../../services/student-service';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';


import "./CreateNewStudent.css";

interface IState{}
interface IProps{
  onHide: any
}

let CreateNewStudent:React.FC<IProps> = ({onHide}) => {


  

    let [state, setState] = useState({
        createNewStudent: {
            firstName: '',
            lastName: '',
            indexNumber: '',
            year: 0,
            email: '',
            phone: 0,
            studentStatus: 0

        }
    })
    
    let updateInput = (event: any): void => {
        
       setState({
       createNewStudent: { ...state.createNewStudent,
        [event.target.name]: event.target.value
    }
    });
        
    }

    let createNewStudent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(state.createNewStudent);


    
    
       await StudentService.createNewStudent(state.createNewStudent).then((res: any) => {
              if(res.data.message == 'Student created!'){
                // setIsSubmitted(true);
                // let expires = new Date()
                // expires.setTime(expires.getTime() + (res.data.expires_in * 1000))
                // setCookie('access_token', res.data.access_token, { path: '/',  expires});
                // console.log(res)
    
                
    
              }else{
                // setErrorMessages(res.data.message);
              }
            }); 
    
    }

    const statusSelectItems = [
      {label: 'Redovan', value: 1},
      {label: 'Vanredan', value: 2}
    
  ];
    



    return(
        <React.Fragment>


<form onSubmit={createNewStudent}>
        <div className="input-container">
          <label>Ime</label>
          <InputText type="text" name="firstName" required 
          value={state.createNewStudent.firstName}
          onChange={updateInput}
          />
          
        </div>
        <div className="input-container">
          <label>Prezime </label>
          <InputText type="text" name="lastName" required 
          value={state.createNewStudent.lastName}
          onChange={updateInput}
          />
          
        </div>
        <div className="input-container">
          <label>Email </label>
          <InputText type="text" name="email" required 
          value={state.createNewStudent.email}
          onChange={updateInput}
          />
          
        </div>
        <div className="input-container">
          <label>Broj indeksa</label>
          <InputText type="text" name="indexNumber" required 
          value={state.createNewStudent.indexNumber}
          onChange={updateInput}
          />
          
        </div>
        <div className="input-container">
          <label>Godina</label>
          <InputNumber type="tel" min={0} name="year" required 
          value={state.createNewStudent.year}
          onValueChange={updateInput}
          />
          
        </div>
        <div className="input-container">
          <label>Broj telefona</label>
          <InputNumber type="tel" min={0} name="phone" required 
          value={state.createNewStudent.phone}
          onValueChange={updateInput}
          
          />
          
        </div>

        <div className="input-container">
          <label>Status studenta</label>
          <Dropdown name="studentStatus" value={state.createNewStudent.studentStatus}
           options={statusSelectItems} placeholder="Odaberite status" onChange={updateInput}/>
          
        </div>
        {/* <div className="button-container">
        <Button label="Prijava" className="p-button-raised p-button-rounded p-button-success" />
        </div> */}
      </form>

      <div className='text-right'>
                <Button label="Odustani" icon="pi pi-times" onClick={() => onHide('displayBasic', false, state.createNewStudent)} className="p-button-text" />
                <Button label="Kreiraj" icon="pi pi-check" onClick={() => onHide('displayBasic', true, state.createNewStudent)} />
            </div>
        </React.Fragment>
    )
};

export default CreateNewStudent;