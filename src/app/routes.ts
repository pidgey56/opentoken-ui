import {Routes} from "@angular/router";
import {HelloWorldComponent} from "./hello-world/hello-world.component";
import {WelcomeComponent} from "./welcome/welcome.component";

export const appRoutes: Routes = [
  { path: "hello-world", component: HelloWorldComponent },
  { path: "", component: WelcomeComponent },
  { path: "**", redirectTo: "/" }
];
