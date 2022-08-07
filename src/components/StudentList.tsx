import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { IStudent } from '../models/IStudent';
import { StudentService } from '../services/student-service';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

interface IState{
    loading: boolean;
    students: IStudent[];
    errorMessage: string;
}
interface IProps{}

let StudentList:React.FC<IProps> = () => {

    let [state, setState] = useState<IState>({
        loading: false,
        students: [] as IStudent[],
        errorMessage: ''
    });


    useEffect( () => {
        setState({...state, loading: true});
        StudentService.getAllStudents().then( (response) => {
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
            
            
       
        })
    },
     [])


    let {loading, students, errorMessage} = state;


    return(
        <React.Fragment>

<div className="container">
    <div className="row">
        <div className="col">
            <p className="h3 mt-3 fw-bold text-success">Svi studenti</p>
        </div>
    </div>
</div>

<div className="container">
    <div className="row">
        <div className="col">
            <table className='table table-hover text-center table-striped'>
                <thead className="bg-success text-white">
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>
                        <th>Broj indeksa</th>
                        <th>Status studenta</th>
                        <th>Broj telefona</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        
                        
                        students.length > 0 && students.map(student => {
                                return(
                            <tr key={student._id}>
                                <td>{student.firstName}</td>
                            
                                <td>{student.lastName}</td>
                                <td>
                                    <Link to={`/studenti/${student._id}`} className='text-decoration-none text-success fw-bold'>{student.email}</Link>
                                    </td>
                                <td>{student.indexNumber}</td>
                                <td>{student.studentStatus}</td>
                                <td>{student.phone}</td>
                            </tr>

                                )

                        })

                        

                    }
                </tbody>
            </table>
        </div>
    </div>
</div>

<div>
    {/* <div className="container">
            <div className="card">
                <DataTable value={students} responsiveLayout="scroll">
                    <Column field="firstName" header="Ime"></Column>
                    <Column field="lastName" header="Prezime"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="indexNumber" header="Broj indeksa"></Column>
                    <Column field="studentStatus" header="Status studenta"></Column>
                    <Column field="phone" header="Telefon"></Column>
                </DataTable>
            </div>
        </div> */}
        </div>

        </React.Fragment>
    )

};

export default StudentList;