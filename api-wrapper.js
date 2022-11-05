export class AbiWrapper{

  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    this.contract = new web3js.eth.Contract(cryptoGhostAPI, contactAddress);
  }

  startAccountWatch() {
    var accountInterval = setInterval(function() {
      if (web3.eth.accounts[0] !== userAccount) {
        // do something to update for new account.
      }
    }, 100);
  }

  getGhosts() {
    return this.contract.methods.ghosts().call()
  }

  getGhostById(id) {
    return this.contract.methods.ghosts(id).call()
  }
}