export interface UserSignInInterface {
    username: string | undefined;
  password: string | undefined;
  confirmPassword: string | undefined;
  gender: string | undefined;
}

export interface UserloginInterface{
    username: string | undefined;
    password: string | undefined;
}

export interface UserSignInResponse {
    token?: string
}

export interface GlobalResponseInterface {
    success: boolean
    token?: string 
    error?: any
    message?: string
    data?: any 
}

export interface ConversationInterface {
    _id: string
    username: string
    profileAvatar: string
    gender: string
}