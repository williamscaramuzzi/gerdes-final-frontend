import React from 'react';
import './ModalCriarOco.css';
import FATOS from './00Lista-fatos';
import { Button } from '@material-ui/core';
import {useAuth} from '../services/MeuAuthenticator'
import { useHistory } from 'react-router-dom';

export default function ModalCriarOco(props) {
    const history = useHistory();
    const ctx = useAuth();

    function fecharModalCriarOco(){
        document.getElementById("modalCriarOco").style.display = "none";
        document.getElementById("formCriarOcorrencia").reset();
        props.setVisibility(false);
    }

    async function criarOcorrencia(e){
        e.preventDefault();        
        let oco = {};
        oco.fato = document.getElementById("fatoSelect").value;
        // esse aqui so tem no modal editar oco:  oco.equipe = document.getElementById("equipeInput").value;
        oco.solicitante = document.getElementById("solicitanteInput").value;
        oco.endereco = document.getElementById("enderecoInput").value;
        oco.vitima = document.getElementById("vitimaInput").value;
        oco.descricao = document.getElementById("descricaoInput").value;
        oco.status = "pendente";
        oco.equipe = null;
        oco.despachante_responsavel = ctx.currentUser.postograd + ctx.currentUser.nomedeguerra;
        let parametroDoFetchPost = {
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify(oco)
          }
          var respostacrua = await fetch('http://localhost:3000/ocorrencias', parametroDoFetchPost);  
          let respostajason = await respostacrua.json();
          console.log(respostajason);
          document.getElementById("formCriarOcorrencia").reset();
          fecharModalCriarOco();
          history.push("/empty");
          history.push("/home")
    }
    
    return (
        <div id="modalCriarOco" className="modal" style={{display: props.visible? 'block':'none'}}>
            <div className="modal-content">        
            <header className="w3-container w3-indigo">
            <span className="close" onClick={fecharModalCriarOco}>&times;</span>
            <h2>Cadastrar ocorrência</h2>
            </header>
            <div className="w3-container">
                            <form method="POST" id="formCriarOcorrencia">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><label htmlFor="despachoInput">Despacho Nº:</label></td>
                                            <td><input type="text" name="despachoInput" id="despachoInput" disabled
                                                    placeholder="auto-preenchimento"/></td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="fatoSelect">Fato:</label></td>
                                            <td><select name="fatoSelect" id="fatoSelect">
                                                    {FATOS.map((fato)=>{
                                                        return <option key={fato.value} value={fato.value}>{fato.content}</option>
                                                    })}
                                                </select></td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="solicitanteInput">Solicitante:</label></td>
                                            <td><input type="text" name="solicitanteInput" id="solicitanteInput" /></td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="vitimaInput">Vítima</label></td>
                                            <td><input type="text" name="vitimaInput" id="vitimaInput" /></td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="enderecoInput">Endereço</label></td>
                                            <td><input type="text" name="enderecoInput" id="enderecoInput" /></td>
                                        </tr>
                                        <tr>
                                            <td><label htmlFor="descricaoInput">Descrição: </label></td>
                                            <td><textarea name="descricaoInput" id="descricaoInput" cols={30}
                                                    rows={4}></textarea></td>
                                        </tr>
                                        <tr>
                                            <td><Button type="submit" onClick={criarOcorrencia} variant="contained" color="primary">Incluir</Button></td>
                                            <td><Button onClick={fecharModalCriarOco} variant="contained" color="secondary">Cancelar</Button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </form>
                        </div>
            </div>
        </div>
    )
}
