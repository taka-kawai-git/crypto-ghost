
class AbiWrapper{

  constructor(contractAddress) {
    this.contractAddress = contractAddress;
    console.log('11111');
    var web3 = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/b8f4303a7a1a494b8139d61c5556905d"));
    console.log('22222');

    var web3js;

    if (!typeof web3 !== 'undefined') {
      web3js = new Web3(web3.currentProvider);
    } else {
      $("#message").text("Please install MetaMask");
    }
    this.startAccountWatch(web3);



    // this.connectedWallet(web3);
    // var web3js = new Web3(web3.currentProvider);

    //---------------------------
    // $.ajax({
    //   url: './DecodeObjTest.json',
    //   type: 'GET',
    //   dataType: "json",
    // }).done(function (data) {
    //   var data_stringify = JSON.stringify(data);
    //   var data_json = JSON.parse(data_stringify);
    //   var contractAbi = data_json["abi"];
    // }).fail(function (data) {
    //   console.log('error');
    // });
    //---------------------------

    // const abi = ABI.abi;
    console.log('33333');
    this.contract = new web3js.eth.Contract(abi, contractAddress);
    console.log('44444');
  }

  mintGhost(name, description, material, divNumHorizontal) {
    console.log('77777');
    console.log(this.userAccount);
    // this.connectedWallet
    return this.contract.methods.writeGhost(name, description, material, divNumHorizontal)
    .send( {from: this.userAccount} )
    .on("receipt", function(receipt) {
      console.log('88888');
      $("#message").text("Successfully created your ghost!");
    })
    .on("error", function(error) {
      console.log('99999');
      $("#message").text(error);
    })
  }

  getGhosts() {
    console.log('55555');
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

  startAccountWatch(web3) {
    var accountInterval = setInterval(function() {
      if (web3.eth.accounts[0] !== this.userAccount) {
        this.userAccount = web3.eth.accounts[0];
      }
    }, 100);
  }
}