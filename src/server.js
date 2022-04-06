// 메모!
// 서버측 : Cross Origin 설정(완)
const express = require("express");
const cors = require("cors");
const Contract = require("web3-eth-contract");
const app = express();
const port = 8080;
const Web3 = require("web3");
const local = "http://127.0.0.1:7545";
const web3 = new Web3(new Web3.providers.HttpProvider(local));

// const header = {
//   "Access-Control-Allow-Origin": "http://127.0.0.1:3030",
//   "Access-Control-Allow-Credentials": "false",
//   "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
// };
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };
app.use(express.json());
app.use(cors());
// app.use("/accountinfo", cors());
// enter account, output is account information
async function getAccountInfo(account) {
  try {
    let accountInfo = {
      address: account,
      balance: "0",
    };
    accountInfo.balance = await web3.eth.getBalance(account);
    return accountInfo;
  } catch (e) {
    console.log(e);
    return e;
  }
}

// enter Tx information, output is Tx information
async function getTxInfo(txHash) {
  try {
    let Tx = await web3.eth.getTransaction(txHash);
    let Txinfo = {
      nonce: Tx.nonce,
      blockNumber: Tx.blockNumber,
      from: Tx.from,
    };
    return Txinfo;
  } catch (e) {
    console.log(e);
    return e;
  }
}

// async function getContractInfo(abi, address) {
//   try {
//     Contract.setProvider(local);
//     let contract = new Contract(abi, address);

//     // contract address input, getbalance
//     // contract.options.address
//     let contractInfo = {
//       owner: "0x0",
//       balance: "0",
//     };
//     contractInfo.owner = contract.functions.owner.call();
//     // contractInfo.owner = "owner";
//     contractInfo.balance = web3.eth.getBalance(address);
//     return contractInfo;
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// }

app.post("/accountinfo", (req, res) => {
  let address = req.body.account;
  // console.log(address);
  if (!address) {
    res.status(400).send("Invalid account address");
  } else {
    getAccountInfo(address).then((result) => {
      console.log(result);
      res.status(200).json(result);
    });
  }
});

app.post("/txinfo", (req, res) => {
  let txhash = req.body.txhash;
  if (!txhash) {
    res.status(400).send("Invalid Transaction Hash");
  } else {
    getTxInfo(txhash).then((result) => {
      res.status(200).json(result);
    });
  }
});

// app.post("/contractinfo", (req, res) => {
//   let ABI = req.body.abi;
//   let account = req.body.address;
//   if (!ABI || !account) {
//     res.status(400).send("Invalid contract abi and address, check again");
//   } else {
//     getContractInfo(ABI, account).then((result) => {
//       res.status(200).json(result);
//     });
//   }
// });

app.listen(port, () => {
  console.log(`server is listening on ${port}...`);
});
