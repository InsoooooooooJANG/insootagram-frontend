import { ApolloClient } from "apollo-boost";
import React from "react";
import {gql} from "apollo-boost";
import {ApolloProvider, useQuery} from "react-apollo-hooks";
import { Router } from "react-router-dom";
import styled, {ThemeProvider} from "styled-components";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import AppRouter from "./Router";
import Footer from "./Footer";

// query를 서버에게 요청하는 게 아니라 client에 요청
const QUERY = gql `
  {
    isLoggedIn @client
  }
`
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 935px;
  width: 100%;
`;

export default () => {

  const {data:{isLoggedIn}} = useQuery(QUERY);

  return (
    <ThemeProvider theme ={Theme}>
    <Wrapper> 
      <GlobalStyles/>
      <AppRouter isLoggedIn={isLoggedIn}/>
      <Footer></Footer>
    </Wrapper>
    </ThemeProvider>
  );
};