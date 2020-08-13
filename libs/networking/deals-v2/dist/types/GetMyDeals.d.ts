import * as yup from 'yup';
export declare type Deal = {
    dealSummary: {
        dealStatus: {
            status: string;
            step: string;
        };
        inventory: {
            pricing: {
                listPrice: number;
            };
            vehicle: {
                make: string;
                model: string;
                trim: string;
                vin: string;
                year: number;
            };
        };
    };
};
export declare const dealSchema: yup.ObjectSchema<Deal>;
export declare type User = {
    deals: Deal[];
};
export declare const userSchema: yup.ObjectSchema<User>;
export declare type Data = {
    user: User;
};
export declare const dataSchema: yup.ObjectSchema<Data>;
export declare type GetMyDealsResponse = {
    data: Data;
};
export declare const getMyDealsResponseSchema: yup.ObjectSchema<GetMyDealsResponse>;
