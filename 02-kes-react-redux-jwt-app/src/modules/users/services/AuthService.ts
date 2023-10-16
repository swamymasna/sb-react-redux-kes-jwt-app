import axios from "axios";
import { ILoginUser } from "../models/ILoginUser";
import { IRegisterUser } from "../models/IRegisterUser";
import { USER_API_BASE_URL } from "../../../constants/AppConstants";

export class AuthService {
  // private static serverUrl: string = `http://localhost:8081/api/auth`;
  private static serverUrl: string = USER_API_BASE_URL;

  public static setToken(token: any) {
    return localStorage.setItem("token", token);
  }

  public static getToken() {
    return localStorage.getItem("token");
  }

  public static loginUser(loginUser: ILoginUser) {
    return axios.post(`${this.serverUrl}/login`, loginUser);
  }

  public static registerUser(registerUser: IRegisterUser) {
    return axios.post(`${this.serverUrl}/register`, registerUser);
  }

  public static saveLoggedInUser(username: any) {
    return sessionStorage.setItem("authenticatedUser", username);
  }

  public static isLoggedInUser() {
    const username = sessionStorage.getItem("authenticatedUser");
    if (username == null) {
      return false;
    } else {
      return true;
    }
  }

  public static getLoggedInUser() {
    const username = sessionStorage.getItem("authenticatedUser");
    return username;
  }

  public static logoutUser() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
