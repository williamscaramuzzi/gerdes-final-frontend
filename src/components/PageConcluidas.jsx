import './PageConcluidas.css'
import Sidebar from "./Sidebar"
import Pendentes from './TablePendentes';
import { useState } from 'react';
import { useAuth } from '../services/MeuAuthenticator';
import Concluidas from './TableConcluidas';


export default function PageConcluidas() {
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
            
            <div className="flex-container">
                <div className="divConcluidas">
                    <div className="ocoConcluidas">
                        <div className="tituloeBotao">
                            <h2 id="concluidash2">Ocorrências já concluídas</h2>
                        </div>
                        <Concluidas/>
                    </div>
                </div>
            </div>
        </>
    )

}