import { useTable, useSortBy} from 'react-table';
import { useEffect, useMemo, useState } from 'react';
import { COLUMNS } from './columnsconcluidas';

import './TablePendentes.css';

export default function Concluidas(props) {
    const [conteudo, setConteudo] = useState([]);
    async function buscar() {
        let retorno = await fetch("http://localhost:3000/ocorrenciasconcluidas");
        let jason = await retorno.json();
        let vetorderesultados = jason.rows;
        setConteudo(vetorderesultados);
    }
    const columns = useMemo(() => COLUMNS, []);
    const data = useMemo(() => conteudo, [conteudo]); 
    useEffect(()=> buscar(),[]);

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
        <table id="pendentes"  {...getTableProps()}>
            <thead>
                {
                    headerGroups.map((elemento) => {
                        return (
                            <tr {...elemento.getHeaderGroupProps()}>
                                {elemento.headers.map((column) => {
                                    return (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>  
                                            {column.render('Header')} {/*Eu tenho que passar no th o parametro getSortByToggle, que adiciona na coluna individual propriedades relacionadas com a ordenaçao*/}
                                            <span>{column.isSorted? (column.isSortedDesc? '^':'v'):""}</span>
                                        </th>)
                                })}
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
                        </tr>
                    )
                })
                }
            </tbody>
            
        </table>
    )
}