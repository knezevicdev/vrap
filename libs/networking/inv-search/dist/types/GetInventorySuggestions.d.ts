import * as yup from 'yup';
export declare type Data = {
    BodyType: string[];
    Make: string[];
    Model: string[];
};
export declare const dataSchema: yup.ObjectSchema<Data>;
export declare type GetInventorySuggestionsResponse = {
    data: Data;
};
export declare const getInventorySuggestionsResponseSchema: yup.ObjectSchema<GetInventorySuggestionsResponse>;
