import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HeaderComponent } from "./layout/header/header.component";
import { FooterComponent } from "./layout/footer/footer.component";
import { HelloWorldComponent } from "./hello-world/hello-world.component";
import { ReactiveFormsModule } from "@angular/forms";
import { WelcomeComponent } from "./welcome/welcome.component";
import { MaterialModule } from "./material/material.module";
import { SharedModule } from "./shared/shared.module";
import { LayoutModule } from "./layout/layout.module";

@NgModule({
  declarations: [AppComponent, HelloWorldComponent, WelcomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LayoutModule,
    SharedModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
