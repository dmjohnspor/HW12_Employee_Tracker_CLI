const addRoleQs = [
    {
        type: "input",
        name: "title",
        message: "Name of new Role:"
    },
    {
        type: "number",
        name: "salary",
        message: "Salary of new Role:"
    },
    {
        type: "list",
        name: "department",
        message: "Select Department for the new Role",
        choices: ["Sales", "Engineering", "Finance", "Legal"]
    }
]

module.exports = addRoleQs;