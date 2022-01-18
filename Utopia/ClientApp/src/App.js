import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Main from "./main";
import {Web3ReactProvider} from '@web3-react/core'
import Web3 from 'web3';
import 'react-toastify/dist/ReactToastify.css';

function getLibrary(provider) {
    return new Web3(provider)
}

function App() {
    
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Main />
                    </Route>
                </Switch>
            </BrowserRouter>
        </Web3ReactProvider>
    );
}

export default App;
