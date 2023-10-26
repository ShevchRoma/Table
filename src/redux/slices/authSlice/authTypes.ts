
export interface AuthState {
    message: string
    status: StatusEnum
    error: any
}

export enum StatusEnum {
    STATUS_ERROR = 'error',
    STATUS_LOADING = 'loading',
    STATUS_SUCCESS = 'success'
}