import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { AuthService } from "../../core/auth.service";
import { HttpService } from "../../core/http.service";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  joke: any;
  constructor(
    private apollo: ApolloService,
    private auth: AuthService,
    private http: HttpService
  ) {}

  ngOnInit() {
    this.http.gimmeJokes().subscribe(res => {
      this.joke = res;
    });
  }
}
