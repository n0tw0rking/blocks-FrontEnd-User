import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "./core/auth.guard";
import { LoginComponent } from "./modules/login/login.component";
import { DashBoardComponent } from "./modules/dash-board/dash-board.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
const routes: Routes = [
  // { path: "super", component: SuperAdminComponent, canActivate: [AuthGuard] },

  { path: "login", component: LoginComponent },
  { path: "", component: MainPageComponent },
  { path: "dash", component: DashBoardComponent, canActivate: [AuthGuard] }
  // // { path:'user', component: UserComponent,  canActivate:[AuthGuard] ,
  // {
  //   path: "user",
  //   component: UserComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: "", component: UserComponent },
  //     { path: ":id", component: UserComponent }
  //   ]
  // },
  // {
  //   path: "services",
  //   component: ServicesPageComponent,
  //   canActivate: [AuthGuard]
  // },
  // { path: "blocks", component: BlocksPageComponent, canActivate: [AuthGuard] },
  // // { path: "blocks", component: BlocksPageComponent },
  // {
  //   path: "blocks",
  //   component: BlocksPageComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: "", component: BlockComponent },
  //     { path: ":id", component: BlockComponent }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
