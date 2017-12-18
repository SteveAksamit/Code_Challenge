## Steve Aksamit submission for Code Challenge
* All requirements from the instructions have been implemented

## Steps to run my app:
1. Install Postgres database named:  steve_code_challenge
2. Run this command to clone git repo:   git clone https://github.com/SteveAksamit/Code_Challenge.git
3. Run this command to move to project directory:   cd Code_Challenge
4. Run this command to install NPM modules:   npm install
5. Run this command to build Webpack:   npm run build-client
6. Run this command to seed Database:   npm run seed
7. Browse to http://localhost:8080/ and see test credentials on login page

## Tools Used
* React
* Redux
* React-Router
* React-Redux
* Express
* Sequelize (ORM to Postgres)
* Webpack
* Boilermaker (seed project GitHub repo)
* Passport (user authentication middleware)
* Semantic-UI-React (CSS Framework)
* React-datepicker (calendar date-selector component)
* React-pdf (PDF-Viewer)
* Multer (to "upload" documents to the project folder)

## Models
* User model has all login details for both doctors and patients
* Patient model has patient details and is associated with user
* Doctor model has doctor details and is associated with user
* It was a bit messy doing it this way because the patient and doctor names were in their respective tables but their email was in the user table. But I wanted to keep it this way to keep the patient, doctor, and user details were kept separate. So when fethcing pateint details, I enabled eager loading to get the patient and the associated user-table data, so I only had to hit one API route.
* Appointment model is join table between Doctor and Patient and has appointment details. Appointment workflow is constrolled based on different status values assigned as enums ('PAST', 'UPCOMING', 'PENDING', 'DECLINED', 'CANCELLED')
* Documents model has a reference to each patient document (actual documents are stored in /public/files )
* Age is a virtual field calculated comparing patient DOB to current date.

## React Components
* 17 total components
* All but 3 components are used by both patients and doctors
* DoctorView and AllPatients components only used by Doctors
* PatientView componenet only used by patients
* State of isDoctor (a boolean) from User.isDoctor is used throughout app to control workflow between Patients and Doctors
* State is tied directly to each component. For example, 'all patients' get pulled on rendering all patient component for doctor view. Then the single patient gets passed down from the redux store (as opposed to fetching from database when a patient is selected.). Documents and Appointments, are fetched from database when their corresponding component are rendered. I didn't want to load all the data to the main page, so I only fetch it form the database when we know for sure the user wants to access it.
* The newAppoointment modele has 3 subcomponents: date selector, doctor selector, and time selector. The same scheduler component is user for both patients and doctors.

## Styling
* I used accordion drop downs for all-patient view. I thought this made for good workflow for this app so the doctor can quickly switch between patients in a single view. But I also considered having a single patient selector on the top, the 4 functionality toggle buttons on a side bar, and the content in the middle. But if you search for your patient first, it gives the same effect, only one user shows, and it allows for really nice UI.
* I really wanted to have a date selector (as opposed to a text field or option menu) for scheduling new appointments, but the Semantic-UI-React framework I was using didn't have one
* I used a different library (react-datepicker) for the date selector, but the styling of it looks a little different than the other Semantic componenets.

## Functionality and Workflow
* The patient details are displayed be default in the patient view, but then I split up 4 function controls that you can toggle between ( view appointments, manage documents to view and delete, upload documents to upload, and schedule appointment  )
* On the doctor view, I fetch all appointments and find the ones for the logged in doctor. This way I can display the number of past, upcoming, and pending appointments in the collapsed patient list so they know whats upcoming.
* I used a messages field to track cancellation messages, new appointment requests, and scheduled appointment notifications
* Cancelled appointments are displayed as cancelled (as opposed to being deleted and/or not shown)

## Store
* I kept a pattern of 1 key on the store object for each separate store file.
* State is cleared out upon user logout('REMOVE_USER')

## File View and Uploading
* You can upload any type of file, but you can only view files in the app that are PDFs
* Uploads go to the /public/files directory since it is a local development deployment. This would change if this app was deployed to production and I would use S3, Heroku, or Cloudinary for file storage.
* I used the multer library to transfer local "uploaded" files to the project directory
* A five digit random number is assigned to the filename of uploaded files to avoid conflict incase someone uploads a file with the same name.

## API
* Security implemented on backend in API to ensure that whoever is hitting API route is authorized to do so. One of the three functions in the securityMiddleware file handle this and get passed back into each route based on the level or required access for a given route ( is a patient / is the correct patient / is a doctor or is the correct patient). All 3 checks also require that a logged in user is hitting the API.

## Assumptions
* A doctor cannot also be a patient and vice versa (or they would need two separate accounts)
* A Doctor can access all patient data in the system
* A patient can only access their data in the system

## Outstanding To-Do's
* Write unit tests for the store using axios-mock-adapter and redux-mock-store
* Write unit tests for the react components using enzyme
* Write unit tests for API using supertest and chai
