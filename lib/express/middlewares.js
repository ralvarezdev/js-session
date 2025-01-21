import parseurl from 'parseurl'

// Middleware to check if a session exists
export default function checkSession(sessionDoesNotExistBody) {
    return (req, res, next) => {
        // Check if the session exists
        if (!req.session) {
            // If the session does not exist, return an error
            return res.status(401).send(sessionDoesNotExistBody);
        }
        next()
    }
}

// Middleware to count the number of views to a route
export function countVisits() {
    return (req, res, next) => {
        // Check if the session has a views object
        if (!req.session.views) {
            req.session.views = {}
        }

        // Get the URL path
        const pathname = parseurl(req).pathname

        // Count the number of views to the path
        req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

        next()
    }
}