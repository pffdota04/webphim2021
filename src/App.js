
import './App.css';

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Category from './pages/Category';
import Search from './pages/Search';
import UserRequest from './pages/UserRequest';
import Login from './pages/Login';
import Watch from './pages/Watch';
import UnlockList from './pages/UserList/UnlockList';
import WatchLaterList from "./pages/UserList/WatchLaterList";
import Admin from './pages/Admin';
import ErrorPage from './pages/ErrorPage';


function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <main className="main">
          <Switch>
            <Route path="/phim/:type" component={Category}></Route>
            <Route path="/search/:value" component={Search}></Route>
            <Route path="/user" component={UserRequest}></Route>
            <Route path="/login" component={Login} />
            <Route
              path={["/watch/:id/:name", "/watch/:id"]}
              component={Watch}
            />
            <Route path="/unlock" x component={UnlockList} />
            <Route path="/mylist" component={WatchLaterList} />
            <Route path="/admin" component={Admin} />
            <Route exact path={["/", "/home"]} component={Home} />
            <Route path="/404" component={() => <ErrorPage error={404}/>} />
            <Redirect to="/404" />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
