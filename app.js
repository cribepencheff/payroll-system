var employees = [
    { id: 1, name: "Alice Johnson", position: "Developer", salary: 55000 },
    { id: 2, name: "Bob Smith", position: "Designer", salary: 48000 },
    { id: 3, name: "Charlie Brown", position: "Marketing", salary: 52000 },
    { id: 4, name: "Diana Rose", position: "HR Manager", salary: 58000 },
    { id: 5, name: "Ethan Green", position: "Sales", salary: 50000 },
    { id: 6, name: "Fiona Blue", position: "Consultant", salary: 60000, contractEndDate: "2025-06-30", contractRenewalFlag: false },
    { id: 7, name: "George White", position: "Consultant", salary: 62000, contractEndDate: "2025-03-15", contractRenewalFlag: true },
    { id: 8, name: "Hannah Black", position: "Consultant", salary: 61000, contractEndDate: "2025-09-01", contractRenewalFlag: false },
    { id: 9, name: "Ivy Gray", position: "Support", salary: 47000 },
    { id: 10, name: "Jack Red", position: "Data Analyst", salary: 53000 },
];
// DOM elements
var empoyeeListEl = document.getElementById('employee-list');
var saveLocaStorage = function () { return localStorage.setItem("payroll-employees", JSON.stringify(employees)); };
var displayEmployees = function () {
    if (localStorage.getItem("payroll-employees")) {
        employees = JSON.parse(localStorage.getItem("payroll-employees"));
    }
    var employeesHTML = employees.map(function (employee) {
        return "\n      <li data-id=\"".concat(employee.id, "\">\n        <h3>\n          ").concat(employee.name, "\n          ").concat(employee.position === "Consultant" ? "\n            <span class=\"emphasize\">\n              (".concat(employee.position, ")\n            </span>") : '', "\n        </h3>\n        <p>Current salary: ").concat(employee.salary, "</p>\n        <input type=\"number\" class=\"salary\" min=\"0\" value=\"").concat(employee.salary, "\">\n        <button class=\"update-salary\">Update</button>\n\n        ").concat(employee.position === "Consultant" ? "\n          <p class=\"smallprint\">\n            Contract ends: ".concat(employee.contractEndDate, "<br>\n            Flag for contract nenewal:<input class=\"renew-contract\" type=\"checkbox\" ").concat(employee.contractRenewalFlag ? 'checked' : '', ">\n          </p>") : '', "\n      </li>\n    ");
    }).join("");
    empoyeeListEl.innerHTML = employeesHTML;
};
// Make sure we save Payroll to localstorage
if (!localStorage.getItem("payroll-employees")) {
    saveLocaStorage();
}
// Click events
empoyeeListEl.addEventListener("click", function (e) {
    var clickEl = e.target;
    var employee = clickEl.closest("li");
    var employeeId = parseInt((employee === null || employee === void 0 ? void 0 : employee.dataset.id) || "0");
    var storedEmployee = employees.find(function (employee) { return employee.id === employeeId; });
    var renewCheckbox = employee.querySelector('input[class="renew-contract"]');
    var salaryInput = employee.querySelector('input[class="salary"]');
    var newSalary = parseInt(salaryInput.value);
    // Renew Contract
    if (storedEmployee && clickEl.classList.contains("renew-contract")) {
        storedEmployee.contractRenewalFlag = renewCheckbox.checked;
        saveLocaStorage();
        displayEmployees();
    }
    // Update salary
    if (storedEmployee && clickEl.classList.contains("update-salary") && !isNaN(newSalary)) {
        storedEmployee.salary = newSalary;
        saveLocaStorage();
        displayEmployees();
    }
});
// Init
displayEmployees();
