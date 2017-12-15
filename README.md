## Steve Aksamit submission for Code Challenge

## Steps to run my app:
1. git clone https://github.com/SteveAksamit/Code_Challenge.git
2. Install postgres database named:  steve_code_challenge
3. Run this command to install NPM modules:  npm install
4. Run this command to build Webpack:  npm run build-client
5. Run this command to seed DB: npm run seed
6. Browse to http://localhost:8080/ and see test credentials on login page

## Tools Used
* Boilermaker (seed project)
* Sequelize (ORM to Postgres)
* React
* Redux
* React-Router
* React-Redux
* Express
* Webpack
* Passport (user authentication middleware)
* Semantic-UI-React (CSS Framework)
* React-pdf (PDF-Viewer)
* Multer (to "upload" documents to the project folder)

## Models
* User model has all login details for both doctors and patients
* Patient model has patient details and is associated with user
* Doctor model has doctor details and is associated with user
* Appointment model is join table between Doctor and Patient and has appointment details.
* Documents model has a reference to each patient document (actual documents are stored in /public/files )
