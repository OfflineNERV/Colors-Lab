# COLORS -- LAMP Stack Demo

A small COP 4331 project: log in, then add and search "colors" tied to
your account. Built to practice deploying a full LAMP stack from scratch.

**Stack:** Linux + Apache + MySQL + PHP backend, plain HTML/CSS/JS frontend.

## Structure

```
api/       PHP endpoints (Login, AddColor, SearchColors)
public/    Frontend (index.html, color.html, css/, js/, images/)
```

## Setup

1. Install Apache, MySQL, and PHP on the server.
2. Create a `COP4331` database with `Users` and `Colors` tables (see
   `api/*.php` for the exact fields each query expects).
3. Copy `public/` to the web root and `api/` to a `LAMPAPI/` folder inside it.
4. Copy `api/config.example.php` -> `api/config.php` and fill in your DB
   credentials (this file is gitignored, never committed).
5. In `public/js/code.js`, set `urlBase` to your server's address.

## Running it

Visit `index.html` on your server, log in, then add or search colors on
the next page.

## Notes

- Demo project only -- no password hashing or HTTPS.
- AI (Claude) helped debug the server deployment (missing MySQL install,
  a CORS mismatch, a hardcoded API URL); the app code itself is from the
  course lab template.
