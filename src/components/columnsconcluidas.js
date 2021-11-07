//esse arquivo JS só serve para exportar o nome das minhas colunas, cada coluna é um objeto {} dentro do array COLUMNS
//import { format } from 'date-fns';
import { ColumnFilter } from './ColumnFilter';

// type Column = {
//     Header: string,
//     accessor: string,
//     Filter: Function,
//     disableFilters?: boolean,
//     sticky?: string,
//     Cell?: Function,
// }

export const COLUMNS = [
    {
        Header: 'Despacho',
        accessor: 'despacho', //accessor é o nome exato da coluna que virá da minha base de dados
        Filter: ColumnFilter, //Eu não posso deletar um filtro só de uma coluna, eu tenho que adicionar em todas se eu quiser usar, 
        disableFilters: true, //mas pra remover eu uso disableFilter true, porque essa coluna não tem sentido fazer filter
        sticky: 'left'
    },
    {
        Header: 'Fato',
        accessor: 'fato',
        Filter: ColumnFilter,
    },
    {
        Header: 'Endereço',
        accessor: 'endereco',
        Filter: ColumnFilter,
    },
    {
        Header: 'Solicitante',
        accessor: 'solicitante',
        Filter: ColumnFilter,
    },
    {
        Header: 'Vítima',
        accessor: "vitima",
        Filter: ColumnFilter,
    },
    {
        Header: 'Despachante Responsável',
        accessor: 'despachante_responsavel',
        Filter: ColumnFilter,
    },
    {
        Header: 'Descrição',
        accessor: "descricao",
        Filter: ColumnFilter,
    },
    {
        Header: 'Status',
        accessor: "status",
        Filter: ColumnFilter,
    },
    {
        Header: 'Criada em:',
        accessor: "createdAt",
        Filter: ColumnFilter,
        //Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') } //Cell controla o que é renderizado na UI, e eu vou fazer uma função pra formatar a data do meu jeito
    },
    {
        Header: 'Última alteração em:',
        accessor: "updatedAt",
        Filter: ColumnFilter,
        //Cell: ({ value }) => { return format(new Date(value), 'dd/MM/yyyy') } //Cell controla o que é renderizado na UI, e eu vou fazer uma função pra formatar a data do meu jeito
    }

]