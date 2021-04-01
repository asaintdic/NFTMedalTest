require('dotenv').config();
// // sAPI_URL = "https://eth-ropsten.alchemyapi.io/v2/0LdxNQsATtTSmCFr18aAv-lLkXlwkgDC";
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
// // // console.log(typeof API_URL);
// // // console.log(API_URL);
// // // console.log(typeof sAPI_URL);
// // // console.log(sAPI_URL);
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
const contract = require("../artifacts/contracts/MedalBuild.sol/MedalBuild.json");
const contractAddress = "0xD143E6bc2E6676b827DbB10F6c80994e61F3a811";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce
  
    //the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': 500000,
      'data': nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };
  
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
  
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
        if (!err) {
          console.log("The hash of your transaction is: ", hash, "\nCheck Alchemy's Mempool to view the status of your transaction!"); 
        } else {
          console.log("Something went wrong when submitting your transaction:", err)
        }
      });
    }).catch((err) => {
      console.log(" Promise failed:", err);
    });
  }
  
  mintNFT("https://gateway.pinata.cloud/ipfs/QmWtK4r7ounRY7k1NqRZAhop8u5xkZVrUgDg8PQGSzPis3")