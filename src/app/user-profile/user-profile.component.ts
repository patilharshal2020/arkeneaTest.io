import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

type userData = { label: string, value: string, id: number };
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {


  userDetails: userData[] = [
    {label: 'Name:', value: 'harshal', id: 1},
    {label: 'Domain:', value: 'www.mjhattorenys.com', id: 2},
    {label: 'Gender:', value: 'Male', id: 3},
    {label: 'Date of Birth:', value: '8th June 1979', id: 4},
    {label: 'Phone Number:', value: '+8654321234', id: 5},
    {label: 'Location:', value: '12 streat, Silicon Valley, Avenue NE, Huntsville', id: 6}
  ];
  


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: this.userDetails,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      const res = result;
      if (res) {
        this.userDetails.forEach(x => {
          if (x.id === 1) {
            x.value = result.name;
          }
          if (x.id === 2) {
            x.value = result.domain;
          }
          if (x.id === 3) {
            x.value = result.gender;
          }
          if (x.id === 4) {
            const dates = new Date(result.dob);
            const date = (new Intl.DateTimeFormat('en-US').format(dates));
            x.value = date;
          }
          if (x.id === 5) {
            x.value = result.pNumber;
          }
          if (x.id === 6) {
            x.value = result.location;
          }
        })
      }
    });
  }


}
