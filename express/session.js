import session from 'express-session';

// Session for the session
export default class Session {
    #logger
    #options
    #session

    // Options for the session wrapper
    constructor({
                 logger,
                    cookie= {
            domain: null,
            expires: null,
            httpOnly: true,
            maxAge: null,
            path: '/',
            sameSite: true,
            secure: false
        },
        genid= null,
        name= 'connect.sid',
        proxy= undefined,
        resave= false,
        rolling= false,
        saveUninitialized= false,
        secret= null,
        store= null,
        unset= 'keep'
    }) {
        // Set the options for the session
        this.#options = {cookie, genid, name, proxy, resave, rolling, saveUninitialized, secret, store, unset};
        this.#session = session(this.#options);

        // Set the logger
        this.#logger = logger;
    }

    // Get the session options
    get options() {
        return this.#options;
    }

    // Load the session from a JSON
    loadJSON(json) {
        // Log the session properties
        if (this.#logger)
            this.#logger.debug('Loading session properties from JSON: '+ json);

        // Load the session properties
        this.#options = JSON.parse(json);
        this.#session = session(this.#options);
    }

    // Get the session
    get session() {
        return this.#session;
    }

    // Set the session properties to the request
    set(req, properties ={}) {
        // Log the session properties
        if (this.#logger)
            this.#logger.debug('Setting session properties: ' + JSON.stringify(properties));

        // Check if the session exists
        if (!req.session)
            req.session = {};

        // Set each property to the session
        for (let key in properties)
            req.session[key] = properties[key];
    }

    // Destroy the session for the request
    destroy(req) {
        // Log the session properties
        if (this.#logger)
            this.#logger.debug('Destroying session properties: ' +  String(req.session));

        // Destroy the session
        req.session.destroy();
    }

    // Close the session for the request
    close(req) {
        this.destroy(req);
    }
}