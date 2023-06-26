import {ConnectOptions, connect} from "mongoose"

import helpers from "../helpers/general"
import logger from "../helpers/logger"


const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
} as ConnectOptions



connect(helpers.env("dbUri"), options).then( (e) => {
    
    logger.info("connected to database successfully")

})
.catch( (err) => {
    logger.info(err)
})