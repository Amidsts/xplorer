import { 
    createPost,
    getPost
} from "../models/repository/postRepo";
import helpers from "../helpers/general"
import { catchError } from "../helpers/custom_error";


const {
    asyncWrapper,
    responseHandler
} = helpers


export async function createPostService(payload: {[key: string]: any}): Promise<any> {
    return await asyncWrapper( async () => {

        const newPost = await createPost(payload)

        if ( newPost instanceof Error) { 

            throw new catchError(newPost.message, 400)
        }

        return responseHandler("post has been created successfully", newPost)
    })
}

export async function getPostService(postId: string): Promise<any> {
    return await asyncWrapper( async () => {
        const post = await getPost(postId)
console.log(post);

        return responseHandler("post has been retrieved", post)
    })
}