import { EventEmitter, Injectable, Output } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
// import { ApolloService } from "./apollo.service";
import { Apollo } from "apollo-angular";
import gql from "graphql-tag";
@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user;
  public isAuthed = !!localStorage.getItem("currentUser");
  public isSuperAdmin: boolean;
  public isAdmin: boolean;

  @Output() getIsAuthed: EventEmitter<any> = new EventEmitter();
  constructor(
    private http: HttpClient,
    private router: Router,
    private apollo: Apollo // private apollo: ApolloService
  ) {
    console.log(this.isAuthed);
    this.getIsAuthed.emit(this.isAuthed);
  }
  public login(userData: any): Observable<any> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          query($email: String!, $password: String!) {
            login(userInput: { email: $email, password: $password }) {
              token
              userId
              isAdmin
              isSuperAdmin
            }
          }
        `,
        variables: {
          email: userData.email,
          password: userData.password
        },
        errorPolicy: "all"
      })
      .valueChanges.pipe(
        map((res: any) => {
          console.log(res);
          // this.user = res.admin;
          if (res.data.login) {
            this.user = res.data.login.userId;
            this.isSuperAdmin = res.data.login.isSuperAdmin;
            this.isAdmin = res.data.login.isAdmin;
            if (this.isSuperAdmin || this.isAdmin) {
              this.saveTokenAndCurrentUser(res.data.login.token);
            }
          }
          return res;
          // return this.saveTokenAndCurrentUser(res.data.login.token);
        })
      );
  }
  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    this.isAuthed = false;
    this.router.navigate(["/login"]);
    this.getIsAuthed.emit(this.isAuthed);
  }
  private saveTokenAndCurrentUser(token: string): string {
    localStorage.setItem("token", token);
    console.log(this.user);
    localStorage.setItem("currentUser", this.user);
    this.isAuthenticated().subscribe(res => {
      console.log("isAuthenticated query", res);
    });
    return token;
  }
  public getToken(): string {
    return localStorage.getItem("token");
  }
  public isAuthenticated(): any {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            isAuth
          }
        `,
        errorPolicy: "all"
      })
      .valueChanges.pipe(
        map((user: any) => {
          this.isAuthed =
            user.data.isAuth === localStorage.getItem("currentUser");
          console.log(user.data.isAuth);
          this.getIsAuthed.emit(this.isAuthed);
          return this.isAuthed;
        })
      );
  }
  public getCurrentUserName(): string {
    return JSON.parse(localStorage.getItem("currentUser")).name;
  }

  public isAuthSuperAndAdmin(): any {
    return this.apollo.watchQuery<any>({
      query: gql`
          query {
            isSuperIsAdmin(id: "${localStorage.getItem("currentUser")}") {
              isAdmin
              isSuperAdmin
            }
          }
        `,
      errorPolicy: "all"
    }).valueChanges;
  }
}
