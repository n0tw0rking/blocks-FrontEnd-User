import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { AuthService } from "../../core/auth.service";
import { SubscriptionService } from "../../core/subscription.service";
@Component({
  selector: "app-dash-board",
  templateUrl: "./dash-board.component.html",
  styleUrls: ["./dash-board.component.css"]
})
export class DashBoardComponent implements OnInit {
  data: any = {};
  arr: any = [];
  subscription: any;
  status: boolean;
  public currentUser = localStorage.getItem("currentUser");
  constructor(
    private apollo: ApolloService,
    private auth: AuthService,
    private sub: SubscriptionService
  ) {}

  ngOnInit() {
    if (this.sub.sub === undefined) {
      console.log("99999999999");
      this.status = false;
    } else {
      this.subscription = this.sub.sub;
      console.log("!!!!!!!");
      console.log(this.subscription);
      console.log("!!!!!!!");
      this.status = true;
    }

    this.apollo.getUser(this.currentUser).subscribe(
      res => {
        //only user with the subscription can loged in so its even for the admin with subscription
        console.log(res.data.oneUser.userSubscription);
        console.log(res.data);
        this.data = res.data.oneUser;
        this.arr = this.data.userSubscription;
      },
      err => {
        console.log(err);
      }
    );
  }
}
