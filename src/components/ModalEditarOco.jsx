import React from 'react'
import './ModalEditarOco.css'
import FATOS from './00Lista-fatos';
import { Button } from '@material-ui/core'
import { useState } from 'react'
import {useAuth} from '../services/MeuAuthenticator'
import { useHistory } from 'react-router-dom';

export default function ModalEditarOco(props) {
    const history = useHistory();
    const ctx = useAuth();
    const [solicitanteInput, setSolicitanteInput] = useState("");
    const [enderecoInput, setEnderecoInput] = useState("");
    const [vitimaInput, setVitimaInput] = useState("");
    const [descricaoInput, setDescricaoInput] = useState("");


    function fecharModalEditarOco() {
        setSolicitanteInput('');
        setEnderecoInput('');
        setVitimaInput('');
        setDescricaoInput('');
        document.getElementById("modalEditarOco").style.display = "none";
        document.getElementById("formEditarOcorrencia").reset();
        props.setFato("");
        props.setEquipes([""]);
        props.setVisibility(false);
    }

    async function salvar() {
        let oc = {};
        oc.despacho = props.oco.despacho;
        oc.fato = props.fato;
        // esse aqui so tem no modal editar oco:  oc.equipe = document.getElementById("equipeInput").value;
        oc.solicitante = solicitanteInput||props.oco.solicitante;
        oc.endereco = enderecoInput||props.oco.endereco;
        oc.vitima = vitimaInput||props.oco.vitima;
        oc.descricao = descricaoInput||props.oco.descricao;
        oc.despachante_responsavel = ctx.currentUser.postograd + " " + ctx.currentUser.nomedeguerra;
        console.log("Editar oco: despachante editando: " + oc.despachante_responsavel)
        oc.equipe = null;
        oc.status = "pendente";
        if (props.equipe !== props.oco.equipe) {
            //quer dizer que o usuario trocou a equipe e clicou em salvar
            oc.equipe = props.equipe;
            oc.status = "em atendimento";
            let url = "http://localhost:3000/statusequipe?viatura=" + oc.equipe + "&status=ocupada";
            let eq = await fetch(url).then(resposta => resposta.json());
            console.log(eq)

        }
        console.log(oc);
        let parametroDoFetchPost = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(oc)
        }
        var respostacrua = await fetch('http://localhost:3000/ocorrencias', parametroDoFetchPost);
        let respostajason = await respostacrua.json();
        console.log(respostajason);
        fecharModalEditarOco();
        history.push("/empty");         
        history.push("/home")
    }
    return (
        <div id="modalEditarOco" className="modal" style={{ display: props.visible ? 'block' : 'none' }}>
            <div className="modal-content">
                <header className="w3-container w3-indigo">
                    <span className="close" onClick={fecharModalEditarOco}>&times;</span>
                    <h2>Editar ocorrência</h2>
                </header>
                <div className="w3-container">
                    <form action="/home/criarocorrencia" method="POST" id="formEditarOcorrencia">
                        <table>
                            <tbody>
                                <tr>
                                    <td><label htmlFor="despachoInput">Despacho Nº:</label></td>
                                    <td><input type="text" name="despachoInput" id="despachoInput" disabled
                                        placeholder="auto-preenchimento" defaultValue={props.oco.despacho || ""} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="fatoSelect">Fato:</label></td>
                                    <td><select onChange={(sel) => {
                                        props.setFato(sel.target.value);
                                    }}
                                        name="fatoSelect" id="fatoSelect" value={props.fato}>
                                        {FATOS.map((fato) => {
                                            return <option key={fato.value} value={fato.value}>{fato.content}</option>
                                        })}

                                    </select></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="equipeSelect">Equipe:</label></td>
                                    <td><select name="equipeSelect" id="equipeSelect" value={props.equipe || ""}
                                        onChange={(sel) => {
                                            props.setEquipe(sel.target.value);
                                        }}>
                                        {props.equipes.map((equipe) => {
                                            return <option key={equipe} value={equipe}>{equipe}</option>
                                        })}
                                    </select></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="solicitanteInput">Solicitante:</label></td>
                                    <td><input onInput={(e)=>setSolicitanteInput(e.target.value)} type="text" name="solicitanteInput" id="solicitanteInput" defaultValue={props.oco.solicitante || ""} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="vitimaInput">Vítima</label></td>
                                    <td><input onInput={(e)=>setVitimaInput(e.target.value)} type="text" name="vitimaInput" id="vitimaInput" defaultValue={props.oco.vitima || ""} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="enderecoInput">Endereço</label></td>
                                    <td><input onInput={(e)=>setEnderecoInput(e.target.value)} type="text" name="enderecoInput" id="enderecoInput" defaultValue={props.oco.endereco || ""} /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="descricaoInput">Descrição: </label></td>
                                    <td><textarea onInput={(e)=>setDescricaoInput(e.target.value)} name="descricaoInput" id="descricaoInput" cols={30} defaultValue={props.oco.descricao || ""}
                                        rows={4}></textarea></td>
                                </tr>
                                <tr>
                                    <td><Button onClick={salvar} variant="contained" color="primary">Salvar</Button></td>
                                    <td><Button onClick={fecharModalEditarOco} variant="contained" color="secondary">Cancelar</Button></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}
