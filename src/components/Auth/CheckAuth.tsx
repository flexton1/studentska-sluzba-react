import { AuthService } from "../../services/auth-service";

const checkAuth = {
  isAuthenticated: false,
  authenticate() {
    AuthService.checkLogin().then((res) => {
      if (res.status === 200) {
        this.isAuthenticated = true;
      }
    })
  },
  logout() {
    this.isAuthenticated = false;
    AuthService.logout().then((res) => {
      if (res.status === 200) {
        this.isAuthenticated = false;
      }
    })
  }

}
export default checkAuth;