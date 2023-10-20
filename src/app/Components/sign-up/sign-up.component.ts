import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})


export class SignUpComponent {

constructor(private _AuthServies: AuthService, private _Router: Router) {

}

isloading:boolean = false
errorMessage: string = ''

registerForm: FormGroup = new FormGroup({
  name: new FormControl('',
  [Validators.required,Validators.minLength(3),
  Validators.maxLength(20),
  Validators.pattern(/^[A-Z][A-Za-z0-9\s]*$/)]),

  email: new FormControl('',
  [Validators.required,
  Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]),

  password: new FormControl('',
  [Validators.required,
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),

  rePassword: new FormControl('',
  [Validators.required,
  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]),

  phone: new FormControl('',
  [Validators.required,
  Validators.pattern(/^01[0125][0-9]{8}$/)]),
})



register(){
  if(this.registerForm.valid){
    this.errorMessage = ''
    this.isloading = true
    this._AuthServies.register(this.registerForm.value).subscribe({
      next: (res)=> {
        console.log(res)
        if(res.message == 'success') {
          this._Router.navigate(['login'])
        }
      },
        error: (err)=> {
          this.errorMessage = err.error.message
          this.isloading = false
        },
    })
  }
  else {
    this.registerForm.markAllAsTouched()
  }
}

matchingPassword(password:string , repassword:string): boolean{
  if(password==repassword){
    return true;
  }
  else {
    return false;
  }
}

}

