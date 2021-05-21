import { useState } from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom"
import "./App.css"
import Page1 from "./components/page1/page1";
import Page2 from "./components/page2/page2";
import ContentPage from "./components/page3/page3";

function App() {
  const [path,setPath] = useState("")
  return (
    <div className="App">
      <BrowserRouter>
          <div className="content-wrapper">            
            <form className="switch-form">
              <input type="radio" name="switcher" onClick={()=>setPath("/land")}/>
              <label className="radio-txt">Tab_1</label>
              <input type="radio" name="switcher" onClick={()=>setPath("/galery")}/>
              <label className="radio-txt">Tab_2</label>
              <input type="radio" name="switcher" onClick={()=>setPath("/content")}/>
              <label className="radio-txt">Tab_3</label>
            </form>  
            <div className="main-form-bar">
              <div className="main-form-wrp">
                <h2>Название({path==="/content"?"Tab_3":(path==="/galery"?"Tab_2":"Tab_1")})</h2>
                <Switch>
                  <Route path="/land" component={Page1}></Route>
                  <Route path="/galery" component={Page2}></Route>
                  <Route path="/content" component={ContentPage}></Route>
                </Switch>
              </div>              
            </div>                      
            <Redirect from="/" to="/land"></Redirect>              
          </div>
          {path?<Redirect to={path}></Redirect>:null}
        </BrowserRouter> 
      </div>
  );
}

export default App;
