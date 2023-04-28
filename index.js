/* Rest api => representational state transfer api.
    Rest is simply a convention for building CRUD operations


    take this end point:
        http://vidly.com/api/customers
        http://domain/subdomain/resource => representation of the above url.
    
    
    HTTP METHODS
        => GET
        => POST
        => PUT
        => DELETE

    route parameters
    query parameters => provide additional information to the route parameters.

*/

const express = require('express');
const Joi = require('joi');

const app = express();

app.use(express.json());


const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
]
// GET METHOD

app.get("/", (req, res) => {
    res.send("Hello Wade!!!");
});


app.get("/api/courses", (req, res) => {
    res.send(courses);
});


app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(course => course.id === parseInt(req.params.id));

        // course not found => error 404.
        if(!course) return res.status(404).send(`The course with id of ${req.params.id} was not found`);
    
        res.send(course); 
});

// POST method

app.post('/api/courses', (req, res) => {

    const { error } = validateCourse(req.body);
    

    if (error) return res.status(400).send(result.error.details[0].message);

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    res.send(course);
});

/*
    Input validation on the api.
    Using JOI
*/



// PUT METHOD

app.put('/api/courses/:id', (req, res) => {
    //Look up the course
    const course = courses.find( course => course.id === parseInt(req.params.id));

    // If not existing, return error 404
    if (!course) return res.status(404).send('The course with the given ID is not found');

    //validate
    const { error } = validateCourse(req.body);

    //If invalid, return 400 - bad request error
    if (error) return res.status(400).send(result.error.details[0].message);


    //Update course
    course.name = req.body.name;

    //Return the updated course
    res.send(course);
});


// DELETE METHOD

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    const course = courses.find(c => c.id === parseInt(req.params.id));

    //Not existing, return 404
    if(!course) return res.status(404).send("The course with the given ID is not found");

    // Delete
    const newCourseList = courses.filter(course => course.id !== parseInt(req.params.id));
    // const courses = newCourseList;


    // Return the same course
    res.send({courses: newCourseList});
});



// function validate object

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return result = schema.validate(course);
}


// Setting up the port, allowing dynamic assingment of the port
// we use an environment variable PORT

const port = process.env.PORT || 3000; // read the value of PORT environment variable.


app.listen(port, () => console.log(`Listening on port ${port}`));


