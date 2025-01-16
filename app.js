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
var empoyeeListEl = document.getElementById('employee-list');
if (!localStorage.getItem("payroll-employees")) {
    localStorage.setItem("payroll-employees", JSON.stringify(employees));
}
var displayEmployees = function () {
    if (localStorage.getItem("payroll-employees")) {
        employees = JSON.parse(localStorage.getItem("payroll-employees"));
    }
    var employeesHTML = employees.map(function (employee) {
        return "\n      <li data-id=\"".concat(employee.id, "\">\n        <h3>").concat(employee.name, "</h3>\n        <input type=\"number\" class=\"salary\" min=\"0\" value=\"").concat(employee.salary, "\">\n        <button class=\"update-salary\">Update</button>\n        <p class=\"smallprint\">Current salary: ").concat(employee.salary, "</p>\n        ").concat(employee.contractEndDate ? "renew <input class=\"renewContract\" type=\"checkbox\" ".concat(employee.contractRenewalFlag ? 'checked' : '', ">") : '', "\n    \n      </li>\n    ");
    }).join("");
    empoyeeListEl.innerHTML = employeesHTML;
};
empoyeeListEl.addEventListener("click", function (e) {
    if (e.target instanceof HTMLElement && e.target.classList.contains("update-salary")) {
        var employee = e.target.closest("li");
        var salaryInput = employee === null || employee === void 0 ? void 0 : employee.querySelector('input[class="salary"]');
        var employeeId_1 = parseInt((employee === null || employee === void 0 ? void 0 : employee.dataset.id) || "0");
        if (!isNaN(parseInt(salaryInput.value))) {
            var filteredEmployees = employees.filter(function (employee) { return employee.id === employeeId_1; });
            var foundEmployee = filteredEmployees.length > 0 ? filteredEmployees[0] : null;
            if (foundEmployee) {
                foundEmployee.salary = parseInt(salaryInput.value);
                localStorage.setItem("payroll-employees", JSON.stringify(employees));
                displayEmployees();
            }
        }
    }
    if (e.target instanceof HTMLElement && e.target.classList.contains("renewContract")) {
        var employeeCheckBox = e.target;
        console.log("check:", employeeCheckBox.checked);
        var employee = e.target.closest("li");
        var employeeId_2 = parseInt((employee === null || employee === void 0 ? void 0 : employee.dataset.id) || "0");
        var filteredEmployees = employees.filter(function (employee) { return employee.id === employeeId_2; });
        var foundEmployee = filteredEmployees.length > 0 ? filteredEmployees[0] : null;
        if (foundEmployee) {
            foundEmployee.contractRenewalFlag = employeeCheckBox.checked;
            console.log(employees);
            localStorage.setItem("payroll-employees", JSON.stringify(employees));
            // displayEmployees();
        }
    }
});
// Init
displayEmployees();
