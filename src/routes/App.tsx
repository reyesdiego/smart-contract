import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from 'decentraland-ui'
import Wallet from '../pages/wallet';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar  activePage="wallet" />
            <Routes>
                <Route path="/" element={<Wallet />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
