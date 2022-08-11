import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React, { useRef, useState } from 'react';
import { StudentService } from '../../services/student-service';
import { InputNumber } from 'primereact/inputnumber';
import { Dropdown } from 'primereact/dropdown';


import "./CreateNewStudent.css";
import { Toast } from 'primereact/toast';
import { IStudent } from '../../models/IStudent';
import { StudentStatusEnum } from '../Enums/StudentStatusEnum';

interface IState{}
interface IProps{
  onHide: any
}

let CreateNewStudent:React.FC<IProps> = ({onHide}) => {


  const toast = useRef<Toast>(null);

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
        
    };

    const validateForm = (value: IStudent) => {

      if(!value.email || !value.firstName || !value.indexNumber || !value.lastName
        || !value.phone || !value.studentStatus || !value.year)
        {
          if(toast.current){
            toast.current.show({severity:'error', summary: 'Sva polja su obavezna', detail:'Unesite vrijednost u sva polja!', life: 3000});
            }
            return;
        }else{
          onHide('displayBasic', true, state.createNewStudent);
        }



    };

  

    const statusSelectItems = [
      {label: 'Redovan', value: StudentStatusEnum.Redovan},
      {label: 'Vanredan', value: StudentStatusEnum.Vanredan}
    
  ];
    
  


    return(
        <React.Fragment>

<Toast ref={toast} />
<form>
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
                <Button label="Odustani" icon="pi pi-times" onClick={() => onHide('displayBasic', false, null)} className="p-button-text mr-4" />
                <Button label="Kreiraj" icon="pi pi-check" onClick={() => validateForm(state.createNewStudent)} className='ml-3' />
            </div>
        </React.Fragment>
    )
};

export default CreateNewStudent;