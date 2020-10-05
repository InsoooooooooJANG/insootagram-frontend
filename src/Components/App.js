import { ApolloClient } from "apollo-boost";
import React from "react";
import {ApolloProvider} from "react-apollo-hooks";
import { Router } from "react-router-dom";
import {ThemeProvider} from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";
import Client from "../Apollo/Client"

export default () => (
  <ThemeProvider theme ={Theme}>
  <> 
    <GlobalStyles/>
    <AppRouter isLoggedIn={false}/>
  </>
  </ThemeProvider>
);