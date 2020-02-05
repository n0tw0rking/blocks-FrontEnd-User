import { Component } from "@angular/core";
import { Router } from "@angular/router";
// import { AuthService } from "./core/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "blocks-FrontEnd-Users";
  constructor(private router: Router) {}

  ngOnInit() {
    let signInData = localStorage.getItem("token");

    if (!signInData) {
      console.log(signInData);
      // this.router.navigate(["login"]);
    }
  }
}
