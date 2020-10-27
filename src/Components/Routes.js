import React from "react";
import PropTypes from "prop-types";
import {Route, Switch} from "react-router-dom";
import Auth from "../Routes/Auth";
import Feed from "../Routes/Feed"
import Explore from "../Routes/Explore";
import Profile from "../Routes/Profile";
import Search from "../Routes/Search";

// Switch : 한 개의 라우트만 렌더링해줌
const LoggedInRoutes = () => (
    <Switch> 
        <Route exact path="/" component={Feed}/>
        <Route path="/explore" component={Explore}/>
        <Route path="/search" component={Search}/>
        <Route path="/:username" component={Profile}/>
    </Switch>
)
const LoggedOutRoutes = () => (
    <Switch>
        <Route exact path="/" component={Auth}/>
    </Switch>
)

const AppRouter = ({isLoggedIn}) =>{
    return (
        isLoggedIn? <LoggedInRoutes/>:<LoggedOutRoutes/>
    );
};
    
AppRouter.propTypes = {
    isLoggedIn:PropTypes.bool.isRequired
};
export default AppRouter;