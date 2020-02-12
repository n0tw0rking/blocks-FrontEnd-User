import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./modules/login/login.component";
import { DashBoardComponent } from "./modules/dash-board/dash-board.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { AppRoutingModule } from "./app-routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { GraphQLModule } from "./graphql.module";
import { TokenInterceptor } from "./core/token-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthService } from "./core/auth.service";
import { SubscriptionService } from "./core/subscription.service";
import { ApolloService } from "./core/apollo.service";
import { AuthGuard } from "./core/auth.guard";
import { NavbarComponent } from "./modules/navbar/navbar.component";
import { SubscriptionComponent } from "./modules/subscription/subscription.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
import { HttpService } from "./core/http.service";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    MainPageComponent,
    NavbarComponent,
    SubscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GraphQLModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production
    })
  ],
  providers: [
    ApolloService,
    SubscriptionService,
    AuthService,
    AuthGuard,
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
