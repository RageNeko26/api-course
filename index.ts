// Express 
import express, { Express } from 'express';

// Validator middleware
import validateLogin from './middlewares/ValidateInput/ValidateLogin';
import validateRegister from './middlewares/ValidateInput/ValidateRegister';
import validateCourse from './middlewares/ValidateInput/ValidateCourse';

// User Model
import { checkUserModel, syncUserModel} from './models/User/Schema';
import Login from './models/User/Login';
import Register from './models/User/Register';

// Course Model
import { checkCourseModel, syncCourseModel } from './models/Course/Schema';
import SetupCourse from './models/Course/SetupCourse';
import AddCourse from './models/Course/AddCourse';
import getAllCourse from './models/Course/AllCourse';
import getSingleCourse from './models/Course/SingleCourse';
import updateCourse from './models/Course/UpdateCourse';
import deleteCourse from './models/Course/DeleteCourse';


// Auth Token
import Auth from './routes/Auth';

// Cors for using resource in cross domain
const cors = require('cors');

// Module for parsing payload
const bodyParser = require('body-parser');

// Validation result
const { validationResult } = require('express-validator');

// HTTP Payload Parser
const urlEncodedParser = bodyParser.urlencoded({extended: false});
const jsonPayload = bodyParser.json();

// Initialize Express
const app: Express = express();

// Port number
const port: number = 3000;

// Defining Model Database
checkUserModel();
syncUserModel();
checkCourseModel();
syncCourseModel();

// Using payload parser in Express
app.use(urlEncodedParser);
app.use(jsonPayload);

// Using Cors middleware
app.use(cors());

// Route for User
app.post('/api/register' , validateRegister, Register);
app.post('/api/login', validateLogin, Login);
app.get('/api/auth/:token', Auth);

// Route For starter data 
app.get('/api/course/setup', SetupCourse);

// Route for Course
app.post('/api/course', validateCourse, AddCourse);
app.get('/api/course', getAllCourse);
app.get('/api/course/:id', getSingleCourse);
app.put('/api/course/:id', validateCourse ,updateCourse);
app.delete('/api/course/:id', deleteCourse);

app.listen(port, ():void => {
	console.log(`Server is running on port ${port}`);
});

