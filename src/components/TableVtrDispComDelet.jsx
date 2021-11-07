import { useTable, useSortBy } from 'react-table';
import { useMemo, useState, useEffect } from 'react';
import { COLUMNS } from './vtrscolumnscompleta';

import './TableVtrDispComDelet.css';

export default function VtrsDispoComDelet(props) {
    const [conteudo, setConteudo] = useState([]);
    const [deletarFlag, setDeletarFlag] = useState(0);
    async function buscar() {
        //console.log("Executou funcao buscar");
        let retorno = await fetch("http://localhost:3000/equipes/disponivel");
        let jason = await retorno.json();
        let vetorderesultados = jason.rows;
        setConteudo(vetorderesultados);
    }
    async function deletarVtrHandler(botao) {
        let obj = { viatura: botao.target.id }
        let pardofetchdelete = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
        let confirmacao = window.confirm("Tem certeza que quer desconectar a viatura " + botao.target.id + " ?");
        if (confirmacao) {
            await fetch('http://localhost:3000/equipes', pardofetchdelete).then(r => r.json()).then(j=>console.log(j));
            setDeletarFlag(old=>old+1);
        }
    }
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => conteudo, [conteudo]);

    useEffect(() => { buscar() }, [props, deletarFlag])
    const tableinstance = useTable({
        columns,
        data
    }, useSortBy); //quando eu quero ordenar minha tabela, eu preciso usar o useSortBy como segundo parâmetro no useTable
    const {
        getTableProps, //isso é uma função que useTable me dá, retorna um array [{}, {}, {}] e por isso eu fico desestruturando
        //o array com spread operator ... pra colocar as props dentro das tagas ali embaixo
        getTableBodyProps, //isso é uma função que useTable me dá, retorna um array [{}, {}, {}] e por isso eu fico desestruturando
        //o array com spread operator ... pra colocar as props dentro das tagas ali embaixo
        headerGroups, //essa variavel contem as informações de colunas, é um array tambem, não é só 
        //uma linha de headers, tem várias linhas de headers caso minha tabela seja mais complexa, com agrupamentos por exemplo

        rows,
        prepareRow
    } = tableinstance;
    return (
        <table id="vtrsDisponiveisTable"  {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((elemento) => {
                        return (
                            <tr {...elemento.getHeaderGroupProps()}>
                                {elemento.headers.map((column) => {
                                    return (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.render('Header')} {/*Eu tenho que passar no th o parametro getSortByToggle, que adiciona na coluna individual propriedades relacionadas com a ordenaçao*/}
                                            <span>{column.isSorted ? (column.isSortedDesc ? '^' : 'v') : ""}</span>
                                        </th>)
                                })}
                                <th>Deletar</th>
                            </tr>
                        )
                    })
                }
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);

                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                            <td><button onClick={ev => deletarVtrHandler(ev)} id={row.cells[0].value}>Deletar</button></td>
                        </tr>
                    )
                })
                }
            </tbody>

        </table>
    )
}