import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { AuthService } from "../../core/auth.service";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  data: any = {};
  arr: any = [];
  public currentUser = localStorage.getItem("currentUser");
  constructor(private apollo: ApolloService, private auth: AuthService) {}

  ngOnInit() {
    this.apollo.getUser(this.currentUser).subscribe(
      res => {
        //only user with the subscription can loged in so its even for the admin with subscription
        console.log(res.data.oneUser.userSubscription);
        this.arr = res.data.oneUser.userSubscription.length;
        console.log(this.arr);
        if (this.arr === 0) {
          this.auth.logout();
        } else {
          console.log(res.data);
          this.data = res.data.oneUser;
          this.arr = this.data.userSubscription;
        }
      },
      err => {
        console.log(err);
      }
    );
  }
}
