const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//const { type } = require("os");

const employees = [];

function initialize() {
    inquirer.prompt([
        {
            type: "list",
            name: "role",
            message: "What is the role of the new employee?",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ],
        },
        {
            type: "input",
            name: "name",
            message: "What is the name of your employee?",
        },
        {
            type: "input",
            name: "id",
            message: "What is the id number of your employee?",
        },
        {
            type: "input",
            name: "email",
            message: "What is the email address of your employee?",
        },
    ]).then(answers => {
        if (answers.role === "Manager") {
            inquirer.prompt([{
                type: "input",
                name: "officeNumber",
                message: "What is the office number of your manager?"
            }]).then(res => {
                const manager = new Manager(answers.name, answers.id, answers.email, res.officeNumber);
                employees.push(manager);
                addEmployee();
            })
        } else if (answers.role === "Engineer") {
            inquirer.prompt([{
                type: "input",
                name: "github",
                message: "What is the GitHub url of your engineer?"
            }]).then(res => {
                const engineer = new Engineer(answers.name, answers.id, answers.email, res.github);
                employees.push(engineer);
                addEmployee();
            })
        } else {
            inquirer.prompt([{
                type: "input",
                name: "school",
                message: "Where does your intern go to school?"
            }]).then(res => {
                const intern = new Intern(answers.name, answers.id, answers.email, res.school);
                employees.push(intern);
                addEmployee();
            })
        }
    })

};

function addEmployee() {
    inquirer.prompt([{
        type: "confirm",
        name: "response",
        message: "Would you like to add another employee?"
    }]).then(res => {
        if (res.response === true){
            initialize();
        } else {
            fs.writeFile("team.html", render(employees), "utf-8", () =>{console.log("success")})
        }
    })
}

initialize();
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
