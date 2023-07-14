import { 
    createPostRepository,
    getPostRepository,
    getPostsRepository,
    updatePostRepository
} from "../models/repository/postRepo";
import {
    asyncWrapper,
    responseHandler
} from "../helpers/general"
import { catchError } from "../helpers/custom_error";
import { getUserRepository, updateUserDataRepository } from "../models/repository/authRepo";
import { 
    createPostValidator
} from "../inputValidators.ts/post.validator";
import post from "../models/postModel";


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
export async function getPostService(post: string): Promise<any> {
    return await asyncWrapper( async () => {

        return responseHandler("post has been retrieved", post)
    })
}

export async function getPostsService(userId: string, skip: number, nPerPage: number): Promise<any> {
    return await asyncWrapper( async () => {
        
        let postOwnersId = []
        const user = await getUserRepository({_id: userId})

        const followersId = user.followers
        const followingsId = user.followings

        postOwnersId.push(userId, ...followersId, ...followingsId)

        const posts = await getPostsRepository(postOwnersId, skip, nPerPage)

        if ( !posts.length ) {throw new catchError("There is no post")}

        return responseHandler("post has been retrieved", posts)
    })
}

//not completed
export async function reactToPostService(Post: any, userId: string): Promise<any> {

    try {

        if (Post.likes.includes(userId)) {

            await post.updateOne(
                {_id: Post._id},
                {$pull: {likes: userId}}
            )

            return responseHandler(`you just unlike ${Post.title}`)
        } else {

            await post.updateOne(
                {_id: Post._id},
                {$push: {likes: userId}}
            )

            return responseHandler(`you just liked ${Post.title}`)
        }

        
    } catch (error: any) {
        return new catchError(error.message)
    }
}

//delete a post
//edit/update a post