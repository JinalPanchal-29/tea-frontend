import { environment } from "src/environments/environment";

export const API_ENDPOINTS = {
  authentication: {
    login: `${environment.baseUrl}/api/User/Login?`,
    register: `${environment.baseUrl}/api/User/Register`
  },
  user: {
    getUserDetails: `${environment.baseUrl}/api/User/GetUserDetails`,
  }
}