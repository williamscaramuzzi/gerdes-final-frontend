import React from 'react'
import './ModalConcluirOco.css'
import FATOS from './00Lista-fatos';
import { Button } from '@material-ui/core'
import { useState } from 'react'
import {useAuth} from '../services/MeuAuthenticator'
import { useHistory } from 'react-router-dom';

export default function ModalConcluirOco(props) {
    const history = useHistory();
    const ctx = useAuth();
    const [solicitanteInput, setSolicitanteInput] = useState("");
    const [enderecoInput, setEnderecoInput] = useState("");
    const [vitimaInput, setVitimaInput] = useState("");
    const [descricaoInput, setDescricaoInput] = useState("");
    const [digiteODesfecho, setDigiteODesfecho] = useState("");

    function fecharModalConcluirOco() {
        setSolicitanteInput('');
        setEnderecoInput('');
        setVitimaInput('');
        setDescricaoInput('');
        document.getElementById("modalConcluirOco").style.display = "none";
        document.getElementById("formConcluirOcorrencia").reset();
        props.setFato("");
        props.setEquipes([""]);
        props.setVisibility(false);
    }

    async function salvar(e) {
        if(document.getElementById("formConcluirOcorrencia").checkValidity()) e.preventDefault(); else return;
        let oc = {};
        oc.despacho = props.oco.despacho;
        oc.fato = props.fato;
        // esse aqui so tem no modal editar oco:  oc.equipe = document.getElementById("equipeInput").value;
        oc.solicitante = solicitanteInput||props.oco.solicitante;
        oc.endereco = enderecoInput||props.oco.endereco;
        oc.vitima = vitimaInput||props.oco.vitima;
        oc.descricao = descricaoInput||props.oco.descricao;
        oc.despachante_responsavel = ctx.currentUser.postograd + " " +  ctx.currentUser.nomedeguerra;
        console.log("Editar oco: despachante editando: " + oc.despachante_responsavel)
        oc.equipe = props.oco.equipe;
        oc.status = props.oco.status;
        if (props.equipe !== props.oco.equipe) {
            //quer dizer que o usuario substituiu a equipe anterior 
            //liberar a anterior
            let url = "http://localhost:3000/statusequipe?viatura=" + props.oco.equipe + "&status=disponivel";
            await fetch(url).then(resposta => resposta.json());
            //empenhar a nova equipe
            oc.equipe = props.equipe;
            oc.status = "em atendimento";
            url = "http://localhost:3000/statusequipe?viatura=" + oc.equipe + "&status=ocupada";
            await fetch(url).then(resposta => resposta.json());
        }
        console.log(oc);
        let parametroDoFetchPut = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(oc)
        }
        var respostacrua = await fetch('http://localhost:3000/ocorrencias', parametroDoFetchPut);
        let respostajason = await respostacrua.json();
        console.log(respostajason);
        fecharModalConcluirOco();
        history.push("/empty");         
        history.push("/home")
    }
    async function concluir(e) {
        if(document.getElementById("formConcluirOcorrencia").checkValidity()) e.preventDefault(); else return;
        let desfecho = window.prompt("Insira o desfecho da ocorrência (recomenda-se anotar o nº do BO SIGO): ");
        if(desfecho===null){
            //usuario cancelou o prompt, desistiu de concluir, portanto, não salvamos nada, só sair dessa função
            return;
        }
        if(desfecho===""){
            //usuario não digitou nada e deu ok, temos que obrigar ele a digitar
            setDigiteODesfecho("Insira um desfecho para a ocorrencia");
            return;
        }
        setDigiteODesfecho("");
        let oc = {};
        oc.despacho = props.oco.despacho;
        oc.fato = props.fato;
        oc.solicitante = solicitanteInput||props.oco.solicitante;
        oc.endereco = enderecoInput||props.oco.endereco;
        oc.vitima = vitimaInput||props.oco.vitima;
        oc.descricao = descricaoInput||props.oco.descricao;
        oc.descricao = oc.descricao +"; Conclusão: "+ desfecho+"; Equipe que atendeu a ocorrência: "+props.equipe;
        oc.despachante_responsavel = ctx.currentUser.postograd + " " + ctx.currentUser.nomedeguerra;
        oc.equipe = null;
        oc.status = "concluida";
        let parametroDoFetchPost = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(oc)
        }
        var respostacrua = await fetch('http://localhost:3000/ocorrencias', parametroDoFetchPost);
        let respostajason = await respostacrua.json();
        //liberar a viatura  
        let url = "http://localhost:3000/statusequipe?viatura=" + props.equipe + "&status=disponivel";
        await fetch(url).then(resposta => resposta.json());
        console.log(respostajason);
        fecharModalConcluirOco();
        history.push("/empty");         
        history.push("/home")
    }
    return (
        <div id="modalConcluirOco" className="modal" style={{ display: props.visible ? 'block' : 'none' }}>
            <div className="modal-content">
                <header className="w3-container w3-indigo">
                    <span className="close" onClick={fecharModalConcluirOco}>&times;</span>
                    <h2>Finalizar ocorrência</h2>
                </header>
                <div className="w3-container">
                    <form action="/home/criarocorrencia" method="POST" id="formConcluirOcorrencia">
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
                                    <td><Button onClick={salvar} type="submit" variant="outlined" color="secondary">Salvar</Button></td>
                                    <td><Button onClick={concluir} type="submit" variant="contained" color="primary">Concluir</Button></td>
                                    <td><Button onClick={fecharModalConcluirOco} variant="contained" color="secondary">Cancelar</Button></td>
                                    <td><span>{digiteODesfecho}</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}
