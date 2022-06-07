export interface UserDto {
    id: number;
    name: string;
    mobile: string;
    level: number;
    gender: number;
    age: number;
    currentPage: number;
    status?:any
    detail?:string
}