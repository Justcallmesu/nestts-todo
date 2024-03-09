export interface Params{
    id?:string;
    categoriesID?:string;
    name:string;
}

export interface JWTverify{
    UserId:string;
    iat:number;
    exp:number;
}