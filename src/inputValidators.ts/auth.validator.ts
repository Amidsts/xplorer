import joi from "joi"

import helper from "../helpers/general"

const {validate} = helper


export const createUserValidator = (payload: {[key: string]: any}) => {
    return validate(joi.object({
        userName: joi.string().invalid(" ").required(),
        email: joi.string().trim().email().required(),
        password: joi.string().min(8).alphanum().invalid(" ").required()
    }),
    payload)
}

export const signInUserValidator = (payload: {[key: string]: any}) => {
    return validate(joi.object({
        email: joi.string().trim().email().required(),
        password: joi.string().invalid(" ").required()
    }),
    payload)
}