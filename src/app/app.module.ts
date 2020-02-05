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
import { AuthGuard } from "./core/auth.guard";
import { NavbarComponent } from "./modules/navbar/navbar.component";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashBoardComponent,
    MainPageComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GraphQLModule
  ],
  providers: [
    AuthService,
    AuthGuard,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
