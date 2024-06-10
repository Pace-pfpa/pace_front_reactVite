import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from '../pages/Home';
import { CadastroPautista } from '../pages/CadastroPautista';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element = {<Home />}   />
                <Route path='/cadastro-pautista' element = {<CadastroPautista />}   />
            </Routes>
        </Router>
    )
}