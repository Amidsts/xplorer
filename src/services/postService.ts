import { 
    createPostRepository,
    getPostRepository,
    getPostsRepository,
    updatePostRepository
} from "../models/repository/postRepo";
import helpers from "../helpers/general"
import { catchError } from "../helpers/custom_error";
import { getUserRepository, updateUserDataRepository } from "../models/repository/authRepo";
import { 
    createPostValidator
} from "../inputValidators.ts/post.validator";


const {
    asyncWrapper,
    responseHandler
} = helpers


export async function createPostService(userId: string, payload: {[key: string]: any}): Promise<any> {
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
            category,
            postedBy: userId
        })

        if ( newPost instanceof Error) { throw new catchError(newPost.message) }

        await updateUserDataRepository(newPost.postedBy, {
            "$push": {
                posts: newPost._id
            }
        })

        return responseHandler("post has been created successfully", newPost)
    })
}

//only post owner and post owner follwers can access
export async function getPostService(postId: string, userId: string): Promise<any> {
    return await asyncWrapper( async () => {

        const post = await getPostRepository(postId)

        if ( post === null ) {throw new catchError("post not found")} 

        return responseHandler("post has been retrieved", post)
    })
}

//not completed
export async function getPostsService(userId: string, skip: number, nPerPage: number): Promise<any> {
    return await asyncWrapper( async () => {
        
        let usersId = []
        const user = await getUserRepository({_id: userId})

        const followersId = user.followers
        const followingsId = user.followings

        usersId.push(userId, ...followersId, ...followingsId)

        usersId
        
        // const posts = await getPostsRepository(skip, nPerPage)

        // if ( posts === null ) {throw new catchError("post not found")}

        // return responseHandler("post has been retrieved", posts)
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

//posts by loggedIn user and loggedIn User's posts
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

//delete a post
//edit/update a post