import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import validatateForm from 'src/app/models/validateform';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "bi-eye-slash-fill";
  signUpForm!: FormGroup;
  showLogin = true;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      isAdmin: [false]  // Add the isAdmin control here
    });
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = " bi-eye-fill" : this.eyeIcon = " bi-eye-slash-fill";
    this.isText ? this.type = "text" : this.type = "password";
  }


  onSignup() {
    if (this.signUpForm.valid) {
      console.log('Form Data:', this.signUpForm.value); // Log form data
      this.auth.signUp(this.signUpForm.value)
        .subscribe({
          next: (res: any) => {
            console.log('Response:', res.message); // Log response
            this.toastr.success(res.message);
            this.signUpForm.reset();
            this.router.navigate(['/login']);
          },
          error: (err: any) => {
            console.error('Signup Error:', err.error); // Log error with title
            this.toastr.error(err.error)
            alert(err.error);
          }
        });
    } else {
      validatateForm.validateAllFormFields(this.signUpForm);
      this.toastr.error('Invalid Form');
    }
  }
}