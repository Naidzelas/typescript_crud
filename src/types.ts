export interface Client {
    id: number;
    name: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}

export interface AppActivityLog {
    id: number;
    code: number;
    payload: {
        name: string;
        message: string;
    };
    // created_by: number;
    created_at: Date;
}

export interface OutgoingRequest {
    id: number;
    endpoint: string;
    method: string;
    payload: any;
    code: number;
    created_at: Date;
}