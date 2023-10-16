import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {

constructor(private _AuthServies: AuthService, private _Router: Router) {

}

isloading:boolean = false
errorMessage: string = ''

logInForm: FormGroup = new FormGroup({

  email: new FormControl('',
  [Validators.required,
  Validators.email]),

  password: new FormControl('',
  [Validators.required,
  Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)]),

})



logIn(){
  if(this.logInForm.valid){
    this.errorMessage = ''
    this.isloading = true
    this._AuthServies.logIn(this.logInForm.value).subscribe({
      next: (res)=> {
        console.log(res)
        localStorage.setItem("userToken",res.token)
        this._AuthServies.isUserLoggedIn.next(true)
        if(res.message == 'success') {
          this._Router.navigate(['home'])
        }
      },
        error: (err)=> {
          this.errorMessage = err.error.message
          this.isloading = false
        },
    })
  }
  else {
    this.logInForm.markAllAsTouched()
  }
}

}
