const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


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

const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const teamMembers = [];

const managerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
        default: "Chris"
    },
    {
        type: "input",
        name: "id",
        message: "What is your manager's id?",
        default: "01"
    },
    {
        type: "input",
        name: "email",
        message: "What is your manager's email?",
        default: "chris@manageremail.com"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
        default: "(123) 456-7890"
    },
    {
        type: "list",
        name: "teamMember",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "No more team members to add"
        ]
    },
];

const engineerQuestions = [
    {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
        default: "Penelope"
    },
    {
        type: "input",
        name: "id",
        message: "What is your engineer's id?",
        default: "76543"
    },
    {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
        default: "penelope@email.com"
    },
    {
        type: "input",
        name: "github",
        message: "What is your engineer's GitHub username?",
        default: "penelope22"
    },
    {
        type: "list",
        name: "teamMember",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "No more team members to add"
        ]
    },
];

const internQuestions = [
    {
        type: "input",
        name: "name",
        message: "Name of Intern?",
        default: "Trisha"
    },
    {
        type: "input",
        name: "id",
        message: "Enter Intern ID",
        default: "1234"
    },
    {
        type: "input",
        name: "email",
        message: "Enter Intern email",
        default: "lisa@lisa.com"
    },
    {
        type: "input",
        name: "school",
        message: "Name of school",
        default: "UMiami"
    },
    {
        type: "list",
        name: "teamMember",
        message: "Which type of team member would you like to add?",
        choices: [
            "Engineer",
            "Intern",
            "No more team members to add"
        ]
    },
];


function promptManager(questions, employeeType) {
    inquirer.prompt(questions)
        .then(function (answers) {

            let newTeamMember;

            if (employeeType == "Manager") {
                newTeamMember = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            } else if (employeeType == "Engineer") {
                newTeamMember = new Engineer(answers.name, answers.id, answers.email, answers.github);
            } else if (employeeType == "Intern") {
                newTeamMember = new Intern(answers.name, answers.id, answers.email, answers.school);
            }

            teamMembers.push(newTeamMember);

            writeFileAsync("./output/team.html", render.render(teamMembers));

            if (answers.teamMember == "No more team members to add") {
                return answers;
            } else if (answers.teamMember == "Engineer") {
                promptManager(engineerQuestions, "Engineer");
            } else if (answers.teamMember == "Intern") {
                promptManager(internQuestions, "Intern");
            } else {
                console.log("Error");
            }

            return answers;

        }).catch(function (err) {
            console.log(err);
        });

}


console.log("Manager: Please build your team.");

promptManager(managerQuestions, "Manager");

