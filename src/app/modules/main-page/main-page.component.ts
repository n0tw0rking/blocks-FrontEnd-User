import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  data: any = {};
  arr: any = [];
  public currentUser = localStorage.getItem("currentUser");
  constructor(private apollo: ApolloService) {}

  ngOnInit() {
    this.apollo.getUser(this.currentUser).subscribe(
      res => {
        console.log(res.data);
        this.data = res.data.oneUser;
        this.arr = this.data.userSubscription;
      },
      err => {
        console.log(err);
      }
    );

    //   this.apollo.getService().subscribe(
    //     res => {
    //       console.log(res.data);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
    //   this.apollo.getSubscription().subscribe(
    //     res => {
    //       console.log(res.data);
    //     },
    //     err => {
    //       console.log(err);
    //     }
    //   );
  }
}
