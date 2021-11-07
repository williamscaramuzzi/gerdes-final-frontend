import { Link } from 'react-router-dom';
export default function Sidebar() {

    return (
        <div className="sidebar">
            <div className="menuTitulo">
                Menu
            </div>
            <ul>
                <li>
                    <Link to="/home">
                        Ocorrências
                    </Link>
                </li>
                <li>
                    <Link to="/equipes">
                        Equipes
                    </Link>
                </li>
                <li>
                    <Link to="/concluidas">
                        Arquivadas
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Logout
                    </Link>
                </li>
            </ul>
        </div>
    )
}

