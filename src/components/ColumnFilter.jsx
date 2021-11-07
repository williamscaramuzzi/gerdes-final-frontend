
export function ColumnFilter({column}){
    //esse é o filtro de cada coluna, eu tenho que dar um import desse componente lá no meu arquivo constante que define as COLUMNS

    const {filterValue, setFilter } = column;
    return(
        <span>
            Search Column: {''}
            <input value={filterValue || ''}
            onChange={(evento)=>setFilter(evento.target.value)}
            />
            
        </span>
    )
}