## Steve Aksamit submission for Code Challenge
* All requirements from the instructions have been implemented

## Steps to run my app:
1. Install postgres database named:  steve_code_challenge
2. Run this command to clone git repo:   git clone https://github.com/SteveAksamit/Code_Challenge.git
3. Run this command to move to project directory:   cd Code_Challenge
4. Run this command to install NPM modules:   npm install
5. Run this command to build Webpack:   npm run build-client
6. Run this command to seed Database:   npm run seed
7. Browse to http://localhost:8080/ and see test credentials on login page

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
* React-datepicker (calendar date-selector component)
* React-pdf (PDF-Viewer)
* Multer (to "upload" documents to the project folder)

## Models
* User model has all login details for both doctors and patients
* Patient model has patient details and is associated with user
* Doctor model has doctor details and is associated with user
* Appointment model is join table between Doctor and Patient and has appointment details. Appointment workflow is constrolled based on different status values assigned as enums ('PAST', 'UPCOMING', 'PENDING', 'DECLINED', 'CANCELLED')
* Documents model has a reference to each patient document (actual documents are stored in /public/files )

## React Components
* 17 total components
* All but 3 components are used by both patients and doctors
* DoctorView and AllPatients components only used by Doctors
* PatientView componenet only used by patients
* State of isDoctor (a boolean) from User.isDoctor is used throughout app to control workflow between Patients and Doctors

## Styling
* I really wanted to have a date selector (as opposed to a text field or option menu) for scheduling new appointments, but the Semantic-UI-React framework I was using didn't have one
* I used a different library (react-datepicker) for the date selector, but the styling of it looks a little different than the other Semantic componenets.

## Functionality and Workflow
* The patient details are displayed be default in the patient view, but then I split up 4 function controls that you can toggle between ( view appointments, manage documents to view and delete, upload documents to upload, and schedule appointment  )
* On the doctor view, I fetch all appointments and find the ones for the logged in doctor. This way I can display the number of past, upcoming, and pending appointments in the collapsed patient list so they know whats upcoming
* I used a messages field to track cancellation messages, new appointment requests, and scheduled appointment notifications
* Cancelled appointments are displayed as cancelled (as opposed to being deleted and/or not shown)

##Store
* I kept a pattern of 1 key on the store object for each separate store file.

# File View and Uploading
* You can upload any type of file, but you can only view files in the app that are PDFs
* Uploads go to the /public/files directory since it is a local development deployment. Obviously this would change if this app was deployed to production and I would use S3, Heroku, or Cloudinary for file storage.
* I used the multer library to transfer local "uploaded" files to the project directory

##Assumptions
* A doctor cannot also be a patient and vice versa (or they would need two separate accounts)
