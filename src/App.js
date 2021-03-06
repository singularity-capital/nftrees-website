import './App.css';
import LandingNavbar from './components/LandingNavbar';
import Landing from './components/Landing';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import NFTreeABI from './artifacts/contracts/NFTree.sol/NFTree.json';

class App extends React.Component {
  constructor() {
    super();

    this.NFTREE_ADDRESS = '0xa44929195B0c3AF215c6efbe5c295cc6b99F7C44';
  }


  getBlockchainData = async () => {
    var web3 = new Web3("https://mainnet.infura.io/v3/782109c6748c48d6b91c3eafa72b5292");
    var nftrees = new web3.eth.Contract(NFTreeABI.abi, this.NFTREE_ADDRESS);

    var blockchainData = {
      numMinted: await nftrees.methods.getNextTokenId().call() - 1,
      carbonOffset: await nftrees.methods.carbonOffset().call()
    }
    
    return blockchainData;
  }

  render() {
    return (
      <div className='App'>
        <Router>
          <Switch>
            <Route exact path = '/'>
              <div className = 'landingBackground'>
                <LandingNavbar/>
                <Landing getBlockchainData = {this.getBlockchainData}/>
              </div>
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
