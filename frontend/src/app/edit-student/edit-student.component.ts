import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {

  addStudent:any;
  id:any
  
  constructor(private fb:FormBuilder, private routes:Router, private studentservice: StudentsService, private url:ActivatedRoute) {
    this.addStudent = fb.group(
      {
        first_name:['',Validators.required],
        last_name:['',Validators.required],
        email:['',Validators.required],
        password:['',Validators.required],
      }
    )
   }

  ngOnInit(): void {
    this.id = this.url.snapshot.params['id'];
    this.studentservice.singleStudent(this.id).subscribe(data=> {
      this.addStudent.patchValue(data);
    })
  }

  onSubmit() {
    this.studentservice.updateStudent(this.id, this.addStudent.value).subscribe((data:any) => {
      this.routes.navigate(['/list-student']);
    })
  } 

}
