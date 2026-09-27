# COLORS -- LAMP Stack Demo

A small full-stack web app built for COP 4331 to practice deploying a
LAMP (Linux, Apache, MySQL, PHP) stack from scratch. A logged-in user can
save named "colors" to their own account and search back through the ones
they've saved. It's intentionally minimal -- the point of the assignment is
the deployment pipeline (server setup, database, API), not the UI.

## What it does

- **Log in** with a username/password checked against a `Users` table.
- **Add a color** (any text string) tied to the logged-in user's account.
- **Search colors** by a partial, case-insensitive match against the colors
  that user has previously added.
- A simple cookie keeps the user logged in across page loads for 20 minutes.

## Technologies used

- **Linux** -- Ubuntu droplet (DigitalOcean)
- **Apache** -- web server (`apache2`)
- **MySQL** -- relational database (`mysql-server`), accessed via `mysqli`
- **PHP** -- backend API endpoints (`api/`)
- **HTML / CSS / vanilla JavaScript** -- frontend (`public/`), using
  `XMLHttpRequest` to call the PHP API

## Project structure

```
colors-lamp/
  api/                    PHP backend (deployed as /LAMPAPI on the server)
    config.example.php    Template for DB credentials -- copy to config.php
    Login.php             Validates username/password, returns user info
    AddColor.php          Inserts a new color for the logged-in user
    SearchColors.php      Returns colors matching a search string
  public/                 Static frontend (deployed as Apache's web root)
    index.html            Login page
    color.html            Add/search page (shown after login)
    css/styles.css
    js/code.js             Calls the API, handles login cookie
    js/md5.js               (included, currently unused -- see Limitations)
    images/background.png
  .gitignore
  LICENSE.md
  README.md
```

## Database

Three tables in a `COP4331` MySQL database:

```sql
CREATE TABLE Users (
  ID INT NOT NULL AUTO_INCREMENT,
  FirstName VARCHAR(50) NOT NULL DEFAULT '',
  LastName  VARCHAR(50) NOT NULL DEFAULT '',
  Login     VARCHAR(50) NOT NULL DEFAULT '',
  Password  VARCHAR(50) NOT NULL DEFAULT '',
  PRIMARY KEY (ID)
) ENGINE = InnoDB;

CREATE TABLE Colors (
  ID INT NOT NULL AUTO_INCREMENT,
  Name   VARCHAR(50) NOT NULL DEFAULT '',
  UserID INT NOT NULL DEFAULT '0',
  PRIMARY KEY (ID)
) ENGINE = InnoDB;
```

(A `Contacts` table also exists from the same lab template but isn't used
by this app.)

## Setup / deployment

This assumes a fresh Ubuntu server with root SSH access.

1. **Install the stack**
   ```sh
   apt update
   apt install apache2 mysql-server php libapache2-mod-php php-mysql -y
   systemctl enable apache2 mysql
   systemctl start apache2 mysql
   ```

2. **Create the database**
   ```sh
   mysql -u root
   ```
   ```sql
   CREATE DATABASE COP4331;
   -- then run the CREATE TABLE statements above
   CREATE USER 'your_db_username'@'%' IDENTIFIED BY 'your_db_password';
   GRANT ALL PRIVILEGES ON COP4331.* TO 'your_db_username'@'%';
   ```

3. **Deploy the files**
   - Copy everything in `public/` to Apache's web root (e.g. `/var/www/html/`).
   - Copy everything in `api/` to a `LAMPAPI/` folder inside the web root
     (e.g. `/var/www/html/LAMPAPI/`).
   - In `api/`, copy `config.example.php` to `config.php` and fill in the
     real database username/password/name you created above.

4. **Point the frontend at your API**

   Edit `public/js/code.js` and set `urlBase` to wherever `LAMPAPI/` is
   actually reachable, e.g.:
   ```js
   const urlBase = 'http://YOUR_SERVER_IP/LAMPAPI';
   ```

## Running / accessing it

Once deployed, open `http://YOUR_SERVER_ADDRESS/index.html` (or just the
server address, if `index.html` is the default document) in a browser:

1. Log in with a user from the `Users` table.
2. On the next page, type a color and click **Add Color**.
3. Type a search term (or part of one) and click **Search Color** to see
   matching colors previously saved for that account.

## Assumptions & limitations

- This is a learning/demo project, not production-hardened: passwords are
  stored and compared as plain text (no hashing), and there's no HTTPS,
  input length validation, or rate limiting.
- `js/md5.js` is included but not currently wired up -- password hashing is
  commented out in `code.js`.
- The login session is a plain, unsigned cookie (`firstName`/`lastName`/
  `userId`) with a 20-minute expiry; it's convenience state, not a security
  mechanism.
- `api/config.php` (real DB credentials) is intentionally excluded from
  this repository via `.gitignore`; use `config.example.php` as a template.

## AI usage

AI assistance (Claude) was used to help debug server/deployment issues
while setting this up for the first time -- e.g. diagnosing a missing MySQL
install on the droplet, a CORS error caused by the frontend and API being
loaded from different origins, and fixing a hardcoded API URL in
`code.js`. The application logic itself (HTML/CSS/JS/PHP) is from the
course-provided lab template; this repository documents and organizes that
existing work per the assignment instructions.
