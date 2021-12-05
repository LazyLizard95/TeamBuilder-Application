const inquirer = require('inquirer');
const fs = require('fs');
const generate = require('./genhtml');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engi = require('./lib/Engi');
const idgen = require('./data/idgen');
const employees = []

function startBuilder() {
    inquirer
        .prompt([{
            type: "list",
            name: "pos",
            message: "What is your team position?",
            choices: [new inquirer.Separator(), "Manager", new inquirer.Separator(), "Engineer", new inquirer.Separator(), "Intern"]
        },
        {
            type: "input",
            name: "name",
            message: "Please enter your name"
        },
        {
            type: "input",
            name: "email",
            message: "Please enter your email address",
        }

        ]).then(data => {
            if (data.email.includes('@')) {
                switch (data.pos) {
                    case 'Manager':
                        const manager = new Manager(data.pos, data.name, data.email, data.officeNum);
                        isManager(manager);
                        break;
                    case 'Engineer':
                        const engi = new Engi(data.pos, data.name, data.email, data.gitHub)
                        isEngineer(engi);
                        break;
                    case 'Intern':
                        const intern = new Intern(data.pos, data.name, data.email, data.school)
                        isIntern(intern);
                        break;
                    default:
                        console.log("error invalid team position, restart app");
                        break;
                }
            } else { invalidEmailString = data.email; invalidEmail(invalidEmailString); }
        })
}

function isManager(manager) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "officeNum",
                message: "What is your office number?"
            }
        ]).then(data => {
            manager.officeNum = data.officeNum;
            manager.id = idgen();
            employees.push(manager);
            verifyCompletion();
        })
}
function isEngineer(engi) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "gitHub",
                message: "What is your GitHub username?"
            }

        ]).then(data => {
            {
                engi.gitHub = data.gitHub;
                engi.id = idgen();
                employees.push(engi);
                verifyCompletion();
            }
        })
}
function isIntern(intern) {
    inquirer
        .prompt([
            {
                type: "input",
                name: "school",
                message: "Where do you go to school?"
            }
        ]).then(data => {
            {
                intern.school = data.school;
                intern.id = idgen();
                employees.push(intern);
                verifyCompletion();
            }
        })
}

function verifyCompletion() {
    inquirer
        .prompt([{
            type: "list",
            name: "restart",
            message: "Would you like to add more members?",
            choices: [new inquirer.Separator(), "Yes please", new inquirer.Separator(), "No thank-you"]
        }
        ]).then(data => {
            if (data.restart === 'Yes please') { startBuilder(); }
            else { for (i = 0; i < employees.length; i++) { generate(employees[i]) } }
        })
}

function invalidEmail(invalidEmailString) {
    inquirer
        .prompt([{
            type: "confirm",
            name: "notify",
            message: "The email you have entered is not valid. Type Y to continue, N to terminate and display the invalid email.",
        }]).then(data => {
            if (data.notify === true) { startBuilder(); }
            else { console.log(`The email you entered was ${invalidEmailString}`) }
        })
}

startBuilder();


