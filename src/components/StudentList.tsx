import React, { useEffect, useRef, useState } from 'react';
import {Link} from 'react-router-dom';
import { IStudent } from '../models/IStudent';
import { StudentService } from '../services/student-service';
import { Dialog } from 'primereact/dialog';
import {Button} from 'primereact/button';
import CreateNewStudent from './CreateNewStudent/CreateNewStudent';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import StudentTable from './StudentTable';
import { Query } from '../models/Query';

interface IState{
    loading: boolean;
    students: IStudent[];
    errorMessage: string;
    first: number;
    rows: number;
    totalRecords: number;
    query: Query
}
interface IProps{}

let StudentList:React.FC<IProps> = () => {
    const toast = useRef<Toast>(null);


    let [state, setState] = useState<IState>({
        loading: false,
        students: [] as IStudent[],
        errorMessage: '',
        first: 0,
         rows: 5,
    totalRecords: 10,
    query : {
        page: 0,
        limit: 5
    }
        
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
                    
                        

                    StudentService.getAllStudents(state.query).then( (response) => {
                        setState({
                            ...state,
                            loading: true,
                            students: response.data
                        });
                   
                    }).catch( (error) => {
                        setState({
                            ...state,
                            loading: false,
                            errorMessage: error.message
                        })
                        
                        
                   
                    });
    
                }
            });
       }
    }

    


    return(
        <React.Fragment>
<Toast ref={toast} />
<div className="container">
    <div className="row">
        <div className="col">
            <p className="h3 mt-3 fw-bold text-success">Svi studenti</p>
            
            <Button className='mt-1 mb-1' label="Novi student" icon="pi pi-plus" onClick={() => onClick1('displayBasic', position)} />

<Dialog header="Novi student" visible={displayBasic} style={{ width: '50vw' }} 
breakpoints={{'960px': '75vw', '740px': '100vw'}}
 onHide={() => onHide('displayBasic', false, undefined)}>
    <CreateNewStudent onHide={onHide} />
</Dialog>
        </div>
    </div>
</div>


<div>
    <div className="container">
            <div className="card">
                <StudentTable onAddStudent={onAddStudentRef} />
            </div>
        </div>
        </div>

    
        </React.Fragment>
    )

};

export default StudentList;