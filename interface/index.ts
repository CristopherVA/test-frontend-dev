export interface RegisterInterface {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
    company: string;
}

export interface LoginInterface {
    email: string;
    password: string;
}

export interface SessionInterface {
    expires: string;
    id: number;
    refresh_token: string;
    refresh_token_expires: string;
    time: string;
    timezone: string;
    token: string;
}

export interface DataUserInterface {
    firstname: string;
    lastname: string;
    email: string;
    default_company: string;

}