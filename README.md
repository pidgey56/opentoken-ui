# openToken-ui

GUI app for the blockchain based POC

## Prerequisite

### Get the repo
````bash
# clone repo
git clone ssh://git@git.boost.open.global:443/guillaume.couzy2/opentoken-ui.git
# enter the project folder
cd openToken-ui
# install it
npm install
````

### Deploy your contracts
```bash
# Launch ganache 
ganache-cli --deterministic
# in openToken-contracts
npm run migrate
# Save the contract address somewhere
```

### Configure Metamask
1. Get the [Metamask  Plugin](https://metamask.io/download.html)
2. Set it up to connect to your local Rpc (127.0.0.1:8545)
3. Import Ganache's default wallet (using `--deteministic` it shoud be: myth like bonus scare over problem client lizard pioneer submit female collect)

### Environment
1. Deploy your contract and get its address ;
2. Copy `src/environments/environment.example.ts` to `src/environments/environment.ts` ;
3. Replace `0xXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX` with your deployed contract's address ;
4. Copy your contract(s) ABI (from openToken-contract/build) into the `src/assets/abi` folder ;

Inch'Allah it works ;) 
