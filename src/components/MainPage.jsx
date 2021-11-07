import './MainPage.css';
import Sidebar from "./Sidebar"
import Pendentes from './TablePendentes';
import Ematendimento from './TableEmatendimento';
import { Button } from '@material-ui/core'
import ViaturasDisponiveis from './TableVtrDispo';
import ViaturasOcupadas from './TableVtrOcup';
import { useState } from 'react';
import ModalCriarOco from './ModalCriarOco';
import ModalEditarOco from './ModalEditarOco';
import ModalConcluirOco from './ModalConcluirOco';
import { useAuth } from '../services/MeuAuthenticator';


export default function MainPage() {
    const ctx = useAuth();
    console.log(ctx);
    const [modalcriarocoflag, setModalcriarocoflag] = useState(false);
    const [modaleditarocoflag, setModaleditarocoflag] = useState(false);
    const [modalconcluirocoflag, setModalconcluirocoflag] = useState(false);
    const [oco, setOco] = useState({}); 
    const [fato, setFato] = useState("");
    const [equipes, setEquipes] = useState([""]);
    const [equipe, setEquipe] = useState("");
    
    async function enviarOcoEdicao(despacho){
        let eqs = await fetch("http://localhost:3000/equipes/disponivel").then(resposta=>resposta.json());
        let vetorEquipes = await eqs.rows;
        let meuvetor = [""];
        await vetorEquipes.forEach(equipe=>{
            meuvetor.push(equipe.viatura);
        })   
        setEquipes(meuvetor);
        let ocorrenciaPegadoBd = await fetch('http://localhost:3000/ocorrencia/'+despacho).then(resposta=>resposta.json());
        console.log(ocorrenciaPegadoBd)
        setOco(ocorrenciaPegadoBd);
        setFato(ocorrenciaPegadoBd.fato);
        setEquipe(ocorrenciaPegadoBd.equipe);
        setModaleditarocoflag(!modaleditarocoflag);
    }
    async function enviarOcoConclusao(despacho){
        let ocorrenciaPegadoBd = await fetch('http://localhost:3000/ocorrencia/'+despacho).then(resposta=>resposta.json());
        console.log(ocorrenciaPegadoBd)
        setOco(ocorrenciaPegadoBd);
        setFato(ocorrenciaPegadoBd.fato);
        let eqs = await fetch("http://localhost:3000/equipes/disponivel").then(resposta=>resposta.json());
        let vetorEquipes = await eqs.rows;
        let meuvetor = [ocorrenciaPegadoBd.equipe];
        await vetorEquipes.forEach(equipe=>{
            meuvetor.push(equipe.viatura);
        })   
        setEquipes(meuvetor);
        setEquipe(ocorrenciaPegadoBd.equipe);
        setModalconcluirocoflag(!modalconcluirocoflag);
    }
    return (
        <>
        
            <div className="cabecalhoInterno">
                <img id="logoPM" src="/brasao-pmms.png" alt="cabeçalho" />
                <div className="policia">POLÍCIA MILITAR</div>
                <div className="mstexto">MATO GROSSO DO SUL</div>
                <div className="tituloGerdes">
                    Gerenciador de Despachos
                </div>
            </div>
            <Sidebar />
            <ModalCriarOco visible={modalcriarocoflag} setVisibility={setModalcriarocoflag}/>
            <ModalEditarOco visible={modaleditarocoflag} setVisibility={setModaleditarocoflag} oco={oco} setOco={setOco}
            fato={fato} setFato={setFato} equipes={equipes} setEquipes={setEquipes} equipe={equipe} setEquipe={setEquipe}/>
            <ModalConcluirOco visible={modalconcluirocoflag} setVisibility={setModalconcluirocoflag} oco={oco} setOco={setOco}
            fato={fato} setFato={setFato} equipes={equipes} setEquipes={setEquipes} equipe={equipe} setEquipe={setEquipe}/>
            <div className="flex-container">
                <div className="card">
                    <div className="ocoPendentes">
                        <div className="tituloeBotao">
                            <h2 id="pendentesh2">Ocorrências Pendentes</h2>
                            <Button onClick={()=>setModalcriarocoflag(!modalcriarocoflag)}  variant="contained" color="primary">
                                Nova
                            </Button>
                        </div>
                        <Pendentes enviarOcoEdicao={enviarOcoEdicao} />
                    </div>
                </div>
                <div className="cardVtr">
                    <div className="vtrDispoDiv">
                        <h3 id="vtrsDisponiveisTitulo">Viaturas disponíveis</h3>
                        <ViaturasDisponiveis />
                    </div>
                </div>
                <div className="card">
                    <div className="ocoEmAtendimento">
                        <h2 id="ocoAtendimentoh2">Ocor. em atendimento</h2>
                        <Ematendimento enviarOcoConclusao={enviarOcoConclusao}/>
                    </div>
                </div>
                <div className="cardVtr">
                    <div className="vtrOcupDiv">
                        <h3 id="vtrsocupadasTitulo">Viaturas ocupadas</h3>
                        <ViaturasOcupadas />
                    </div>
                </div>
            </div>
        </>
    )

}