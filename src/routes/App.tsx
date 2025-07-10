import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from 'decentraland-ui'
import Wallet from '../pages/wallet';
import Transfer from '../pages/transfer';
import TransferSuccess from '../pages/transfer/transfer.success';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar  activePage="wallet" />
            <Routes>
                <Route path="/" element={<Wallet />} />
                <Route path="/transfer" element={<Transfer />} />
                <Route path="/transfer-success/:transaction/:funds" element={<TransferSuccess />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
