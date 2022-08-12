import axios from 'axios';
import { RegisterPayload } from '../models/RegisterPayload';


export class AuthService {
    
    private static serverUrl: string | any = process.env.REACT_APP_API_ENDPOINT;
    


    public static register(value: RegisterPayload){
        let dataUrl: string = `${this.serverUrl}/register`;

        return axios.post(dataUrl, value, {withCredentials: true});

    }


    public static login(email: string, password: string)
    {
        let dataUrl: string = `${this.serverUrl}/login`;

        return axios.post(dataUrl, {email: email, password: password}, {withCredentials: true});

    }

    public static checkLogin()
    {
        let dataUrl: string = `${this.serverUrl}/check-token`;

        return axios.get(dataUrl, {withCredentials: true, });
    }

    // public static getUser(id: string){
    //     let dataUrl: string = `${this.serverUrl}/users/` + id;

    //     return axios.get(dataUrl);

    // }


}