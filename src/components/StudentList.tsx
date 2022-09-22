import React, { useMemo, useRef, useState } from 'react';
import { IStudent } from '../models/IStudent';
import { StudentService } from '../services/student-service';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import CreateNewStudent from './CreateNewStudent/CreateNewStudent';
import { Toast } from 'primereact/toast';
import StudentTable from './StudentTable/StudentTable';
import { InputText } from 'primereact/inputtext';
import debounce from 'lodash.debounce';

interface IState {
    loading: boolean;
    students: IStudent[];
    errorMessage: string;

}
interface IProps { }

let StudentList: React.FC<IProps> = () => {

    const toast = useRef<Toast>(null);


    // let [state, setState] = useState<IState>({
    //     loading: false,
    //     students: [] as IStudent[],
    //     errorMessage: ''

    // });


    // useEffect( () => {
    //     setState({...state, loading: true});

    // },
    //  [])


    // let {loading, students, errorMessage} = state;


    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');

    const dialogFuncMap: any = {
        'displayBasic': setDisplayBasic,
    }

    const onClick1 = (name: any, position: any): void => {
        dialogFuncMap[`${name}`](true);
        if (position) {
            setPosition(position);
        }
    };

    const onAddStudentRef = useRef<any>();
   
   
   
   //STUDENT SEARCH
    const onSearchStudentRef = useRef<any>();

    let updateInput = (event: any): void => {

        onSearchStudentRef.current.searchString(event.target.value);

    };

    const debouncedChangeHandler = useMemo(
        () => debounce(updateInput, 200)
      , []);




    //CREATE NEW STUDENT DIALOG ONHIDE
    const onHide = async (name: any, value: boolean, student: IStudent | undefined): Promise<void> => {
        dialogFuncMap[`${name}`](false);
        if (student && value === true) {
            await StudentService.createNewStudent(student).then((res): void => {
                if (res.status === 200) {
                    if (toast.current) {
                        toast.current.show({ severity: 'success', summary: 'Student kreiran!', detail: 'Uspješno ste kreirali studenta.', life: 3000 });
                    }
                    onAddStudentRef.current?.getAlert();
                }
            })
                .catch((error) => {
                    if (toast.current) {
                        toast.current.show({ severity: 'error', summary: 'Nije bilo moguce kreirati studenta!', detail: error.message, life: 3000 });
                    }
                });

        };

    }
    
    




    return (
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
                                <InputText placeholder='Pretraga' onChange={debouncedChangeHandler} className='ml-3' />
                            </div>
                        </div>

                        <Dialog header="Novi student" visible={displayBasic} style={{ width: '50vw' }}
                            breakpoints={{ '1360px': '75vw', '940px': '100vw' }}
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