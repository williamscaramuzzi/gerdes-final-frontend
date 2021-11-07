import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LoginContainer from './components/LoginContainer';
import MainPage from './components/MainPage';
import EquipesPage from './components/EquipesPage';
import './App.css';
import { AuthProvider, PrivateRoute } from './services/MeuAuthenticator';
import PageConcluidas from './components/PageConcluidas';

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* //Router deve englobar todos os componentes do meu app, de modo que eu possa rotear entre eles
      //em cada Route eu devo colocar exact, para que ele procure o nome EXATO que eu defini no path, 
      //Eu devo circundar as Routes com um Switch, que é pra ele renderizar somente uma das opçoes */}
        <Switch>
          <Route path="/" exact component={LoginContainer} />

          <PrivateRoute path="/home" >
            <MainPage/>
          </PrivateRoute>

          <PrivateRoute path="/equipes">
            <EquipesPage/>
          </PrivateRoute>

          <PrivateRoute path="/concluidas">
            <PageConcluidas/>
          </PrivateRoute>
          
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
