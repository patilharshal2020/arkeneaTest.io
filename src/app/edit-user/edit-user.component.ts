import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

type userInfo={
  name: string,
  domain: string,
  dob: string,
  gender: string,
  pNumber: string,
  location: string,
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
  
export class EditUserComponent implements OnInit {

  userFormGroup: FormGroup = new FormGroup ({
    name: new FormControl('', Validators.required),
    domain: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    pNumber: new FormControl('', Validators.required),
    location: new FormControl(''),
  })

  userDetails: userInfo = {
    name: '',
    domain: '',
    dob: '',
    gender: '',
    pNumber: '',
    location: '',
  }
  submitted = false;
  year = new Date().getFullYear();
  constructor(@Inject(MAT_DIALOG_DATA) public data: [], private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EditUserComponent>) { }

  ngOnInit(): void {
    this.userFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      domain: [''],
      dob: [''],
      gender: [''],
      pNumber: ['', Validators.minLength(10)],
      location: [''],
    })
  }

  
  get f(): { [key: string]: AbstractControl } {
    return this.userFormGroup.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.userFormGroup.invalid) {
      return;
    }
    this.userDetails.name = this.userFormGroup?.get('name')?.value;
    this.userDetails.domain = this.userFormGroup?.get('domain')?.value;
    this.userDetails.gender = this.userFormGroup?.get('gender')?.value;
    this.userDetails.dob = this.userFormGroup?.get('dob')?.value;
    this.userDetails.pNumber = this.userFormGroup?.get('pNumber')?.value;
    this.userDetails.location = this.userFormGroup?.get('location')?.value;
    this.dialogRef.close(this.userDetails);
  }
  onReset(): void {
    this.submitted = false;
    this.userFormGroup.reset();
  }
}
