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
    handleEditClick: () => void;
    handleChangePasswordClick: () => void;
    handleDeleteClick: () => void;
};

export type EditFormProps = {
    avatarFile: File | null;
    user: UserProfile | null;
    firstName: string;
    lastName: string;
    status: string;
    city: string;
    phone: string;
    links: string[];
    anonimus: string;
    handleAvatarClick: () => void;
    handleFirstNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleLastNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleStatusChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleCityChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handlePhoneChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleLinkChange: (event: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    handleRemoveLink: (index: number) => void;
    handleAddLink: () => void;
    handleSaveDataClick: () => void;
    handleCancelClick: () => void;
};

export type ChangePasswordProps = {
    avatarFile: File | null;
    user: UserProfile | null;
    newPassword: string;
    confirmPassword: string;
    anonimus: string;
    handleNewPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleConfirmPasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSavePasswordClick: () => void;
    handleCancelClick: () => void;
};

export type CardProps = {
    user: UserProfile;
    anonimus: string;
};