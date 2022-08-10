import React, { useReducer, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import carsfile from "./cars-small.json";
import { IStudent } from "../models/IStudent";
import { StudentService } from "../services/student-service";
import { Query } from "../models/Query";

const init: any = (initialState: any) => initialState;

interface IState{
    loading: boolean;
    students: IStudent[];
    errorMessage: string;
    first: number;
    rows: number;
    totalRecords: number;
    query: Query;
}
interface IProps{}

//OJO: action deconstruido automaticamente en type y payload
const reducer = (state: any, { type, payload }: any) => {
  switch (type) {
    case "onPage":
        state.query.page = payload.page;
        
      return { ...state, loading: true, first: payload.first };
    case "dataLoaded":
      return { ...state, results: payload, loading: false };
    default:
      throw new Error();
  }
};

 const StudentTable:React.FC<IProps> = () => {
  
    const initialState = {
    results: [],
    loading: true,
    first: 0,
    rows: 5,
    totalRecords: 10,
    query: {
        page: 0,
        limit: 5
    }
  };





  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { results, loading, rows, first, totalRecords } = state;

  useEffect( () => {
    if (loading) {
      
        const startIndex = first;
        const endIndex = first + rows;
        //Simulamos la peticion de datos páginada a un backend
        let data: IStudent[] = [];
        StudentService.getAllStudents(state.query).then((response) => {
            data = response.data.data;
            state.totalRecords = response.data.totalRecords;
        }).then(() => {
            dispatch({ type: "dataLoaded", payload: data });
        }).catch((err) => {
            console.log(err);
        })
        

        
    
      //Simulamos el tiempo que tardaria en reaccionar el backend
    }
    //Modificar estas variables son las lanzan la funcion useEffect
  }, [loading, first, rows]);

  return (
    <React.Fragment>
    <div>
      <DataTable
        value={results}
        paginator
        alwaysShowPaginator={true}
        rows={rows}
        totalRecords={totalRecords}
        lazy
        first={first}
        onPage={e => dispatch({ type: "onPage", payload: e })}
        loading={loading}
        
      >
        <Column field="firstName" header="Ime"></Column>
                    <Column field="lastName" header="Prezime"></Column>
                    <Column field="email" header="Email"></Column>
                    <Column field="indexNumber" header="Broj indeksa"></Column>
                    <Column field="studentStatus" header="Status studenta"></Column>
                    <Column field="phone" header="Telefon"></Column>
      </DataTable>
    </div>
    </React.Fragment>
  );
};

export default StudentTable;
