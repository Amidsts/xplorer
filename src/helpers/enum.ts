import { Request } from "express";
import { IUser } from "../models/authModel";


export interface IRequest extends Request {
    user?: IUser
}


export enum Role {
    admin = "Admin",
    blogger= "Blogger"
}


export enum postcategory {
    technology = "Technology", 
    lifestyle = "Lifestyle",
    foodRecipe= "food and Recipe",
    DIY= "DIY",
    entertainment= "Entertainment"
}

