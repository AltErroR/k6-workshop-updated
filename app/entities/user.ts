//@ts-ignore
import { randomString } from "../../framework/k6Libs/k6Libs.js"

export interface User {
    id: string,
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    userStatus: string
}


export const DEFAULT_USER: User =
{
    id: randomString(6,'0123456789'),
    username: "string",
    firstName: "string",
    lastName: "string",
    email: "string",
    password: "string",
    phone: "string",
    userStatus: "0"
}