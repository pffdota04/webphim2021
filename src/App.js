
import './App.css';

import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Category from './pages/Category';
import Search from './pages/Search';
import UserRequest from './pages/UserRequest';
import Login from './pages/Login';
import Watch from './pages/Watch';
import UnlockList from './pages/UserList/UnlockList';
import WatchLaterList from "./pages/UserList/WatchLaterList";


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
            <Route path="/watch/:id" component={Watch} />
            <Route path="/unlock" component={UnlockList} />
            <Route path="/mylist" component={WatchLaterList} />
            
            <Route path="/" component={Home}/>
          </Switch>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
