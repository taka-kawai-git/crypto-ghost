
class AbiWrapper{

  constructor(contractAddress, provider) {
    this.contractAddress = contractAddress;
    // var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/b8f4303a7a1a494b8139d61c5556905d"));


    // var web3js;

    // if (!typeof web3 !== 'undefined') {
    // if (typeof window.ethereum !== 'undefined') {
    //   console.log("xxxxx");
    //   ethereum.request({ method: 'eth_requestAccounts' })
    //   .then((result) => {
    //     web3js = new Web3(web3.currentProvider);
    //     console.log('33333');
    //     this.contract = new web3js.eth.Contract(abi, contractAddress);
    //     console.log('44444');
    //   });
      
    // } else {
    //   $("#message").text("Please install MetaMask");
    // }
    console.log('333');
    var web3js = new Web3(provider);
    console.log('444');
    this.contract = new web3js.eth.Contract(abi, this.contractAddress);
    console.log('555');
    this.startAccountWatch();
    console.log('666');
  }

  mintGhost(name, description, material, divNumHorizontal) {
    console.log(this.userAccount);
    // this.connectedWallet
    return this.contract.methods.writeGhost(name, description, material, divNumHorizontal)
    .send( {from: this.userAccount} )
    .on("receipt", function(receipt) {
      $("#message").text("Successfully created your ghost!");
    })
    .on("error", function(error) {
      $("#message").text(error);
    })
  }

  getGhosts() {
    return this.contract.methods.readGhost(1, 12).call()
  }

  getGhostById(id) {
    return this.contract.methods.ghosts(id).call()
  }

  // connectedWallet(web3) {
  //   if (!typeof web3 !== 'undefined') {
  //     web3js = new Web3(web3.currentProvider);
  //   } else {
  //     $("#message").text("Please install MetaMask");
  //   }
  //   this.startAccountWatch();
  // }

  startAccountWatch() {
    console.log("aaa");
    var accountInterval = setInterval(async function() {
      console.log("bbb");
      var accounts = await ethereum.request({ method: 'eth_accounts' });
      console.log("ccc");
      if (accounts[0] !== this.userAccount) {
        console.log("ddd:" + this.userAccount);
        this.userAccount = accounts[0];
      }
    }, 100);
  }
}