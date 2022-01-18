import nft from './assets/images/nft.gif';
import nft2 from './assets/images/nft2.gif';
import ball from './assets/images/ball.gif';
import compass from './assets/images/compas.svg';
import evaCopy from './assets/images/eva_copy-fill.svg';
import evaImage from './assets/images/eva_image-fill.svg';
import evaCode from './assets/images/eva_code-outline.svg';
import evaGift from './assets/images/eva_gift-outline.svg';
import {useWeb3React} from "@web3-react/core";
import {injected} from "./injectedConnector";
import logo from './assets/images/logo.svg';
import twitter from './assets/images/eva_twitter-fill.svg';
import discord from './assets/images/akar-icons_discord-fill.svg';
import firstCollect from './assets/images/lucide_layout-dashboard.svg';
import secondCollect from './assets/images/lucide_layout-grid.svg';
import connectImage from './assets/images/akar-icons_wallet.svg';
import {useEffect, useRef, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import passGif from './assets/images/Utopia Pass.gif';
import party from './assets/images/party.svg';
import puzzle from './assets/images/Puzzle piece.svg';
import bulb from './assets/images/bulb.svg';
import admission from './assets/images/admission.svg';
import web3 from './web3';
import abi from "./abi";

function Main() {

    useEffect(() => {
            getTotalSupply();
            setInterval(() => getFromTime(), 1000);
            setInterval(() => getForTime(), 1000);
            let menuBtn = document.querySelector('.header__burger');
            let menu = document.querySelector('.nav');
            let lock = document.querySelector('body');

            menuBtn.addEventListener('click', function () {
                menuBtn.classList.toggle('active');
                menu.classList.toggle('active');
                lock.classList.toggle('lock');
            })
    }, []);

    const [buyButtonDisabled, setBuyButtonDisabled] = useState(false);
    const [forTime, setForTime] = useState('');
    const [fromTime, setFromTime] = useState('');

    const [totalSupply, setTotalSupply] = useState(0);
    const [transactionHash, setTransactionHash] = useState('');
    const [isSupportedNetwork, setIsSupportedNetwork] = useState(true);

    const {active, account, library, connector, activate, deactivate} = useWeb3React();

    function sendTransaction() {
        sendTransactionAsync();
    }

    function getTotalSupply() {
        getTotalSupplyAsync();
    }
    
    async function getTotalSupplyAsync() {
        try {
            const totalSupply = await abi.methods.totalSupply().call();
            setTotalSupply(totalSupply);
        }
        catch(e) {
            setIsSupportedNetwork(false);
            toast.error('Unsupported network. Please change to Mainnet and refresh the page.');
        }
    }

    async function sendTransactionAsync() {
        try {
            var value =  web3.utils.toWei('0.25', 'ether');
            const accounts = await web3.eth.getAccounts();
            setBuyButtonDisabled(true);
            let response = await abi.methods.mintPresale(accounts[0], 1).send({
                from: accounts[0],
                value: value,
            });
            
            setBuyButtonDisabled(false);
            window.open("https://etherscan.io/tx/" + response.transactionHash, "_blank");
            setTransactionHash(response.transactionHash);
            toast("Transaction sent ");
            getTotalSupply();
        }
        catch (e) {
            setBuyButtonDisabled(false);
            window.open("https://etherscan.io/tx/" + e.receipt.transactionHash, "_blank");
            toast.error('Transaction declined');
        }
    }

    async function connect() {
        try {
            if (!window.web3) {
                toast.error("Metamask is not installed")
                return;
            }

            await activate(injected);
            toast("Connected to Metamask");
        } catch (ex) {
            toast.error("Can't connect to Metamask")
            console.log(ex)
        }
    }

    const [salesCampaignStarted, setSalesCampaignStarted] = useState(false);

    async function getForTime() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const response = await fetch('api/web3/forTimer', requestOptions);
        const data = await response.json();

        if (data.length > 0) {
            let forT = data[0] + ':' + data[1] + ':' + data[2];
            setForTime(forT);
        } else if (salesCampaignStarted === false) {
            setSalesCampaignStarted(true);
        }
    }

    async function getFromTime() {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        
        const response = await fetch('api/web3/fromTimer', requestOptions);
        const data = await response.json();
        let fromT = data[0] + ':' + data[1] + ':' + data[2];
        setFromTime(fromT);
    }

    return (
        <>
            <ToastContainer/>

            <header className="header container">
                <img src={logo} alt="Utopia" className="logo"/>
                <div className="header__burger">
                    <span></span>
                </div>
                <nav className="nav">
                    <ul className="nav__list">
                        <li className="nav__item ">
                            <a href="https://twitter.com/utopia3301" className="nav__link"><img src={twitter}
                                                                                                alt="twitter"/> Twitter</a>
                        </li>
                        <li className="nav__item">
                            <a href="https://discord.gg/Sths7ywVZY" className="nav__link"><img src={discord}
                                                                                               alt="Discord"/> Discord</a>
                        </li>
                        <li className="nav__item">
                            <a href="https://opensea.io/collection/utopia-pass-v3301" className="nav__link"><img
                                src={firstCollect}
                                alt="Utopia Pass"/> Utopia Pass</a>
                        </li>
                        <li className="nav__item">
                            <a href="#" className="nav__link"><img src={secondCollect}
                                                                   alt="Main collection"/> Main collection</a>
                        </li>
                    </ul>
                    <button className="btn" disabled={!isSupportedNetwork} onClick={connect}>
                        <img src={connectImage} alt="cards" className="btn__img"/>
                        {active ?
                            <span>Wallet {account.slice(0, 4)}...{account.slice(Math.max(account.length - 4, 0))} </span> :
                            <span>Connect to wallet</span>}
                    </button>

                </nav>
            </header>

            <main className="main">
                <div className="container">
                    <section className="section-first">
                        <div className="first__text">
                            <h1>
                                Where code,<br/>
                                art & creativity intersect.
                            </h1>
                            <ul className="first__list">
                                <li className="first__item">Our project is designed to integrate the NFT virtual world
                                    into
                                    the real world.
                                </li>
                                <li className="first__item">We are going to provide an opportunity for everybody to
                                    become a
                                    part of something more, something that will change the industry forever.
                                </li>
                                <li className="first__item">With your help we will incorporate politicians, businessmen,
                                    managing directors, leaders and people that are making decision in the real world
                                    towards the fast growing NFT world.
                                </li>
                                <li className="first__item">Only the first 500 people will receive the right to manage
                                    the
                                    new system.
                                </li>
                            </ul>
                        </div>
                        <div className="first__right">
                            <div className="first__img">
                                <img src={ball} alt="ball animation" className="ball-img"/>
                            </div>
                            <div className="right__block noflex">
                                <div className="right__block-flex">
                                    <div className="">
                                        <h2 className="right__block__title">
                                            Utopia pass
                                        </h2>
                                        <p className="right__block__clock">
                                            {salesCampaignStarted ? <span>{fromTime}</span> : <span>{forTime}</span>}
                                        </p>
                                        <p className="right__block__subtext">
                                            {salesCampaignStarted
                                                ? <span>From start sales</span>
                                                : <span>For start sales</span>
                                            }
                                        </p>
                                        <p className="right__block__tockens">
                                            {totalSupply}/500 Minted
                                        </p>

                                    </div>
                                    <img src={compass} alt="NFT"/>
                                </div>
                                {
                                    active && salesCampaignStarted && !transactionHash
                                        ? <button className="btn__personal" disabled={buyButtonDisabled} onClick={sendTransaction}>{buyButtonDisabled ? 'Processing..' : 'Buy'}</button> :
                                        transactionHash ?
                                            <button className="btn__owned" disabled={true}>Already owned</button> :
                                            <span/>
                                }
                            </div>
                        </div>
                    </section>
                    <section className="section-2">
                        <div className="first__img">
                            <img src={passGif} alt="ball animation" className="ball-img img__2"/>
                        </div>
                        <div className="personal__pass">
                            <h2 className="personal__title">
                                Personal pass holders will receive the following benefits:
                            </h2>
                            <div className="personal__block">
                                <img src={admission} alt=""/>
                                <p>Participation in the pre-sale of the main collection (purchase twice as much NFT as
                                    will be available for public sale)
                                </p>
                            </div>
                            <div className="personal__block">
                                <img src={party} alt=""/>
                                <p>Participation in the drawing of a portion of royalties from the main collection.
                                </p>
                            </div>
                            <div className="personal__block">
                                <img src={puzzle} alt=""/>
                                <p>Direct involvement in the development of the project.
                                </p>
                            </div>
                            <div className="personal__block">
                                <img src={bulb} alt=""/>
                                <p>The secret function of a new collection interaction.</p>
                            </div>
                        </div>
                    </section>
                    <div className="footer">
                        <a target="_blank" href="https://etherscan.io/address/0xc9A5F0307440dba7cd148381D896694770FC9b3b" className="nav__link footer">Utopia Pass (UP)</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Main;

