import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService, Employee } from '../../services/employee.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule]
})
export class EmployeeFormComponent implements OnInit {
  @Input() employee: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();
  employeeForm: FormGroup;

  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      department: [''],
      email: ['', [Validators.email]],
      performanceRating: [1, [Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit() {
    if (this.employee) {
      this.employeeForm.patchValue({
        name: this.employee.name,
        position: this.employee.position,
        department: this.employee.department,
        email: this.employee.email,
        performanceRating: this.employee.performanceRating
      });
    }
  }

  submit() {
    if (this.employeeForm.valid) {
      const employeeData: Employee = {
        id: this.employee ? this.employee.id : 0,
        ...this.employeeForm.value
      };
      this.save.emit(employeeData);
      this.employeeForm.reset();
    }
  }

}
