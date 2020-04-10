import {Component, Input} from "@angular/core";

@Component({
  selector: "app-loader",
  templateUrl: "./loader.component.html",
  styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent {
  private _show: boolean;

  @Input()
  set show(value: boolean) {
    this._show = value;
  }

  get show(): boolean { return this._show; }

  constructor() { }
}
