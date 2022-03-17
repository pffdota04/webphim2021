import "./App.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import UserRequest from "./pages/UserRequest";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Watch from "./pages/Watch";
import DetailFilm from "./pages/DetailFilm";
import UnlockList from "./pages/UserList/UnlockList";
import WatchLaterList from "./pages/UserList/WatchLaterList";
import Admin from "./pages/Admin";
import ErrorPage from "./pages/ErrorPage";
import XacThuc from "./pages/XacThuc";
import KitKot from "./pages/KitKot";
import News from "./pages/News";
import NewsContent from "./pages/NewsContent";
import SoanTin from "./pages/SoanTin";
import QuyCheDichVu from "./pages/QuyCheDichVu";
import ChinhSachBaoMat from "./pages/ChinhSachBaoMat/ChinhSachBaoMat";

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
            <Route path="/register" component={Register} />
            <Route
              path={["/watch/:id/:name", "/watch/:id"]}
              component={Watch}
            />
            <Route path="/unlock" x component={UnlockList} />
            <Route path="/mylist" component={WatchLaterList} />
            <Route path="/xacthuc" component={XacThuc} />
            <Route path="/admin" component={Admin} />
            <Route path="/kitkot" component={KitKot} />
            <Route path="/tintuc/:id" component={NewsContent} />
            <Route path="/tintuc" component={News} />
            <Route path="/soantin" component={SoanTin} />
            <Route path="/quychedichvu" component={QuyCheDichVu} />
            <Route path="/chinhsachbaomat" component={ChinhSachBaoMat} />
            <Route exact path={["/", "/home"]} component={Home} />
            <Route
              path={["/detailfilm/:id/:name", "/detailfilm/:id"]}
              component={DetailFilm}
            />
            <Route path="/404" component={() => <ErrorPage error={404} />} />
            <Redirect to="/404" />
          </Switch>
        </main>
      </>
    </BrowserRouter>
  );
}

export default App;
