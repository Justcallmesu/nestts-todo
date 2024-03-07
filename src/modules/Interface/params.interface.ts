export interface Params{
    id:string
}

export interface JWTverify{
    UserId:string,
    iat:number,
    exp:number
}