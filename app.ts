type Employees = {
  id: number;
  name: string;
  position: string;
  salary: number;
  contractEndDate?: string;
  contractRenewalFlag?: boolean;
}

let employees: Employees[] = [
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

const empoyeeListEl = document.getElementById('employee-list')!;

if (!localStorage.getItem("payroll-employees")) {
  localStorage.setItem("payroll-employees", JSON.stringify(employees));
}

const displayEmployees = () => {

  if (localStorage.getItem("payroll-employees")) {
    employees = JSON.parse(localStorage.getItem("payroll-employees")!);
  }

  const employeesHTML = employees.map(employees => {
    return `
      <li data-id="${employees.id}">
        <h3>${employees.name}</h3>
        <input type="number" class="salary" min="0" value="${employees.salary}">
        <button class="update-salary">Update</button>
        <p class="smallprint">Current salary: ${employees.salary}</p>
        ${employees.contractEndDate ? 'renew <input class="renewContract" type="checkbox">' : ''}
    
      </li>
    `
  }).join("");
  empoyeeListEl.innerHTML = employeesHTML;
}

empoyeeListEl.addEventListener("click", (e) => {
  if (e.target instanceof HTMLElement && e.target.classList.contains("update-salary")) {
    const employee = e.target.closest("li");
    const salaryInput = employee?.querySelector('input[class="salary"]') as HTMLInputElement;
    const employeeId = parseInt(employee?.dataset.id || "0");

    if (!isNaN(parseInt(salaryInput.value))) {
      const filteredEmployees = employees.filter(employee => employee.id === employeeId);
      const foundEmployee = filteredEmployees.length > 0 ? filteredEmployees[0] : null;

      if (foundEmployee) {
        foundEmployee.salary = parseInt(salaryInput.value);
        localStorage.setItem("payroll-employees", JSON.stringify(employees));
        displayEmployees();
      }

    }
  }
  if (e.target instanceof HTMLElement && e.target.classList.contains("renewContract"))
  {
    
    const employeeCheckBox = e.target as HTMLInputElement;
    console.log("check:", employeeCheckBox.checked);

  
    
      const employee = e.target.closest("li");
      const employeeId = parseInt(employee?.dataset.id || "0");
      const filteredEmployees = employees.filter(employee => employee.id === employeeId);
      const foundEmployee = filteredEmployees.length > 0 ? filteredEmployees[0] : null;

      if (foundEmployee) {
        foundEmployee.contractRenewalFlag = employeeCheckBox.checked;

        console.log(employees)
        localStorage.setItem("payroll-employees", JSON.stringify(employees));
        // displayEmployees();
      }
    
  }
})

// Init
displayEmployees();

