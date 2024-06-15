import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from '../pages/Home';
import { CadastroPautista } from '../pages/CadastroPautista';
import { CadastroAdvogado } from '../pages/CadastroAdvogado';
import { MainLayout } from './MainLayout';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="cadastro-pautista" element={<CadastroPautista />} />
                    <Route path="cadastro-advogado" element={<CadastroAdvogado />} />
                </Route>
            </Routes>
        </Router>
    )
}