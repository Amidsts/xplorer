import { 
    createPostRepository,
    getPostRepository,
    getPostsRepository,
    updatePostRepository
} from "../models/repository/postRepo";
import helpers from "../helpers/general"
import { catchError } from "../helpers/custom_error";
import { updateUserDataRepository } from "../models/repository/authRepo";
import { 
    createPostValidator
} from "../inputValidators.ts/post.validator";


const {
    asyncWrapper,
    responseHandler
} = helpers


export async function createPostService(payload: {[key: string]: any}): Promise<any> {
    return await asyncWrapper( async () => {

        const {
            title,
            subtitle,
            body,
            category
        }= createPostValidator(payload)
        
        const newPost = await createPostRepository({
            title,
            subtitle,
            body,
            category
        })

        if ( newPost instanceof Error) { 

            throw new catchError(newPost.message)
        }

        await updateUserDataRepository(newPost.postedBy, {
            "$push": {
                posts: newPost._id
            }
        })

        return responseHandler("post has been created successfully", newPost)
    })
}

export async function getPostService(postId: string): Promise<any> {
    return await asyncWrapper( async () => {
        const post = await getPostRepository(postId)

        if ( post === null ) {throw new catchError("post not found")}

        return responseHandler("post has been retrieved", post)
    })
}

export async function getPostsService(skip: number, nPerPage: number): Promise<any> {
    return await asyncWrapper( async () => {

        const posts = await getPostsRepository(skip, nPerPage)

        if ( posts === null ) {throw new catchError("post not found")}

        return responseHandler("post has been retrieved", posts)
    })
}

export async function likePostService(postId: string, userId: string): Promise<any> {
    return await asyncWrapper( async () => {

        const likePost = await updatePostRepository(
            postId, 
            { "$push": {likes: userId}}
        )

        return likePost
    })
}

export async function unLikePostService(postId: string, userId: string): Promise<any> {
    return await asyncWrapper( async () => {

        const likePost = await updatePostRepository(
            postId, 
            { "$pull": {likes: userId}}
        )

        return likePost
    })
}

export async function PostCommentService(postId: string, payload: {[key: string]: any}): Promise<any> {
    return await asyncWrapper( async () => {

        const likePost = await updatePostRepository(
            postId, 
            {"$push": {
                comments: payload
            }}
        )
        
        return likePost
    })
}