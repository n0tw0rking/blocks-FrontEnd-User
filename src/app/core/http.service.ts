import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class HttpService {
  // public notificationUrl = "https://blocks-backend.herokuapp.com/push";
  public notificationUrl = "http://localhost:4000/push";
  constructor(private http: HttpClient) {}

  postSomething(sub: any) {
    return this.http.post(this.notificationUrl, sub);
  }
  gimmeJokes() {
    return this.http.get("https://api.chucknorris.io/jokes/random");
  }
}
