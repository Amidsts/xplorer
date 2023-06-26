import app from "./config/index"
import logger from "./helpers/logger"

import helpers from "./helpers/general"


(function () {
    
    app.listen(helpers.env("port"), ()=> {
        logger.info(`server is listening on port ${helpers.env("port")}`)
    })
})()