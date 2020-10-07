import { CatData } from './types';
export interface CatDataNetworkerOptions {
    basePath?: string;
    timeout?: number;
}
declare class CatDataNetworker {
    private readonly axiosInstance;
    private readonly basePath;
    constructor(options?: CatDataNetworkerOptions);
    getCatData(uuid: string): Promise<CatData>;
}
export default CatDataNetworker;
