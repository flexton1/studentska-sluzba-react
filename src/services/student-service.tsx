import axios from 'axios';
import { IStudent } from '../models/IStudent';
import { Query } from '../models/Query';

export class StudentService {
    private static serverUrl: string | any = process.env.REACT_APP_API_ENDPOINT;



    public static getAllStudents(query: Query): Promise<any>
    {
        let dataUrl: string = `${this.serverUrl}/get-all-students`;

        return axios.post(dataUrl, {query: query} ,{withCredentials: true, });

    }


    public static createNewStudent(student: IStudent){
        let dataUrl: string = `${this.serverUrl}/create-student`;

        return axios.post(dataUrl, student, {withCredentials: true});


    }

    public static deleteStudent(id: string){
        let dataUrl: string = `${this.serverUrl}/delete-student`;

        return axios.post(dataUrl, {id : id}, {withCredentials: true});        

    }

    public static updateStudent(student: IStudent){
        let dataUrl: string = `${this.serverUrl}/update-student`;

        return axios.post(dataUrl, student, {withCredentials: true});
    }


    // public static getUser(id: string){
    //     let dataUrl: string = `${this.serverUrl}/users/` + id;

    //     return axios.get(dataUrl);

    // }


}