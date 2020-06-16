// Dependencies:
// ===========================================================
require('dotenv').config();
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");
const figlet = require("figlet");
const chalk = require('chalk');

const initialQs = require("./lib/Initial/initialQs");

const employeeQs = require("./lib/Employee/employeeQs");
const viewEmployeesQs = require("./lib/Employee/viewEmployeesQs");
const addEmployeeQs = require("./lib/Employee/addEmployeeQs");
const updateEmployeeQs = require("./lib/Employee/updateEmployeeQs");
const removeEmployeeQs = require("./lib/Employee/removeEmployeeQs");

const rolesQs = require("./lib/Roles/rolesQs");
const addRoleQs = require("./lib/Roles/addRoleQs");


// Database connection:
// ===========================================================
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "staff_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);

    // Beautiful intro screen with ASCII text art
    figlet("Employee Tracker", function (err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(chalk.greenBright(data));
        start();
    });
});

// General functions:
// ===========================================================

// Starting the app:
const start = () => {
    inquirer.prompt(initialQs)
        .then(res => {
            if (res.choice === "Employees") { employeePrompts() }
            else if (res.choice === "Roles and Salaries") { rolesPrompts() }
            else if (res.choice === "View Departments") { viewDepts() }
            else if (res.choice === "Exit") { connection.end() };
        });
}

const end = () => {
    inquirer.prompt({
        type: "confirm",
        name: "choice",
        message: "Would you like to do something else?",
    })
        .then(res => {
            if (res.choice === true) { start() }
            else {
                console.log("Goodbye!")
                connection.end()
            }
        });
}

// Category: "Employee" - prompts and functions:
// ===========================================================

// After the user choses the "Employees" category, they are presented with these choices:
const employeePrompts = () => {
    inquirer.prompt(employeeQs)
        .then(res => {
            if (res.choice === "View Employees") { viewEmployeesOptions() }
            else if (res.choice === "Add Employee") { addEmployee() }
            else if (res.choice === "Update Employee") { updateEmployee() }
            else if (res.choice === "Remove Employee") { removeEmployee() }
            else if (res.choice === "Exit") { connection.end() }
        });
}

// If the user choses the "View Employees" option:
// Aditional viewing employees criteria:
const viewEmployeesOptions = () => {
    inquirer.prompt(viewEmployeesQs)
        .then(res => {
            if (res.choice === "View All Employees") { viewAllEmpl() }
            else if (res.choice === "View Employees by Department") { viewEmplbyDept() }
            else if (res.choice === "View All Managers") { viewManagers() }
            else if (res.choice === "Exit") { connection.end() }
        });
}
const query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id";

// View all employees:
const viewAllEmpl = () => {
    connection.query(query, function (err, res) {
        if (err) { throw err }
        else { console.table(res) };
        end();
    });
}

// View employees by department:
const viewEmplbyDept = () => {
    inquirer.prompt(
        {
            type: "list",
            name: "choice",
            message: "Select Department:",
            choices: ["Sales", "Engineering", "Finance", "Legal"]
        }
    ).then(res => {
        if (res.choice === "Sales") {
            connection.query(query + " WHERE department.name = 'Sales'", function (err, res) {
                if (err) { throw err }
                else { console.table(res) };
                end();
            });
        }
        else if (res.choice === "Engineering") {
            connection.query(query + " WHERE department.name = 'Engineering'", function (err, res) {
                if (err) { throw err }
                else { console.table(res) };
                end();
            });
        }
        else if (res.choice === "Finance") {
            connection.query(query + " WHERE department.name = 'Finance'", function (err, res) {
                if (err) { throw err }
                else { console.table(res) };
                end();
            });
        }
        else if (res.choice === "Legal") {
            connection.query(query + " WHERE department.name = 'Legal'", function (err, res) {
                if (err) { throw err }
                else { console.table(res) };
                end();
            });
        }
    })
}

// View all managers:
const viewManagers = () => {
    connection.query(query + " WHERE manager_id IS NULL", function (err, res) {
        if (err) { throw err }
        else { console.table(res) };
        end();
    })
}

