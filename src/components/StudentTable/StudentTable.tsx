import React, { useReducer, useEffect, useImperativeHandle, useRef, ReactElement, useState } from "react";
import { DataTable, DataTableSortOrderType } from "primereact/datatable";
import { Column } from "primereact/column";
import { IStudent } from "../../models/IStudent";
import { StudentService } from "../../services/student-service";
import { Query } from "../../models/Query";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { StudentStatusEnum } from "../Enums/StudentStatusEnum";
import { Toast, ToastSeverityType } from "primereact/toast";

import "./StudentTable.scss";
import { Dropdown } from "primereact/dropdown";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const init: any = (initialState: IState) => initialState;

interface IState {
  results: IStudent[]
  loading: boolean;
  students: IStudent[];
  errorMessage: string;
  first: number;
  rows: number;
  totalRecords: number;
  query: Query;
  sortOrder: DataTableSortOrderType;
}
interface IProps {
  onAddStudent: any;
  onSearchStudentRef: any;
}

//OJO: action deconstruido automaticamente en type y payload
const reducer = (state: IState, { type, payload }: string | any) => {

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

const StudentTable: React.FC<IProps> = ({ onAddStudent, onSearchStudentRef }) => {

  const initialState = {
    results: [] as IStudent[],
    loading: true,
    first: 0,
    rows: 5,
    totalRecords: 10,
    query: {
      page: 0,
      limit: 5,
      filter_string: '',
      sort_column: 'indexNumber',
      sort_order: 1
    },
    sortOrder: 1
  };


  const toast = useRef<Toast>(null);

  const showDialog = (type: ToastSeverityType, summary: string, detail: string): void => {
    if (toast.current) {
      toast.current.show({ severity: type, summary: summary, detail: detail, life: 3000 });
    }
  }


  const [state, dispatch] = useReducer(reducer, initialState, init);
  const { results, loading, rows, first, totalRecords } = state;

  useEffect((): void => {

    loadData();

  }, [loading, first, rows]);


  const loadData = (): void => {

    let data: IStudent[] = [];
    StudentService.getAllStudents(state.query).then((response): void => {
      if (response.status === 200) {
        data = response.data.data;
        state.totalRecords = response.data.totalRecords;
      } else {
        showDialog('error', 'Podaci nisu učitani!', 'Greška veze sa serverom!')
      }
    }).then((): void => {
      dispatch({ type: "dataLoaded", payload: data });
    })
  }

  const updateStudent = (student: IStudent): void => {
    StudentService.updateStudent(student).then((response): void => {
      if (response.status === 200) {
        showDialog('success', 'Student ažuriran!', 'Uspješno ste ažurirali studenta.')
        loadData();
      } else {
        showDialog('error', 'Student nije ažuriran!', 'Niste uspijeli ažurirati studenta.')
      }
    }).catch((err): void => {
      showDialog('error', 'Greška!', err);
    });

  }


  useImperativeHandle(onAddStudent, () => ({

    getAlert(): void {
      loadData();
    }

  }));

  useImperativeHandle(onSearchStudentRef, () => ({

    searchString(filter_string: string): void {
      state.query.filter_string = filter_string;
      state.query.page = 0;

      loadData();

    }

  }));

  const textEditor = (options: any): ReactElement => {
    return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
  }

  const numberEditor = (options: any): ReactElement => {
    return <InputNumber type="tel"
      allowEmpty={false}
      useGrouping={false} value={options.value} onChange={(e) => options.editorCallback(e.value)} />;
  }

  const selectEditor = (options: any): ReactElement => {
    const citySelectItems = [
      { label: 'Redovan', value: StudentStatusEnum.Redovan },
      { label: 'Vanredan', value: StudentStatusEnum.Vanredan },
    ];

    return <Dropdown value={options.value} options={citySelectItems} onChange={(e) => options.editorCallback(e.value)} placeholder="Nepoznato" />;
  }


  const statusBodyStyle = (rowData: IStudent): string => {

    if (rowData.studentStatus === StudentStatusEnum.Redovan) {
      return 'Redovan';
    } else if (rowData.studentStatus === StudentStatusEnum.Vanredan) {
      return 'Vanredan';
    } else {
      return 'Nepoznato';
    }

  }

  const onRowEditComplete = (e: any): void => {

    if (e.newData) {
      updateStudent(e.newData);
    }


  }

  const onSortChange = (event: any) => {
    console.log(event);
    state.query.sort_column = event.sortField;
    state.sortOrder = event.sortOrder;
    state.query.sort_order = event.sortOrder;
    loadData();
  }

  const rowEditorTemplate = (rowData: any, props: any) => {
    const rowEditor = props.rowEditor;
    if (rowEditor.editing) {
      return rowEditor.element; // default element
    }
    else {
      // custom init element

      return (
        <div>
          <button type="button" onClick={rowEditor.onInitClick} className={rowEditor.initClassName}>
            <span className='p-row-editor-init-icon pi pi-fw pi-pencil p-clickable'></span>
          </button>
          <button type="button" onClick={() => confirm(rowData._id)} className={rowEditor.initClassName}>
            <span className='p-row-editor-init-icon pi pi-fw pi-trash p-clickable'></span>
          </button>

        </div>
      )
    }
  }


  // DELETE CONFIRMATION
  const confirm = (id: string | undefined): any => {
    confirmDialog({
      message: 'Ovim brišete studenta iz baze podataka!',
      header: 'Potvrda',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Nastavi',
      rejectLabel: 'Odustani',
      accept: () => acceptFunc(id),
      reject: () => { }
    });
  }

  const acceptFunc = async (id: string | undefined): Promise<void> => {
    if (id) {
      await StudentService.deleteStudent(id).then((res): void => {
        if (res.status === 200) {
          if (toast.current) {
            toast.current.show({ severity: 'warn', summary: 'Student obrisan!', detail: 'Uspješno ste obrisali studenta.', life: 3000 });
          }

          loadData();
        }
      });
    }
  }




  return (
    <React.Fragment>
      <Toast ref={toast} />
      <div className='card'>
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
          onSort={(e) => onSortChange(e)}
          sortOrder={state.sortOrder}
          sortField={state.query.sort_column}
          emptyMessage="Nije pronađen nijedan student!"

        >
          <Column field="firstName" editor={(options) => textEditor(options)} header="Ime" sortable></Column>
          <Column field="lastName" editor={(options) => textEditor(options)} header="Prezime" sortable></Column>
          <Column field="email" editor={(options) => textEditor(options)} header="Email" sortable></Column>
          <Column field="year" editor={(options) => textEditor(options)} header="Godina" sortable></Column>
          <Column field="indexNumber" editor={(options) => textEditor(options)} header="Broj indeksa" sortable></Column>
          <Column field="studentStatus" editor={(options) => selectEditor(options)} body={statusBodyStyle} header="Status studenta" sortable></Column>
          <Column field="phone" editor={(options) => numberEditor(options)} header="Telefon" sortable></Column>
          <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} body={rowEditorTemplate} bodyStyle={{ textAlign: 'center' }} sortableDisabled></Column>
        </DataTable>
      </div>

      <ConfirmDialog breakpoints={{ '960px': '75vw', '640px': '100vw' }} style={{ width: '50vw' }} />
    </React.Fragment>
  );
};

export default StudentTable;
