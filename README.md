# js-session

A small wrapper around [`express-session`](https://www.npmjs.com/package/express-session) with sensible cookie defaults, plus two middlewares.

**Note:** This repository is archived and read-only.

Package `@ralvarezdev/js-session` (0.2.14, ES modules). Depends on `express-session ^1.18.1` and `parseurl ^1.3.3`.

## Installation

npm publication was not verified; installing from GitHub works regardless:

```bash
npm install github:ralvarezdev/js-session
```

## Usage

```js
import express from "express";
import Session, { checkSession, countVisits } from "@ralvarezdev/js-session";

const app = express();
const sess = new Session({ secret: process.env.SESSION_SECRET, logger: console });

app.use(sess.session);
app.use(countVisits());
app.get("/private", checkSession((req, res) => {
  if (req.session.userId) return true;
  res.sendStatus(401);
  return false;
}), (req, res) => res.send("ok"));
```

`SESSION_SECRET` is only an example name; the package does not read it.

## API

Exported from `index.js`: default `Session`, `checkSession`, `countVisits`.

- **`new Session({logger, cookie, genid, name, proxy, resave, rolling, saveUninitialized, secret, store, unset})`** — defaults: cookie `{httpOnly: true, path: '/', sameSite: true, secure: false, ...}`, `name: 'connect.sid'`, `resave: false`, `rolling: false`, `saveUninitialized: false`, `unset: 'keep'`, and `secret: null` (you must supply one). Members: `options`, `session` (the middleware), `loadJSON(json)`, `set(req, properties)`, `destroy(req, res, onError, onSuccess)` and `close(...)` (destroy the session and clear the cookie).
- **`checkSession(isSessionValidFn)`** — calls `next()` only if the function returns truthy; the function must send the response otherwise.
- **`countVisits()`** — counts requests per URL path in `req.session.views`.

## Project structure

```
index.js
express/   session.js, middlewares.js, index.js
```

There are no tests.

## License

GNU General Public License v3.0. `package.json` declares `GPL-3.0-only`, matching the `LICENSE` file.
