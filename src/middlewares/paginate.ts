import { Request, Response, NextFunction } from "express";

export function paginate(defaultPage = 1, nPerPage = 5, maxLimit = 20) {
    return (req: Request, res: Response, next: NextFunction) => {

        let page;
        let limit

        //validate page number
        page = req.query.page !== undefined 
        ? parseInt( req.query.page.toString() ) 
        : defaultPage

        //validate limit
        limit = req.query.limit !== undefined
        ? parseInt( req.query.limit.toString() )
        : nPerPage

        if ( page < 1 ) {
            page = defaultPage
        }
        
        if ( limit < 1 ) {
            limit = nPerPage
        }

        res.locals.page = page
        res.locals.limit = limit
        res.locals.offset = (page - 1) * limit //amount of data to skip per page

        return next()
    }
}