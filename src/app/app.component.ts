import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
// import { AuthService } from "./core/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "blocks-FrontEnd-Users";
  constructor(private router: Router, updates: SwUpdate) {
    updates.available.subscribe(event => {
      updates.activateUpdate().then(() => document.location.reload());
    });
  }

  ngOnInit() {
    let signInData = localStorage.getItem("token");

    if (!signInData) {
      console.log(signInData);
      // this.router.navigate(["login"]);
    }
  }
}