// Add employee:
const addEmployee = () => {
    inquirer.prompt(addEmployeeQs).then(res => {
        if (res.department === "Sales Lead") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 1
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Salesperson") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 2
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Lead Engineer") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 3
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Software Engineer") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 4
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Lead Accountant") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 5
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Accountant") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 6
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Accountant") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 6
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Legal Team Lead") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 7
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
        else if (res.title === "Lawyer") {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName,
                    role_id: 8
                },
                function (err) {
                    if (err) throw err;
                    console.log("Employee added successfully!");
                    end();
                })
        }
    })
}

// Update employee role:
const updateEmployee = () => {
    inquirer.prompt(updateEmployeeQs).then(res => {
        if (res.newRole === "Sales Lead") {
            connection.query("UPDATE employee SET role_id = 1 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
        else if (res.newRole === "Salesperson") {
            connection.query("UPDATE employee SET role_id = 2 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
        else if (res.newRole === "Lead Engineer") {
            connection.query("UPDATE employee SET role_id = 3 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
        else if (res.newRole === "Software Engineer") {
            connection.query("UPDATE employee SET role_id = 4 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
        else if (res.newRole === "Lead Accountant") {
            connection.query("UPDATE employee SET role_id = 5 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
        else if (res.newRole === "Accountant") {
            connection.query("UPDATE employee SET role_id = 6 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
        else if (res.newRole === "Legal Team Lead") {
            connection.query("UPDATE employee SET role_id = 7 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
        else if (res.newRole === "Lawyer") {
            connection.query("UPDATE employee SET role_id = 8 WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
                if (err) { throw err }
                else { console.log("Employee updated successfuly!") }
                end();
            })
        }
    })
}

// Remove employee:
const removeEmployee = () => {
    inquirer.prompt(removeEmployeeQs).then(res => {
        connection.query("DELETE FROM employee WHERE first_name = ? AND last_name = ?", [res.firstName, res.lastName], function (err) {
            if (err) { throw err }
            else { console.log("Employee removed successfuly!") }
            end();
        })
    })
}

// Category: "Roles and Salaries" - prompts and functions:
// ===========================================================

// After the user choses the "Roles and Salaries" category, they are presented with these choices:
const rolesPrompts = () => {
    inquirer.prompt(rolesQs)
        .then(res => {
            if (res.choice === "View Roles and Salaries") { viewRoles() }
            else if (res.choice === "Add Role") { addRole() }
            else if (res.choice === "Delete Role") { deleteRole() }
            else if (res.choice === "Exit") { connection.end() }
        });
}

// View Roles and Salaries:
const viewRoles = () => {
    connection.query("SELECT id, title, salary FROM role", function (err, res) {
        if (err) { throw err }
        else { console.table(res) };
        end();
    });
}

// Add role:
const addRole = () => {
    inquirer.prompt(addRoleQs).then(res => {
        if (res.department === "Sales") {
            connection.query("INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: 1
                },
                function (err) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    end();
                })
        }
        else if (res.department === "Engineering") {
            connection.query("INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: 2
                },
                function (err) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    end();
                })
        }
        else if (res.department === "Finance") {
            connection.query("INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: 3
                },
                function (err) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    end();
                })
        }
        else if (res.department === "Legal") {
            connection.query("INSERT INTO role SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: 4
                },
                function (err) {
                    if (err) throw err;
                    console.log("Role added successfully!");
                    end();
                })
        }
    })
}

// Delete Role:
const deleteRole = () => {
    inquirer.prompt(
        {
            type: "input",
            name: "title",
            message: "Select Role to delete:"
        })
        .then(res => {
            connection.query("DELETE FROM role WHERE title = ?", [res.title], function (err) {
                if (err) { throw err }
                else { console.log("Role removed successfuly!") }
                end();
            })
        })
}

// Category: "Departments" - prompts and functions:
// ===========================================================

const viewDepts = () => {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) { throw err }
        else { console.table(res) };
        end();
    });
}