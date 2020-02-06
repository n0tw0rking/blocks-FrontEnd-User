import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { SubscriptionService } from "../../core/subscription.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.css"]
})
export class SubscriptionComponent implements OnInit {
  data: any = {};
  arr: any = [];
  public currentUser = localStorage.getItem("currentUser");
  constructor(
    private apollo: ApolloService,
    private sub: SubscriptionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.apollo.getUser(this.currentUser).subscribe(
      res => {
        //only user with the subscription can loged in so its even for the admin with subscription

        console.log(res.data);
        this.data = res.data.oneUser;
        this.arr = this.data.userSubscription;
      },
      err => {
        console.log(err);
      }
    );
  }
  selectSub(subscription) {
    console.log(subscription);
    this.sub.sub = subscription;
    this.router.navigate(["/dash"]);
  }
}
