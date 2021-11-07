import './EquipesPage.css';
import Sidebar from "./Sidebar"
import VtrsDispoComDelet from './TableVtrDispComDelet';
import ViaturasOcupadas from './TableVtrOcup';
import { useState } from 'react';
import { useAuth } from '../services/MeuAuthenticator';

export default function EquipesPage() {
    const ctx = useAuth();
    console.log(ctx);
    const [errosdocadastrodevtr, setErrosdocadastrodevtr] = useState("");
    const [forcarUpdate, setForcarUpdate] = useState(0);
    async function conectarEquipeHandler(event){
        event.preventDefault();
        let vtrnova = {
            viatura: document.getElementById("prefixoInput").value,
            comandante: document.getElementById("comandanteInput").value,
            motorista: document.getElementById("motoristaInput").value,
            patrulheiro1: document.getElementById("patrulheiro1Input").value,
            patrulheiro2: document.getElementById("patrulheiro2Input").value,
            status: "disponível"
        }
        let parametrosdofetch = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(vtrnova)
          }
        let jasonretorno = await fetch("http://localhost:3000/equipes", parametrosdofetch).then(retorno => retorno.json());
        if(jasonretorno.erro){
            setErrosdocadastrodevtr("Erro: " + jasonretorno.erro);
        } else {
            setErrosdocadastrodevtr("");
            console.log("VTR conectada com sucesso em: " + jasonretorno.createdAt);
            document.getElementById("formConectarEquipe").reset();
            setForcarUpdate((old)=>old+1);
        }
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
                <h1>Gerência de equipes de serviço</h1>
                <VtrsDispoComDelet forcarUpdate={forcarUpdate}/>
                <ViaturasOcupadas/>
                
            </div>
            <hr></hr>
            <div>
                <h1>Conectar equipe:</h1>
                <form id="formConectarEquipe" onSubmit={conectarEquipeHandler} method="post">
                    <table>
                        <tbody>
                            <tr>
                                <td>Digite o prefixo:</td>
                                <td><input required type="text" name="prefixoInput" id="prefixoInput" /></td>
                            </tr>
                            <tr>
                                <td>Comandante:</td>
                                <td><input required type="text" name="comandanteInput" id="comandanteInput" /></td>
                            </tr>
                            <tr>
                                <td>Motorista:</td>
                                <td><input required type="text" name="motoristaInput" id="motoristaInput" /></td>
                            </tr>
                            <tr>
                                <td>Patrulheiro 1:</td>
                                <td><input type="text" name="patrulheiro1Input" id="patrulheiro1Input" /></td>
                            </tr>
                            <tr>
                                <td>Patrulheiro 2:</td>
                                <td><input type="text" name="patrulheiro2Input" id="patrulheiro2Input" /></td>
                            </tr>
                            <tr>
                                <td><button type="submit">Conectar</button></td>
                                <td></td>
                                <td><span id="equipes-msgs-de-erro">{errosdocadastrodevtr}</span></td>
                            </tr>
                        </tbody>
                    </table>
                    
                </form>
            </div>
        </>
    )

}