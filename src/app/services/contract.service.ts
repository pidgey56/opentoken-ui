import { Contract } from "web3-eth-contract";
import { Web3Service } from "./web3Service/web3.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export abstract class ContractService {
  instance: Contract;
  account: string;

  constructor(protected web3Service: Web3Service) {
    this.web3Service.accountsObservable.subscribe(account => {
      this.account = account[0];
    });
  }

  public abstract async init();

  protected initWeb3(artifact: any) {
    return this.web3Service.artifactToContract(artifact).then(instance => {
      this.instance = instance;
    });
  }
}
