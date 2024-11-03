import { Injectable } from '@angular/core';

export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email?: string;
  performanceRating: number;
  performanceHistory?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private localStorageKey = 'employees';
  private mockData: Employee[] = [
  ];

  constructor() {
    if (!localStorage.getItem(this.localStorageKey)) {
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.mockData));
    }
  }

  getEmployees(): Employee[] {
    const data = localStorage.getItem(this.localStorageKey);
    return data ? JSON.parse(data) : this.mockData;
  }

  addEmployee(employee: Employee) {
    const employees = this.getEmployees();
    employee.id = employees.length ? employees[employees.length - 1].id + 1 : 1;
    employees.push(employee);
    this.updateLocalStorage(employees);
  }

  updateEmployee(updatedEmployee: Employee) {
    const employees = this.getEmployees().map(emp =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    this.updateLocalStorage(employees);
  }
  deleteEmployee(id: number) {
    const employees = this.getEmployees().filter(emp => emp.id !== id);
    this.updateLocalStorage(employees);
  }
  resetData() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.mockData));
  }

  private updateLocalStorage(employees: Employee[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(employees));
  }
}
