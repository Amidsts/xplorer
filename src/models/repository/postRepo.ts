import post from  "../postModel"
import helpers from "../../helpers/general"
import { catchError } from "../../helpers/custom_error"

const {asyncWrapper} = helpers


//create post
export async function createPost(payload: {[key: string]: any}) {
    return await asyncWrapper( async () => {
        
        const newPost = await new post(payload).save()
        return newPost
   })
}

//get all posts (only admin and network)

// get my post
export async function getPost(postId: string) {
    return await asyncWrapper( async () => {
     
        const postExist = await post.findById(postId)

        if (!postExist) throw new catchError("post does not exists", 404)
        
        return postExist
    })
}

//get posts by category 

//get post

//delete post

//like post

//unlike post

//comment on a post
