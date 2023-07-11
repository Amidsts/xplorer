import app from "./config/index"
import logger from "./helpers/logger"

import {env} from "./helpers/general"


(function () {
    
    app.listen(env("port"), ()=> {
        logger.info(`server is listening on port ${env("port")}`)
    })
})()