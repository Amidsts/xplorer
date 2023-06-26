import { 
    createPost,
    getPost
} from "../models/repository/postRepo";
import helpers from "../helpers/general"


const {
    asyncWrapper,
    responseHandler
} = helpers


export async function createPostService(payload: {[key: string]: any}) {
    return await asyncWrapper( async () => {
        const newPost = await createPost(payload)

        return responseHandler("post has been created successfully", newPost)
    })
}

export async function getPostService(postId: string) {
    return await asyncWrapper( async () => {
        const post = await getPost(postId)

        return responseHandler("post has been retrieved", post)
    })
}