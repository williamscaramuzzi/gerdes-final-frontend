import './LoginContainer.css';
import { Button, TextField } from '@material-ui/core';
import { useAuth, signIn } from '../services/MeuAuthenticator';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';


function LoginContainer() {
    const history = useHistory();
    const [matricula, setMatricula] = useState(0);
    const [senha, setSenha] = useState("");
    const [flasherrors, setFlasherrors] = useState();
    const ctx = useAuth();

    async function validaLogin() {
        let usuarioBuscadoNoBd = await signIn(matricula, senha);
        if (usuarioBuscadoNoBd.erro === undefined) {
            ctx.setCurrentUser(usuarioBuscadoNoBd);
            ctx.setIsAuthenticated(true);
            history.push("/home");
        }
        else {
            setFlasherrors(usuarioBuscadoNoBd.erro);
        }
    }
    return (
        <>
            <div className="cabecalho">
                <img src="/brasao-pmms.png" alt="cabeçalho" />
            </div>
            <div className="divtitulo">Gerenciador de Despachos de Viaturas</div>
            <div id="divcontainer">
                <div className="divform">
                    <form id="formulario" onSubmit={(event) => {
                        event.preventDefault();
                        validaLogin();
                    }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label htmlFor="matriculaInputText">Matrícula:</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td><TextField type="number" required id="matriculaInputText" onChange={(evento) => setMatricula(parseInt(evento.target.value))} variant="outlined" /></td>
                                </tr>
                                <tr>
                                    <td>
                                        <label htmlFor="senhaInputText">Senha:</label>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <TextField required type="password" onChange={(evento) => setSenha(evento.target.value)} id="senhaInputText" variant="outlined" />
                                    </td>
                                </tr>
                                <tr>
                                    <td id="buttonTd"><Button variant="contained" color="primary" type="submit" id="botaoEntrar">Entrar</Button></td>
                                </tr>
                            </tbody>
                        </table>
                        <span>{JSON.stringify(flasherrors)}</span>
                    </form></div>
            </div>
            <div className="rodapeWrapper">
                <div className="policiaMilitar">POLÍCIA MILITAR</div>
                <div className="ms">MATO GROSSO DO SUL</div>
                <div className="logoEstado">
                    <img src="/logoGovernoEstado.png" alt="" />
                </div>
            </div>

        </>
    );
}

export default LoginContainer;
