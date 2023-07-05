import post from  "../postModel"
import helpers from "../../helpers/general"
import { catchError } from "../../helpers/custom_error"

const {asyncWrapper} = helpers


//create post
export async function createPostRepository(payload: {[key: string]: any}): Promise<any> {
    return await asyncWrapper( async () => {
        
        const newPost = await new post(payload).save()
        return newPost
   })
}

//get all posts (only admin and network)
export async function getPostsRepository(offset: number, nPerPage: number): Promise<any> {
    return await asyncWrapper( async () => {
        
        const totalPosts = await post.count()

        if (offset >= totalPosts) {
            offset = totalPosts/2
        }

        const posts = await post.find()
        .skip(offset)
        .limit(nPerPage)
        
        return posts
   })
}

// get my post
export async function getPostRepository(postId: string): Promise<any> {
    return await asyncWrapper( async () => {
     
        const postExist = await post.findById(postId).populate("postedBy")

        return postExist
    })
}

//delete post

//update post
export async function updatePostRepository(postId: string, payload: {[key:string]: any}): Promise<any> {
    return await asyncWrapper( async () => {
     
        const postExist = await post.findByIdAndUpdate(
            postId,
            payload
        )

        return postExist
    })
}

//unlike post

//comment on a post

//search posts by category 

//get post


