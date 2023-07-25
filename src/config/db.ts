import {ConnectOptions, connect} from "mongoose"

import {env} from "../helpers/general"
import logger from "../helpers/logger"


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
} as ConnectOptions



connect(env("MONGODB_URI"), options).then( (e) => {
    
    logger.info("connected to database successfully")

})
.catch( (err) => {
    logger.info(err)
})