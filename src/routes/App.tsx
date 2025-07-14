import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Navbar} from 'decentraland-ui'
import Wallet from '../pages/wallet';
import Transfer from '../pages/transfer';
import TransferSuccess from '../pages/transfer/transfer.success';
import TransferFailure from "../pages/transfer/transfer.failure";
import route_paths from './routes';
import NotFound from "./NotFound.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Navbar  activePage="wallet" />
            <Routes>
                <Route path={route_paths.WALLET} element={<Wallet />} />
                <Route path={route_paths.TRANSFER} element={<Transfer />} />
                <Route path={route_paths.TRANSFER_SUCCESS} element={<TransferSuccess />} />
                <Route path={route_paths.TRANSFER_FAILURE} element={<TransferFailure />} />
                <Route path="*" element={<NotFound /> } />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
