# Members Only App

An exclusive clubhouse application where members can post anonymous messages. Inside the clubhouse, members can see the authors of the posts, but non-members can only see the story without knowing the author. Admins have additional privileges, such as deleting messages.

![image](https://github.com/user-attachments/assets/f86c4b80-14fa-43ed-87d3-e87d1118c05b)

## Features
- User authentication using ```passport.js```.
- Members-only access to certain features, such as viewing post authors and timestamps.
- Create and display anonymous messages.
- Admin privileges for managing content (e.g., deleting messages).
- Membership and admin roles are granted using secret passcodes.
- User roles:
  - **Guest:** Can view messages without author details.
  - **Member:** Can view author and timestamp details.
  - **Admin:** Can view all details and delete messages.

## Tech Stack
- **Backend:** Node.js, Express
- **Authentication:** passport.js, bcrypt.js
- **Frontend:** EJS templates
- **Database:** PostgreSQL
- **Environment Management:** dotenv

## Live Demo

Check out the live version of the app hosted on Railway:  
[Live Demo on Railway](https://members-only-production-0057.up.railway.app)
(Secret key for membership acces is "s3cr3t")

## Local Installation
1. **Clone the repository:**
```
git clone https://github.com/PopescuStefan1/members-only.git
cd members-only
```
2. **Install dependencies:**
```
npm install
```
4. **Environment Variables:** Create a ```.env``` file in the root directory and set up the following environment variables:
```
USERNAME=your_database_user
PASSWORD=your_database_password
HOST=your_database_host
DB=your_database_name
DB_PORT=your_db_port
SECRET_KEY=your_chose_secret_key (such as s3cr3t)
```
5. **Database Setup:** Create a PostgreSQL database (This app assumes you will use the default database port 5432. If you use a different port, you will need to edit [pool.js](db/pool.js)):
```
psql
CREATE DATABASE your_database_name;
```
6. **Populate Database:** Run the [Database population script](db/populatedb.js). Make sure to replace the connection string with your own credentials.
```
node db/populatedb.js
```
7. **Start the Server:**
```
npm start
```
8. **Access the App:** Open your browser and go to http://localhost:5000.

**Key Functionalities**
  - **User Signup and Login**
    - Users can sign up with their full name, username (email), and a secure password.
    - Passwords are hashed with bcrypt for security.
    - Login functionality is powered by passport.js.
  - **Membership**
    - Non-members can view messages without author details.
    - Members can join the club by entering a secret passcode.
  - **Admin Privileges**
    - Admins can view and delete all messages.
  - **Create and View Messages**
    - Logged-in users can create new messages.
    - All users can view messages, but only members can see author and timestamp details.
