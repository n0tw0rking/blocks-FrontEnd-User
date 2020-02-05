import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
@Component({
  selector: "app-subscription",
  templateUrl: "./subscription.component.html",
  styleUrls: ["./subscription.component.css"]
})
export class SubscriptionComponent implements OnInit {
  data: any = {};
  arr: any = [];
  public currentUser = localStorage.getItem("currentUser");
  constructor(private apollo: ApolloService) {}

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
}
