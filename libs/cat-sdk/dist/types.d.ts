export interface CatGeoData {
    city: string;
    region: string;
    metroCode: string;
    postalCode: string;
    latitude: string;
    longitude: string;
}
export interface CatData {
    brand: string;
    geo: CatGeoData;
    sitePhoneNumber: string;
    uuid: string;
}
