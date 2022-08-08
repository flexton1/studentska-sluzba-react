import axios from 'axios';
import { IStudent } from '../models/IStudent';

export class StudentService {
    private static serverUrl: string = 'http://localhost:4000';



    public static getAllStudents(){
        let dataUrl: string = `${this.serverUrl}/get-all-students`;

        return axios.get(dataUrl,{withCredentials: true, });

    }


    public static createNewStudent(student: IStudent){
        let dataUrl: string = `${this.serverUrl}/create-student`;

        return axios.post(dataUrl, student, {withCredentials: true});


    }

    public static deleteStudent(id: string){
        let dataUrl: string = `${this.serverUrl}/delete-student`;

        return axios.post(dataUrl, {id : id}, {withCredentials: true});        

    }

    // public static getUser(id: string){
    //     let dataUrl: string = `${this.serverUrl}/users/` + id;

    //     return axios.get(dataUrl);

    // }


}