USE staff_db;

INSERT INTO department (name)
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 200000, 1), ("Salesperson", 100000, 1),
("Lead Engineer", 250000, 2), ("Software Engineer", 160000, 2),
("Lead Accountant", 180000, 3), ("Accountant", 100000, 3),
("Legal Team Lead", 250000, 4), ("Lawyer", 200000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bruce", "Wayne", 1, NULL), ("Dick", "Grayson", 2, 1),
("Clark", "Kent", 3, NULL), ("Lois", "Lane", 4, 3),
("Mary Jane", "Watson", 5, NULL), ("Peter", "Parker", 6, 5),
("Jack", "Napier", 7, NULL), ("Harleen", "Quinzel", 8, 7); 

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;