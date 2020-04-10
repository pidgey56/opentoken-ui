import { Component, OnInit } from "@angular/core";
import { Web3Service } from "../services/web3Service/web3.service";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material";
import { HelloworldService } from "../services/helloworldService/helloworld.service";

@Component({
  selector: "app-hello-world",
  templateUrl: "./hello-world.component.html",
  styleUrls: ["./hello-world.component.scss"]
})
export class HelloWorldComponent implements OnInit {
  dumbValue: string;
  form: FormGroup;

  isReady = false;

  constructor(
    private helloworldService: HelloworldService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.helloworldService
      .init()
      .then(() => {
        this.isReady = true;
        this.refreshDumbValue();
      });
    this.form = new FormGroup({
      newValue: new FormControl("", Validators.required)
    });
  }

  sendTx() {
    const v = this.form.getRawValue().newValue;
    this.helloworldService.setDumbValue(v).then(() => {
      this.snackBar.open("Success ! :D", "X");
      this.form.reset();
      this.refreshDumbValue();
    });
  }

  refreshDumbValue(): void {
    this.helloworldService.getDumbValue().then(dumb => (this.dumbValue = dumb));
  }
}
