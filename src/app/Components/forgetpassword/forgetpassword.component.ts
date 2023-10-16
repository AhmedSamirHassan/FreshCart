import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpasswordService } from 'src/app/Services/forgetpassword.service';


@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent {
  step1:boolean = true
  step2:boolean = false
  step3:boolean = false
  email: string = ""
  userMessage: string = ''

  constructor(private _forgetpasswordService:ForgetpasswordService, private _Router:Router){}
  forgetform : FormGroup = new FormGroup ({
    email : new FormControl('',
    [Validators.required,
    Validators.email])
  })

  resetCodeForm : FormGroup = new FormGroup ({
    resetCode : new FormControl('')
  })

  newPasswordForm : FormGroup = new FormGroup ({
    newPassword : new FormControl('',
    [Validators.required,
    Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)])
  })


  forgetPassword():void {
    let userEmail = this.forgetform.value
    this.email = userEmail.email
    this._forgetpasswordService.forgetPassword(userEmail).subscribe({
      next:(res)=>{
        console.log(res)
        this.userMessage = res.message
        this.step1 = false
        this.step2 = true
      },
      error:(err)=>{
        this.userMessage = err.error.message
      }
    })
  }

  resetPassword():void {
    let resetCode = this.resetCodeForm.value
    this._forgetpasswordService.resetCode(resetCode).subscribe({
      next: (res)=>{
        console.log(res)
        this.userMessage = res.status
          this.step2 = false
          this.step3 = true
      },
      error:(err)=>{
        this.userMessage = err.error.message
      }
    })
  }

  updatePassword():void {
    let resetForm = this.newPasswordForm.value
    resetForm.email = this.email
    this._forgetpasswordService.resetPassword(resetForm).subscribe({
      next: (res)=>{
        if(res?.token){
          localStorage.setItem('userToken',res.token)
          this._Router.navigate(['/login'])
        }
      }, error:(err)=>{
        this.userMessage = err.error.message
      }
    })
  }
}
