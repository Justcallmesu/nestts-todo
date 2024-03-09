export interface Params{
    id?:string;
    categoriesID?:string;
}

export interface JWTverify{
    UserId:string;
    iat:number;
    exp:number;
}