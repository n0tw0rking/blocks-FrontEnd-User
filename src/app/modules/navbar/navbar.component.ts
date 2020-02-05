import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../core/auth.service";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  isAuthed: boolean;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onLogout() {
    this.auth.logout();
    this.isAuthed = this.auth.isAuthed;
  }
  onLogin() {
    this.isAuthed = this.auth.isAuthed;
    return this.isAuthed;
  }
}
