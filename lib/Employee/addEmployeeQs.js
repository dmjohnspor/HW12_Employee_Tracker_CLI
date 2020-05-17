const addEmployeeQs = [
    {
        type: "input",
        name: "firstName",
        message: "First Name:"
    },
    {
        type: "input",
        name: "lastName",
        message: "Last Name:"
    },
    {
        type: "list",
        name: "title",
        message: "Select Employee's Title:",
        choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Lead Accountant", "Accountant", "Legal Team Lead", "Lawyer"]
    }
]

module.exports = addEmployeeQs;