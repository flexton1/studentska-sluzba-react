import axios from 'axios';

export class StudentService {
    private static serverUrl: string = 'http://localhost:4000';



    public static getAllStudents(){
        let dataUrl: string = `${this.serverUrl}/get-all-students`;

        return axios.get(dataUrl,{withCredentials: true, });

    }

    // public static getUser(id: string){
    //     let dataUrl: string = `${this.serverUrl}/users/` + id;

    //     return axios.get(dataUrl);

    // }


}