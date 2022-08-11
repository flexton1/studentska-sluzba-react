import React, { useReducer, useEffect, useImperativeHandle, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import carsfile from "./cars-small.json";
import { IStudent } from "../models/IStudent";
import { StudentService } from "../services/student-service";
import { Query } from "../models/Query";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { StudentStatusEnum } from "./Enums/StudentStatusEnum";
import { idText } from "typescript";
import { Toast, ToastSeverityType } from "primereact/toast";

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
interface IProps{
    onAddStudent: any
}

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

 const StudentTable:React.FC<IProps> = ({onAddStudent}) => {
  
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


const toast = useRef<Toast>(null);
const showDialog = (type: ToastSeverityType, summary: string, detail: string) => {
  if(toast.current){
    toast.current.show({severity: type, summary: summary, detail: detail, life: 3000});
    }
}


  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { results, loading, rows, first, totalRecords } = state;

  useEffect( () => {
    if (loading) {
      
        const startIndex = first;
        const endIndex = first + rows;
        loadData();
    } 
  }, [loading, first, rows]);


  const loadData = () => {
    let data: IStudent[] = [];
        StudentService.getAllStudents(state.query).then((response) => {
           if(response.status === 200){
          data = response.data.data;
            state.totalRecords = response.data.totalRecords;
           }else {
              showDialog('error', 'Podaci nisu učitani!', 'Greška veze sa serverom!')
           }
        }).then(() => {
            dispatch({ type: "dataLoaded", payload: data });
        }).catch((err) => {
            console.log(err);
        });
  }

  const updateStudent = (student: IStudent) => {
    StudentService.updateStudent(student).then((response) => {
        if(response.status === 200){
            showDialog('success', 'Student ažuriran!', 'Uspješno ste ažurirali studenta.')
          loadData();
        }else{
            showDialog('error', 'Student nije ažuriran!', 'Niste uspijeli ažurirati studenta.')
        }
    })

  }


  useImperativeHandle(onAddStudent, () => ({

    getAlert() {
      loadData();
    }

  }));

  const textEditor = (options: any) => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
}

const numberEditor = (options: any) => {
  return <InputNumber type="tel" value={options.value} onChange={(e) => options.editorCallback(e.value)} />;
}

const statusBodyStyle = (rowData: IStudent): string => {
  
  if(rowData.studentStatus === StudentStatusEnum.Redovan){
    return 'Redovan';
  }else if(rowData.studentStatus === StudentStatusEnum.Vanredan){
    return 'Vanredan';
  }else{
    return 'Nepoznato';
  }

}

const onRowEditComplete = (e: any) => {
  
  if(e.newData){
    updateStudent(e.newData);
  }


}
  

  return (
    <React.Fragment>
      <Toast ref={toast} />
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
        dataKey="_id"
        editMode="row"
        onRowEditComplete={onRowEditComplete}
        
      >
                    <Column field="firstName" editor={(options) => textEditor(options)} header="Ime"></Column>
                    <Column field="lastName" editor={(options) => textEditor(options)} header="Prezime"></Column>
                    <Column field="email" editor={(options) => textEditor(options)} header="Email"></Column>
                    <Column field="indexNumber" header="Broj indeksa"></Column>
                    <Column field="studentStatus" body={statusBodyStyle} header="Status studenta"></Column>
                    <Column field="phone" editor={(options) => numberEditor(options)}  header="Telefon"></Column>
                    <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
      </DataTable>
    </div>
    </React.Fragment>
  );
};

export default StudentTable;
