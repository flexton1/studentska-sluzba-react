import axios from 'axios';


export class AuthService {
    private static serverUrl: string = 'http://localhost:4000';



    public static login(email: string, password: string)
    {
        let dataUrl: string = `${this.serverUrl}/login`;

        return axios.post(dataUrl, {email: email, password: password}, {withCredentials: true})

    }

    // public static getUser(id: string){
    //     let dataUrl: string = `${this.serverUrl}/users/` + id;

    //     return axios.get(dataUrl);

    // }


}