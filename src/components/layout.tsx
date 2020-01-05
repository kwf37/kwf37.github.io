/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import theme from './theme';
import Header from './header';
import './layout.css';
import { ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Profile from './profile';
import Footer from './footer';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <Container
      style={{
        margin: `0 auto`,
        maxWidth: 900,
        padding: `0px `,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: 'rgba(255,255,255,0.8)',
      }}
    >
      <Header siteTitle={data.site.siteMetadata.title} />
      <Grid
        container
        spacing={1}
        style={{
          padding: `0px 1.0875rem 1.45rem`,
        }}
      >
        <Grid item xs={3}>
          <Profile />
        </Grid>
        <Grid item xs={9}>
          <Paper></Paper>
          <main>{children}</main>
        </Grid>
      </Grid>
      <Footer />
    </Container>
  );
};

export default Layout;
