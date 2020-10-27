import GlobalStyles from "../Styles/GlobalStyles";
import { HashRouter as Router } from "react-router-dom";
import Theme from "../Styles/Theme";
import AppRouter from "./Routes";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
import { ApolloClient } from "apollo-boost";
import React from "react";
import { gql } from "apollo-boost";
import { ApolloProvider, useQuery } from "react-apollo-hooks";
import styled, { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// query를 서버에게 요청하는 게 아니라 client에 요청
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;
const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);

  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            <Header />
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};
