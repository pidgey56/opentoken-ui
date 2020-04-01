import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {MatButtonModule, MatFormFieldModule, MatInputModule, MatToolbarModule} from "@angular/material";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class MaterialModule { }
