import joi from "joi"

import helper from "../helpers/general"

const {validate} = helper


export const createPostValidator = (payload: {[key: string]: any}) => {
    return validate(joi.object({
        title: joi.string().required(),
        subtitle: joi.string().required(),
        body: joi.string().required(),
        category: joi.string().valid("Technology", "Lifestyle", "food and Recipe", "DIY", "Entertainment").required()
    }),
    payload)
}

export const postCommentValidator = (payload: {[key: string]: any}) => {
    return validate(joi.object({
        comment: joi.string().required()
    }),
    payload)
}