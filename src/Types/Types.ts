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

export interface Users {
    [key: string]: string | number;
    user_id: number;
    user_firstname: string;
    user_lastname: string;
    user_email: string;
    user_avatar: string;
}


export interface PaginationData {
    current_page: number;
    total_page: number;
    total_results: number;
}

export interface UserListItem {
    user_id: number;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_avatar: string | null;
}

export interface UserList {
    users: UserListItem[];
    user_by_id: UserProfile | null;
}

export interface UserById {
    user_by_id: UserListItem[];
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

export interface TokenState {
    token: Token | null;
}

export interface UserState {
    user: UserProfile | null;
}

export interface TableProps {
    data: Record<string, string | number>[];
    table_type: "user" | "company";
}

export interface UpdatePasswordData {
    user_password: string;
    user_password_repeat: string;
}

export interface UpdateUserInfoData {
    user_firstname: string;
    user_lastname: string;
    user_status: string;
    user_city: string;
    user_phone: string;
    user_links: string[];
}

export type UserData = {
    firstName: string;
    lastName: string;
    status: string;
    city: string;
    phone: string;
    links: string[];
    newPassword: string;
    confirmPassword: string;
    avatarFile: File | null;
};

export type DropdownMenuProps = {
    id: string;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditUserFormProps = {
    avatarFile: File | null;
    user: UserProfile | null;
    firstName: string;
    lastName: string;
    status: string;
    city: string;
    phone: string;
    links: string[];
    anonimus: string;
    id: string;
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ChangePasswordProps = {
    avatarFile: File | null;
    newPassword: string;
    confirmPassword: string;
    anonimus: string;
    user: UserProfile | null;
    id: string;
    userData: UserData
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
};

export type UserCardProps = {
    user: UserProfile;
    anonimus: string;
};

export type CompanyCardProps = {
    company: Company;
    anonimus: string;
};

export interface CreateCompanyRequest {
    company_name: string;
    is_visible: boolean;
}

export interface CompanyInfo {
    company_name: string;
    company_title: string;
    company_description: string;
    company_city: string;
    company_phone: string;
    company_links: string[];
    company_avatar?: File | null,
}

export interface CompanyListItem {
    company_id: number;
    company_name: string;
    company_title: string;
    company_avatar: string | null;
}

export interface CompanyList {
    companies: CompanyListItem[];
    company_by_id: Company | null;
}

export interface Company {
    company_id: number;
    company_name: string;
    company_title: string;
    company_avatar: string;
    is_visible: boolean;
    company_description: string;
    company_city: string;
    company_phone: string;
    company_links: string[];
    company_owner: {
        user_id: number;
        user_email: string;
        user_firstname: string;
        user_lastname: string;
        user_avatar: string;
    };
}

export type EditCompanyFormProps = {
    avatarFile?: File | null;
    company: Company | null;
    name: string;
    title: string;
    description: string;
    city: string;
    phone: string;
    links: string[]; 
    anonimus: string;
    id: string;
    setCompanyData: React.Dispatch<React.SetStateAction<CompanyInfo>>;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};
