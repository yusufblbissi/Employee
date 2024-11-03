// src/app/components/employee-details/employee-details.component.ts
import { Component, Input } from '@angular/core';
import { Employee } from '../../services/employee.service';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
  standalone:true
})
export class EmployeeDetailsComponent {
  @Input() employee: Employee | null = null;

  close() {
  }
}
