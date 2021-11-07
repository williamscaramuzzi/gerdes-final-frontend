import { ColumnFilter } from './ColumnFilter';


export const COLUMNS = [
    {
        Header: 'Prefixo',
        accessor: 'viatura', //accessor é o nome exato da coluna que virá da minha base de dados
        Filter: ColumnFilter, //Eu não posso deletar um filtro só de uma coluna, eu tenho que adicionar em todas se eu quiser usar, 
        sticky: 'left'
    },
    {
        Header: 'Comandante',
        accessor: 'comandante',
        Filter: ColumnFilter,
    },
    {
        Header: 'Status',
        accessor: "status",
        Filter: ColumnFilter,
    }

]