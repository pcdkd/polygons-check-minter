import React, { useState } from 'react';
import Modal from './components/modal';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { abi } from '../contract-abi';
import type {
  UsePrepareContractWriteConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
} from 'wagmi';

const contractConfig = {
  address: '0xEb4b197459F0A3cEF181c5383765b4ca2DC01252',
  abi,
};

const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();

  const [numTokens, setNumTokens] = React.useState(1);

  const mintPrice = .01;
  const value = 10000000000000000 * numTokens

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: 'safeMint',
    args: [numTokens],
    value: value,
  } as UsePrepareContractWriteConfig);

  const {
    data: mintData,
    write: safeMint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig as UseContractWriteConfig);

  const { data: totalSupplyData }: any = useContractRead({
    ...contractConfig,
    functionName: 'totalSupply',
    watch: true,
  } as UseContractReadConfig);

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

  const isMinted = txSuccess;

  const [whatModalOpen, setWhatModalOpen] = useState(false);
  const [faqModalOpen, setFaqModalOpen] = useState(false);
  
  const handleWhatClick = () => {
    setWhatModalOpen(true);
  };
  
  const handleWhatClose = () => {
    setWhatModalOpen(false);
  };
  
  const handleFaqClick = () => {
    setFaqModalOpen(true);
  };
  
  const handleFaqClose = () => {
    setFaqModalOpen(false);
  };

  return (
    <div className="page" style={{ textAlign: "center", display: "flex", flexDirection: "column" }}>
      <h1>Checks are now on Polygon.</h1>
      <h2>Polygons Check is a Checks-derivative art project on Polygon. Art is onchain.<br></br> New variations. Notability not guaranteed.</h2>
      <p className="generated" >{totalMinted} generated.</p>
      <ConnectButton style={{ margin: "1rem 0" }} />
      { isConnected && (  
      <div style={{ margin: "2rem 0" }}>
        <button className="numbutton" onClick={() => setNumTokens(Math.max(1, numTokens - 1))}>-</button>
        <span className="mintnumber" style={{ margin: "0 1rem" }}>{numTokens}</span>
        <button className="numbutton" onClick={() => setNumTokens(Math.min(10, numTokens + 1))}>+</button>
      </div>
      )}
      { isConnected && ( 
      <p style={{ margin: "0.5rem 0" }}>{(numTokens * mintPrice)} MATIC</p>
      )}
      { isConnected && ( 
      <button
        style={{ marginTop: "1rem" }}
        disabled={!safeMint || isMintLoading || isMintStarted}
        className="button"
        data-mint-loading={isMintLoading}
        data-mint-started={isMintStarted}
        onClick={() => safeMint?.([numTokens])}
      >
        {isMintLoading && "Waiting for approval"}
        {isMintStarted && "Minting..."}
        {isMinted && "Success!"}
        {!isMintLoading && !isMintStarted && "GENERATE"}
      </button>
      )}
      {mintError && (
        <p style={{ marginTop: "1rem", color: "#FF6257" }}>
          Error: {mintError.message}
        </p>
      )}
      {txError && (
        <p style={{ marginTop: "1rem", color: "#FF6257" }}>
          Error: {txError.message}
        </p>
      )}
      {isMinted && (
        <div style={{ margin: "1rem 0" }}>
          <p>
            View on{" "}
            <a href={`https://mumbai.polygonscan.com/tx/${mintData?.hash}`} target={'_blank'}>
              PolygonScan
            </a>
          </p>
          <p>
            View on{" "}
            <a
              href={`https://testnets.opensea.io/account`} target={'_blank'}
            >
              Opensea
            </a>
          </p>
        </div>
        
      )}
      <footer>
      <div className="footer">
    <nav>
      <ul>
        <li><a href="#" className="menu-item" onClick={handleWhatClick}>1) What</a></li>
        <li><a href="#" className="menu-item" onClick={handleFaqClick}>FAQ</a></li>
      </ul>
    </nav>
    <Modal
  title='What Modal'
  isOpen={whatModalOpen}
  onClose={handleWhatClose}
>
  <p className="modalHeader">This is a header.</p>
  <p>Polygon Onchain is built by pcdkd. Connect on farcaster, nostr, and bird app. View the code for the mint app here. View the erc721 contract here. The contract owner cannot mint more than 10 Polygons.</p>
</Modal>

<Modal
  title='FAQ Modal'
  isOpen={faqModalOpen}
  onClose={handleFaqClose}
>
<p className="modalHeader">What is Polygons Check?</p>
<p className="modalText">An Checks-derviative, onchain art project on Ethereum. Read more on 1) What.</p>
<hr className="modalDivide"></hr>
<p className="modalHeader">Where do I get Polygons Check?</p>
<p className="modalText">Polygons can only be generated on <a href="">this site</a>, via the contract or secondary.</p>
<hr className="modalDivide"></hr>
<p className="modalHeader">How many can be generated?</p>
<p className="modalText">There are 5000 Polygon Checks available. Mint price is 7 MATIC.</p>
<hr className="modalDivide"></hr>
<p className="modalHeader">How do I use Polygon Checks??</p>
<p className="modalText">Your day of mint is recorded. You will be able to burn your Checks to create new iterations, including 1/1 onchain generative art pieces.</p>
<hr className="modalDivide"></hr>
<p className="modalHeader">Is there a creative commons licese?</p>
<p className="modalText">Yes. Polygons Check are CC0 ("PUBLIC").</p>
</Modal>
  </div>
      </footer>
    </div>
  );  
};

export default Home;
