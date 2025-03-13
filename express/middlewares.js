import parseurl from 'parseurl'

// Middleware to check if a session is valid
export default function checkSession(isSessionValidFn=(req, res)=>true) {
    return (req, res, next) => {
        // Check if a session is valid
        if (!isSessionValidFn(req, res))
            return
        next()
    }
}

// Middleware to count the number of views to a route
export function countVisits() {
    return (req, res, next) => {
        // Check if the session has a views object
        if (!req.session.views)
            req.session.views = {}

        // Get the URL path
        const pathname = parseurl(req).pathname

        // Count the number of views to the path
        req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

        next()
    }
}