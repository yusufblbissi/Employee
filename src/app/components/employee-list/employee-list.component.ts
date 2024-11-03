import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Employee, EmployeeService } from '../../services/employee.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, EmployeeFormComponent, EmployeeDetailsComponent]
})
export class EmployeeListComponent {
  employees: Employee[] = [];
  searchTerm: string = '';
  sortBy: string = 'name';
  selectedEmployee: Employee | null = null;
  @ViewChild('content', { static: true }) content!: TemplateRef<any>;
  @ViewChild('detailsModal', { static: true }) detailsModal!: TemplateRef<any>;

  constructor(private employeeService: EmployeeService, private modalService: NgbModal) {
    this.employees = this.employeeService.getEmployees();
  }

  get filteredEmployees() {
    return this.employees
      .filter(emp =>
        emp.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        emp.department.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (this.sortBy === 'name' || this.sortBy === 'department') {
          return a[this.sortBy].localeCompare(b[this.sortBy]);
        } else if (this.sortBy === 'performanceRating') {
          return a.performanceRating - b.performanceRating;
        }
        return 0;
      });
  }

  resetData() {
    this.employeeService.resetData();
    this.employees = this.employeeService.getEmployees();
  }
  openDetails(employee: Employee) {
    this.selectedEmployee = employee;
    this.modalService.open(this.detailsModal);
  }

  open(content: any, employee: Employee | null = null) {
    this.selectedEmployee = employee;
    this.modalService.open(content);
  }

  saveEmployee(employeeData: Employee) {
    if (this.selectedEmployee) {
      this.employeeService.updateEmployee({ ...this.selectedEmployee, ...employeeData });
    } else {
      this.employeeService.addEmployee(employeeData);
    }
    this.modalService.dismissAll();
    this.employees = this.employeeService.getEmployees();
  }
  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
      this.employees = this.employeeService.getEmployees();
    }
  }
  editEmployee(employee: Employee) {
    this.open(this.content, employee);
  }
}
