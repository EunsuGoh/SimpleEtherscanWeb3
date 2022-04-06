import axios from "axios";
import React, { useEffect, useState } from "react";
// 메모!!
// 모든 함수에 적용
// 지금은 account 바꾸는 중
// ㅠㅠ
const Main = () => {
  // state 정의
  const [account, setAccount] = useState({});
  const [txHash, setTxHash] = useState({});
  const [contract, setContract] = useState({});

  // const accountInfo = {
  //   address: "0x0",
  //   balance: "0ETH",
  // };

  const handleAccount = (e) => {
    setAccount(e.target.value);
  };

  const handleTx = (e) => {
    setTxHash(e.target.value);
  };

  // const handleContract = (e) => {
  //   setContract(e.target.value);
  // };

  const clickAccountInfo = async () => {
    // console.log(account);
    let data = {
      account: account,
    };
    let result = await axios.post("http://localhost:8080/accountinfo", {
      account: data.account,
    });
    // accountInfo.address = result.data.address;
    // accountInfo.balance = result.data.balance;
    setAccount({
      address: result.data.address,
      balance: result.data.balance,
    });
    console.log(account);
    // console.log(accountInfo);
  };

  const clickTxInfo = async () => {
    let data = {
      txHash: txHash,
    };
    let result = await axios.post("http://localhost:8080/txinfo", {
      txhash: data.txHash,
    });
    setTxHash({
      nonce: result.data.nonce,
      blockNumber: result.data.blockNumber,
      from: result.data.from,
    });
  };
  // const clickContractInfo = async () => {
  //   let data = {
  //     contractInfo: contract,
  //   };
  //   let result = await fetch("http://localhost:8080/contractinfo", {
  //     method: "POST",
  //     body: JSON.stringify(data),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   // setContractInfo(result);
  //   //contract balance, owner
  //   console.log(result);
  // };

  useEffect(() => {
    console.log("update");
  }, [account, txHash, contract]);

  return (
    <>
      {" "}
      <h3>Welcome to main page</h3>{" "}
      <h4>You can test accountInfo, TxInfo, and Contract Info.</h4>
      <h4>
        Please make sure that Contract is deployed first in local network when
        you test ContractInfo.
      </h4>
      <input onChange={handleAccount}></input>
      <button onClick={clickAccountInfo}>AccountInfo</button>
      <div>UserAccount : {account.address}</div>
      <div>Balance : {account.balance}</div>
      <br></br>
      <input onChange={handleTx}></input>
      <button onClick={clickTxInfo}>TxInfo</button>
      <div>nonce : {txHash.nonce}</div>
      <div>blockNumber : {txHash.blockNumber}</div>
      <div>from : {txHash.from}</div>
      {/* <br></br>
      <input onChange={handleContract}></input>
      <button onClick={clickContractInfo}>ContractInfo</button> */}
      {/* <div>{contract}</div> */}
    </>
  );
};
export default Main;
