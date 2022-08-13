import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import { IStudent } from '../models/IStudent';
import { StudentService } from '../services/student-service';
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button';
import CreateNewStudent from './CreateNewStudent/CreateNewStudent';
import { confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import StudentTable from './StudentTable/StudentTable';
import { Query } from '../models/Query';
import { InputText } from 'primereact/inputtext';

interface IState{
    loading: boolean;
    students: IStudent[];
    errorMessage: string;
   
}
interface IProps{}

let StudentList:React.FC<IProps> = () => {
    const toast = useRef<Toast>(null);


    let [state, setState] = useState<IState>({
        loading: false,
        students: [] as IStudent[],
        errorMessage: ''
        
    });


    useEffect( () => {
        setState({...state, loading: true});
       
    },
     [])


    let {loading, students, errorMessage} = state;


    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap: any = {
        'displayBasic': setDisplayBasic,
    }
    
    const onClick1 = (name: any, position: any) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    };

    const onAddStudentRef = useRef<any>();
    const onSearchStudentRef = useRef<any>();

    const onHide = async (name: any, value: boolean, student: IStudent | undefined) => {
        dialogFuncMap[`${name}`](false);
        if(student && value === true){
        await StudentService.createNewStudent(student).then((res) => {
            if(res.status === 200){
                if(toast.current){
                toast.current.show({severity:'success', summary: 'Student kreiran!', detail:'Uspješno ste kreirali studenta.', life: 3000});
                }
                onAddStudentRef.current?.getAlert();
            }
        })
        .catch( (error) => { 
            if(toast.current){
                toast.current.show({severity:'error', summary: 'Nije bilo moguce kreirati studenta!', detail: error.message, life: 3000});
                }
        });
        
    };

    }

    // DELETE CONFIRMATION
    const confirm = (id: string | undefined) => {
        confirmDialog({
            message: 'Ovim brišete studenta iz baze podataka!',
            header: 'Potvrda',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Nastavi',
            rejectLabel: 'Odustani',
            accept: () => acceptFunc(id),
            reject: () => {}
        });
    }

    const acceptFunc = async (id: string | undefined) => {
       if(id){
            await StudentService.deleteStudent(id).then((res) => {
                if(res.status === 200){
                    if(toast.current){
                        toast.current.show({severity:'warn', summary: 'Student obrisan!', detail:'Uspješno ste obrisali studenta.', life: 3000});
                        }
                        
                        onAddStudentRef.current?.getAlert();
                }
            });
       }
    }

    let updateInput = (event: any): void => {

        onSearchStudentRef.current.searchString(event.target.value);
        
     };


    return(
        <React.Fragment>
<Toast ref={toast} />
<div className="container">
    <div className="row">
        <div className="col">
            <p className="h3 mt-3 fw-bold text-success">Svi studenti</p>
            <div className='d-inline-flex justify-content-between bd-highlight align-items-center'>
            <div className="p-2 flex-fill bd-highlight">
            <Button className='mt-1 mb-1 pr-3' label="Novi student" icon="pi pi-plus" onClick={() => onClick1('displayBasic', position)} />
            </div>
            <div className="p-2 flex-fill bd-highlight">
            <InputText placeholder='Search students' onChange={updateInput} className='ml-3' />
            </div>
            </div>

<Dialog header="Novi student" visible={displayBasic} style={{ width: '50vw' }} 
breakpoints={{'1360px': '75vw', '940px': '100vw'}}
 onHide={() => onHide('displayBasic', false, undefined)}>
    <CreateNewStudent onHide={onHide} />
</Dialog>
        </div>
    </div>
</div>


<div>
    <div className="container-fluid mt-2">
            <div className="card">
                <StudentTable onAddStudent={onAddStudentRef} onSearchStudentRef={onSearchStudentRef} />
            </div>
        </div>
        </div>

    
        </React.Fragment>
    )

};

export default StudentList;