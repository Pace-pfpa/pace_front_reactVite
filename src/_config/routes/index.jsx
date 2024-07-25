import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Home } from '../../pages/Home';
import { CadastroPautista } from '../../pages/CadastroPautista';
import { CadastroAdvogado } from '../../pages/CadastroAdvogado';
import { CadastroPauta } from '../../pages/CadastroPauta';
import { MutiraoExcluir } from '../../pages/MutiraoExcluir'
import { ConsultaPautista } from '../../pages/ConsultaPautista';
import { ConsultaAdvogado } from '../../pages/ConsultaAdvogado';
import { ConsultaEscala } from '../../pages/ConsultaEscala';
import { MainLayout } from './MainLayout';
import { EditarPautista } from '../../pages/EditarPautista';
import { EditarAdvogado } from '../../pages/EditarAdvogado';

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path="cadastro-pautista" element={<CadastroPautista />} />
                    <Route path="cadastro-advogado" element={<CadastroAdvogado />} />
                    <Route path="cadastro-pauta" element={<CadastroPauta />} />
                    <Route path="mutirao-excluir" element={<MutiraoExcluir />} />
                    <Route path="consulta-pautista" element={<ConsultaPautista />} />
                    <Route path="consulta-advogado" element={<ConsultaAdvogado />} />
                    <Route path="consulta-escala" element={<ConsultaEscala />} />
                    <Route path="editar-pautista" element={<EditarPautista />} />
                    <Route path="editar-advogado" element={<EditarAdvogado />} />
                </Route>
            </Routes>
        </Router>
    )
}