type Employee = {
  id: number;
  name: string;
  position: string;
  salary: number;
  contractEndDate?: string;
  contractRenewalFlag?: boolean;
}

let employees: Employee[] = [
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
const empoyeeListEl = document.getElementById('employee-list')!;

const saveLocaStorage = () => localStorage.setItem("payroll-employees", JSON.stringify(employees));

const displayEmployees = () => {
  if (localStorage.getItem("payroll-employees")) {
    employees = JSON.parse(localStorage.getItem("payroll-employees")!);
  }

  const employeesHTML = employees.map(employee => {
    return `
      <li data-id="${employee.id}">
        <h3>
          ${employee.name}
          ${employee.position === "Consultant" ? `
            <span class="emphasize">
              (${employee.position})
            </span>` : ''}
        </h3>
        <p>Current salary: ${employee.salary}</p>
        <input type="number" class="salary" min="0" value="${employee.salary}">
        <button class="update-salary">Update</button>

        ${employee.position === "Consultant" ? `
          <p class="smallprint">
            Contract ends: ${employee.contractEndDate}<br>
            Flag for contract nenewal:<input class="renew-contract" type="checkbox" ${employee.contractRenewalFlag ? 'checked' : ''}>
          </p>` : ''}
      </li>
    `
  }).join("");

  empoyeeListEl.innerHTML = employeesHTML;
}

// Make sure we save Payroll to localstorage
if (!localStorage.getItem("payroll-employees")) {
  saveLocaStorage();
}

// Click events
empoyeeListEl.addEventListener("click", (e) => {
  const clickEl = e.target as HTMLElement;
  const employee = clickEl.closest("li") as HTMLLIElement;
  const employeeId: number = parseInt(employee?.dataset.id || "0");
  const storedEmployee: Employee | undefined = employees.find(employee => employee.id === employeeId);
  const renewCheckbox = employee.querySelector('input[class="renew-contract"]') as HTMLInputElement;
  const salaryInput = employee.querySelector('input[class="salary"]') as HTMLInputElement;
  const newSalary: number = parseInt(salaryInput.value);

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
})

// Init
displayEmployees();
