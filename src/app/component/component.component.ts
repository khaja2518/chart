import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.css']
})
export class ComponentComponent implements OnInit {
  idForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private api: AuthService, private dialogRef: MatDialogRef<ComponentComponent>) { }

  id1data: boolean = false;
  id1d: any
  id2data: boolean = false;
  id2d: any
  
  submit() {
    localStorage.clear()
    console.log("id1=", this.idForm.value.id1)
    console.log("id2=", this.idForm.value.id2)
    if ((this.idForm.value.id1) === "") {
      alert('PCB id is null')
      // console.log("Id 1 is null")
    } else {
      localStorage.setItem('id1', this.idForm.value.id1)
    }
    if ((this.idForm.value.id2) === "") {
      alert('SMA id is null')
      // console.log("Id 2 is null")
    } else {
      localStorage.setItem('id2', this.idForm.value.id2)
    }
    if ((this.idForm.value.id2) === "" && (this.idForm.value.id1) === "") {
      alert('No id')
      // console.log("Id 2 is null")
    } else {
      // localStorage.setItem('id2', this.idForm.value.id2)
    }

    window.location.reload();
  }

  ngOnInit(): void {
    this.idForm = this.formBuilder.group({
      id1: [''],
      id2: ['']
    })
  }
}
