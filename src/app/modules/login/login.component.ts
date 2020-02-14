import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../../core/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ApolloService } from "../../core/apollo.service";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any = "";
  notifyMessage = "";
  submitted = false;
  loading = true;
  public currentUser;

  constructor(
    private formbuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private apollo: ApolloService
  ) {}

  ngOnInit() {
    this.submitted = false;
    this.createForm();
    this.route.params.subscribe(params => {
      if (params.registered === "success") {
        this.notifyMessage =
          "You have been successfully registered, you can log in now";
      }
    });
  }

  createForm() {
    this.loginForm = this.formbuilder.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  isInvalidForm(fieldName): boolean {
    return (
      this.loginForm.controls[fieldName].invalid &&
      (this.loginForm.controls[fieldName].dirty ||
        this.loginForm.controls[fieldName].touched)
    );
  }
  isRequired(fieldName): boolean {
    return this.loginForm.controls[fieldName].errors.required;
  }

  login() {
    if (this.isInvalidForm("email")) {
      console.log(this.loginForm.controls["email"]);

      return (this.errors =
        this.loginForm.controls["email"].status === "INVALID"
          ? "Invalid Email"
          : "");
    }
    this.submitted = true;
    this.auth.login(this.loginForm.value).subscribe(
      token => {
        this.loading = token.loading;
        if (token.errors) {
          this.submitted = false;
          console.log(token.errors[0].message);
          this.errors = token.errors[0].message;
        } else {
          console.log("this is the user");
          this.currentUser = localStorage.getItem("currentUser");
          this.apollo.getUser(this.currentUser).subscribe(
            res => {
              //only user with the subscription can loged in so its even for the admin with subscription
              // console.log(res.data.oneUser.userSubscription);
              this.submitted = false;
              if (res.data.oneUser.userSubscription.length === 0) {
                this.auth.logout();
              } else {
                this.router.navigate(["/dash"]);
              }
            },
            err => {
              console.log(err);
            }
          );
        }
      },
      errorResponse => {
        console.log(errorResponse);
      }
    );
  }
}
