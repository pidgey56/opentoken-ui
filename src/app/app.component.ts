import { Web3Service } from "./web3.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "OpenToken";
  account: string;

  constructor(private web3Service: Web3Service) {}

  watchAccount() {
    this.web3Service.accountsObservable.subscribe(accounts => {
      this.account = accounts[0];
    });
  }

  ngOnInit() {
    this.watchAccount();
  }
}
