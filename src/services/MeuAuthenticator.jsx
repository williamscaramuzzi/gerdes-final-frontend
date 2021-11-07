import { useContext, createContext, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
export async function signIn(matricula, senha) {
  let parametroDoFetchPost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ matricula, senha })
  }
  var respostacrua = await fetch('http://localhost:3000/login', parametroDoFetchPost);
  let respostajason = await respostacrua.json();
  return respostajason;

}
export function signIout() {

}
export function PrivateRoute({ children, ...rest }) {
  //esse ...rest pegou o resto dos parâmetros e jogou num json, ficando assim:
  // {path: "/home", location: {objeto grande aqui}, computedMatch: {outro objeto aqui}}
  //ali embaixo quando eu digito <Route {...rest} eu estou desestruturando o rest (repare que ele está entre chaves)
  //entao meu <Route vai ter todas essas props acessíveis de dentro dele
  let contexto = useAuth();

  console.log(contexto.isAuthenticated.toString());
  return (
    <Route {...rest} render={({ location }) => contexto.isAuthenticated ? (children) : (
      <Redirect to={{
        pathname: "/",
        state: { from: location }
      }} />
    )
    }
    />
  );
}