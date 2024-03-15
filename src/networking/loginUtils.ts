import { apiPostRequest } from "./apiRequestUtils";

export enum LoginType {
    GOOGLE = "GOOGLE",
    FACEBOOK = "FACEBOOK",
    
    
}

export function login(loginType: LoginType, authToken: string) {
    apiPostRequest("login", {authToken});
}