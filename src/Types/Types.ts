export interface UserProfile {
    user_id: number;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string | null;
    user_status: string | null;
    user_city: string | null;
    user_phone: string | null;
    user_links: string[] | null;
    is_superuser: boolean;
    [key: string]: any;
}

export interface User {
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
    user_password_repeat: string;
}

export interface LoginRequest {
    user_email: string;
    user_password: string;
}

export interface LoginResponse {
    result: {
        access_token: string,
        token_type: string,
    }
}
export interface Errors {
    user_firstname?: string;
    user_lastname?: string;
    user_email?: string;
    user_password?: string;
    user_password_repeat?: string;
}
export type FormValues = {
    user_firstname: string,
    user_lastname: string,
    user_email: string,
    user_password: string,
    user_password_repeat: string,
};
export interface AuthFormValues {
    user_email: string;
    user_password: string;
}

export interface FormErrors {
    user_email?: string;
    user_password?: string;
}
export interface Token {
    access_token: string;
}

export enum ActionTypes {
    INCREMENT = "INCREMENT",
    DECREMENT = "DECREMENT",
}

export interface IIncrementAction {
    type: ActionTypes.INCREMENT;
}

export interface IDecrementAction {
    type: ActionTypes.DECREMENT;
}

export interface IState {
    counter: number;
}

export interface ModalContent {
    header: string;
    content: string;
}

export interface TokenState {
    token: Token | null;
}

export interface UserState {
    user: UserProfile | null;
}