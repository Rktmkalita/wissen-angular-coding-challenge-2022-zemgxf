import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
/**
 * Modify the login component and the login template to collect login details and add the validators as necessary
 */
import { AuthenticationService } from "../services/authentication.service";

@Component({
  templateUrl: "login.component.html"
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  authResponse: any;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // setup the loginform and validators
    this.loginForm = this.formBuilder.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

  get f() { return this.loginForm.controls; }

  ngOnDestroy() {}

  onSubmit() {
    this.submitted=true;
    this.authenticationService.login(this.f.userName.value,this.f.password.value).subscribe(
      (data: any) => {
        this.message="Successfully Logged in"
        console.log(data);
        this.authResponse = data;
        this.authenticationService.loginUser(this.authResponse.token);
        console.log(this.authenticationService.getToken());
        this.router.navigate(['/welcome/', this.authenticationService.loginUserName]);
      },
      (err) => {
        console.log(err.error);
        this.message='User or Password incorrect';
      }
    );
  }

  // implement the username validator. Min 6 characters and no digits, special chars
  usernameValidator(control: AbstractControl) {
    const str = control.value;
    var digits = new RegExp(
      "^(?=.*\\d).+$"
    );
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (str.length<6 || digits.test(str) || format.test(str)) {
      return { invalidUserName: true };
    }
    return null;
  }

  // implement the password validator
  // Min 1 uppercase, 1 lower case and a digit. Total length >= 8
  passwordValidator(control: AbstractControl) {
    const str = control.value;
    var pattern = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$"
    );
    if (str.length<8 || !pattern.test(str)) {
      return { invalidPassword: true };
    }
    return null;
  }
}
