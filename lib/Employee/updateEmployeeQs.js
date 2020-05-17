const updateEmployeeQs = [
    {
        type: "input",
        name: "firstName",
        message: "First name of employee to update:"
    },
    {
        type: "input",
        name: "lastName",
        message: "Last name of employee to update:"
    },
    {
        type: "list",
        name: "newRole",
        message: "Chose employee's new title:",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Lead Accountant", "Accountant", "Legal Team Lead", "Lawyer"]
    }
]

module.exports = updateEmployeeQs;