  import React, { useContext } from "react";

  import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
  import Admin from "../components/admin/Admin";
  import Home from '../components/home/Home'
  import Navbar from '../components/navbar/Navbar'

  export const AppRouter = () => {

    return (
      <Router>
        <Navbar />

        <div className="container mt-5">
            
            <Switch>
                <Route exact path="/home" component={Home}/> 
                <Route exact path="/admin" component={Admin}/> 

                <Redirect to="/home"/>
                
            </Switch>
        </div>
       
      </Router>
    );
  };
