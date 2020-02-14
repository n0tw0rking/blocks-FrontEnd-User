import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { SwUpdate } from "@angular/service-worker";
// import { AuthService } from "./core/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "blocks-FrontEnd-Users";
  showMobileMenu = false;
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
  toggleSidebar() {
    this.showMobileMenu = true;
  }
  // Fucntion that checks if the location router on the window is /main
  isMain() {
    if (this.router.url == "/main") {
      return true;
    }
    console.log(this.router.url);
    return false;
  }

  isLogin() {
    if (this.router.url == "/login") {
      return true;
    }
    return false;
  }
}
