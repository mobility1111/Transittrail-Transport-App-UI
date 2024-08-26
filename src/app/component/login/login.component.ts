import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import validatateForm from 'src/app/models/validateform';
import { AuthService } from 'src/app/services/auth.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';
import { UserStoreService } from 'src/app/services/user-store.service';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash-fill";
  public loginForm!: FormGroup;
  public resetPasswordEmail!: string;
  public isValidEmail!: boolean;

  constructor(
    private fb: FormBuilder, 
    private auth: AuthService, 
    private router: Router,
    private toastr: ToastrService,
    private userStore: UserStoreService,
    private resetService: ResetPasswordService
    ){}

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['', Validators.required]
    })
   }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = " bi-eye-fill" : this.eyeIcon = " bi-eye-slash-fill";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onLogin() {
   if(this.loginForm.valid){

    console.log(this.loginForm.valid)
    //send the obj to database
    this.auth.login(this.loginForm.value)
    .subscribe({
      next:(res)=>{
        console.log(res.message);
        //alert(res.message)
        this.toastr.success('Login Success')
        this.loginForm.reset();
        this.auth.storeToken(res.accessToken);
        this.auth.storeRefreshToken(res.refreshToken)
        const tokenPayload = this.auth.decodedToken();
        this.userStore.setFullNameForStore(tokenPayload.name);
        this.userStore.setRoleForStore(tokenPayload.role);
        this.router.navigate(['dashboard'])
      },
      error:(err)=>{
        //console.error('Login Error:', err.error);
        this.toastr.error(err.error)
        alert(err.error)
        //console.error('Signup Error:', err.error);
        //this.toastr.error(err.error)
        
      }
  
    })
   }else{
    //throw error
    validatateForm.validateAllFormFields(this.loginForm);
    this.toastr.error("Your form is invalid")
        
    //alert("Your form is invalid");
   }
  }

  checkValidEmail(event: string){
    const value = event;
    const Pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
    this.isValidEmail = Pattern.test(value);
    return this.isValidEmail;
}

confirmToSend(){
  if(this.checkValidEmail(this.resetPasswordEmail)){
    console.log(this.resetPasswordEmail);
    this.resetService.sendResetPsswordLink(this.resetPasswordEmail)
    .subscribe({
      next:(res)=>{
        this.toastr.success('Email sent, check your email');
        this.resetPasswordEmail = "";
        const buttonRef = document.getElementById("closeBtn");
        buttonRef?.click();

      },
      error:(err)=>{
        this.toastr.error('Something went wrong');
      
      }
    })
  }
}

}