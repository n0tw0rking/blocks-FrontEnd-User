import { Component, OnInit } from "@angular/core";
import { ApolloService } from "../../core/apollo.service";
import { AuthService } from "../../core/auth.service";
import { HttpService } from "../../core/http.service";
import { SwUpdate, SwPush } from "@angular/service-worker";
@Component({
  selector: "app-main-page",
  templateUrl: "./main-page.component.html",
  styleUrls: ["./main-page.component.css"]
})
export class MainPageComponent implements OnInit {
  joke: any;
  readonly VAPID_KEY =
    "BIDKneMUisz3eBe-_YA5eA3qm_JAPv6Uz79IIWppgjakBOjpUQYK3E6BbBfcvQaGhKsnodIJ04VYrrvpv256erY";
  constructor(
    private apollo: ApolloService,
    private auth: AuthService,
    private http: HttpService,
    private SwUpdate: SwUpdate,
    private SwPush: SwPush
  ) {}

  ngOnInit() {
    // this.http.gimmeJokes().subscribe(res => {
    //   this.joke = res;
    // });
    this.subscribeToNotification();
    this.apollo.createBlock().subscribe(
      res => {
        console.log(res.data);
      },
      err => {
        console.log(err);
      }
    );
  }
  subscribeToNotification() {
    if (this.SwUpdate.isEnabled) {
      this.SwPush.requestSubscription({
        serverPublicKey: this.VAPID_KEY
      }).then(sub => {
        console.log(sub);
        this.http.postSomething(sub).subscribe(res => {
          console.log(res);
        });
      });
    }
  }
}
