import React, { useState } from "react";
import Modal from "./components/modal";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
  useProvider,
  useNetwork,
} from "wagmi";
import { abi } from "../contract-abi";
import type {
  UsePrepareContractWriteConfig,
  UseContractReadConfig,
  UseContractWriteConfig,
} from "wagmi";
import { ethers } from "ethers";

const Home: NextPage = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useAccount();

  const [numTokens, setNumTokens] = React.useState(1);

  const mintPrice = 0.01;
  const totalValue = mintPrice * numTokens
  const value = ethers.utils.parseEther(totalValue.toString());

  const provider = useProvider();
  const network = useNetwork();

  const contractConfig = {
    address: "0xEb4b197459F0A3cEF181c5383765b4ca2DC01252",
    abi,
    provider,
  };

  const { config: contractWriteConfig } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "safeMint",
    args: [numTokens],
    overrides: {
      value: value,
    },
    chainId: network.chain?.id,
  } as UsePrepareContractWriteConfig);

  const {
    data: mintData,
    write: safeMint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
    status,
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

  const [faqModalOpen, setFaqModalOpen] = useState(false);
  const [AboutModalOpen, setAboutModalOpen] = useState(false);

  const handleFaqClick = () => {
    setFaqModalOpen(true);
  };

  const handleFaqClose = () => {
    setFaqModalOpen(false);
  };

  const handleAboutClick = () => {
    setAboutModalOpen(true);
  };

  const handleAboutClose = () => {
    setAboutModalOpen(false);
  };

  const handleMintClick = () => {
    safeMint?.();
  };

  return (
    <div
      className="page"
      style={{ textAlign: "center", display: "flex", flexDirection: "column" }}
    >
      <Head>
  <title>Polygons Checks — Checks are now on Polygon</title>
  <meta name="description" content="A Checks-derviative, onchain art project on Polygon. Each Check minted contains a unique fingerprint. Art & metadata stored onchain." />
  <meta name="keywords" content="Polygons Check, Checks, onchain art, Polygon, NFT, art project" />
  <meta name="author" content="pcdkd" />
  <meta property="og:title" content="Polygons Check" />
<meta property="og:type" content="app" />
<meta property="og:url" content="https://www.polygons.wtf/" />
<meta property="og:image" content="https://polygons.wtf/components/assets/polygons-check-blue.png" />
<meta name="twitter:title" content="Polygons CHeck "/>
<meta name="twitter:description" content="A Checks-derviative, onchain art project on Polygon. Each Check minted contains a unique fingerprint. Art & metadata stored onchain."/>
<meta name="twitter:image" content="https://polygons.wtf/components/assets/polygons-check-blue.png"/>
<meta name="twitter:card" content="summary_large_image"/>
</Head>
      <h1>Checks are now on Polygon.</h1>
      <h2>
        Polygons Check is a Checks-derivative art project on Polygon. Art & metadata is
        onchain.<br></br>gen1 minting now.  This is not alpha.<br></br><br></br> Notability not guaranteed.
      </h2>
      <p className="generated">{totalMinted} generated.</p>
      <ConnectButton />
      {isConnected && (
        <div style={{ margin: "2rem 0" }}>
          <button
            className="numbutton"
            onClick={() => setNumTokens(Math.max(1, numTokens - 1))}
          >
            -
          </button>
          <span className="mintnumber" style={{ margin: "0 1rem" }}>
            {numTokens}
          </span>
          <button
            className="numbutton"
            onClick={() => setNumTokens(Math.min(25, numTokens + 1))}
          >
            +
          </button>
        </div>
      )}
      {isConnected && (
        <p style={{ margin: "0.5rem 0" }}>{numTokens * mintPrice} MATIC</p>
      )}
      {isConnected && (
        <button
          style={{ marginTop: "1rem" }}
          disabled={isMintLoading || isMintStarted}
          className="button"
          data-mint-loading={isMintLoading}
          data-mint-started={isMintStarted}
          onClick={handleMintClick}
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
            <a
              href={`https://mumbai.polygonscan.com/tx/${mintData?.hash}`}
              target={"_blank"}
            >
              PolygonScan
            </a>
          </p>
          <p>
            View on{" "}
            <a href={`https://testnets.opensea.io/account`} target={"_blank"}>
              Opensea
            </a>
          </p>
        </div>
      )}
      <footer>
        <div className="footer">
          <nav>
            <ul>
              <li>
                <a href="#" className="menu-item" onClick={handleFaqClick}>
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="menu-item" onClick={handleAboutClick}>
                  About
                </a>
              </li>
            </ul>
          </nav>
          <Modal
            title="FAQ Modal"
            isOpen={faqModalOpen}
            onClose={handleFaqClose}
          >
            <p className="modalHeader">What is Polygons Check?</p>
            <p className="modalText">
              A Checks-derviative, onchain art project on Polygon. Each Check minted contains a unique fingerprint. Art & metadata stored onchain.
            </p>
            <hr className="modalDivide"></hr>
            <p className="modalHeader">Where do I get Polygons Check?</p>
            <p className="modalText">
              Polygons can only be generated on <a href="">this site</a>, via
              the contract or secondary.
            </p>
            <hr className="modalDivide"></hr>
            <p className="modalHeader">How many can be generated?</p>
            <p className="modalText">
              There are 3500 gen1 Polygon Checks available. Mint price is 7 MATIC.
            </p>
            <hr className="modalDivide"></hr>
            <p className="modalHeader">How do I use Polygon Checks??</p>
            <p className="modalText">
              Your day of mint is recorded. You will be able to use your gen1 Checks
              to create gen2 iterations.
            </p>
            <hr className="modalDivide"></hr>
            <p className="modalHeader">Is there a creative commons licese?</p>
            <p className="modalText">Yes. Polygons Check are CC0 ("PUBLIC").</p>
          </Modal>
          <Modal
            title="About Modal"
            isOpen={AboutModalOpen}
            onClose={handleAboutClose}
          >
            
            <p className="modalText">
              Created by pcdkd.<br></br><br></br> Follow on <a href="https://warpcast.com/pcdkd" target="_blank">Warpcast</a>, <a href="https://snort.social/p/npub1w65mgf77dfnn9c2vylw8k0rjjvvc8cw60ttw44u2cf0608eyxtlsyt9ec3" target="_blank">Nostr</a> & the <a href="https://twitter.com/pcdkd" target="_blank">bird app</a>.
            </p>
          </Modal>
        </div>
      </footer>
    </div>
  );
};

export default Home;
