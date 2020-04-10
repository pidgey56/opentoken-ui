import { Injectable } from "@angular/core";
import { ContractService } from "../contract.service";

declare let require: any;
const helloWorldArtifacts = require("../../../assets/abi/HelloWorld.json");

@Injectable({
  providedIn: "root"
})
export class HelloworldService extends ContractService {
  public async init() {
    await this.initWeb3(helloWorldArtifacts);
  }

  public getDumbValue(): Promise<string> {
    return this.instance.methods.getDumbValue().call();
  }

  public setDumbValue(value: string): Promise<any> {
    return this.instance.methods
      .setDumbValue(value)
      .send({ from: this.account, gas: 4500000 });
  }
}
