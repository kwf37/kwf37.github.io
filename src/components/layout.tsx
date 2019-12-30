/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';

import Header from './header';
import './layout.css';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Profile from './profile';
import Footer from './footer';
import SpinCube from './spincube';
import Stack from './stack';

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
        maxWidth: 960,
        padding: `0px 1.0875rem 1.45rem`,
        paddingTop: 0,
        paddingBottom: 0,
      }}
    >
      <SpinCube canvas_id="canvas" />
      <Grid
        container
        spacing={1}
        style={{
          position: `relative`,
          zIndex: 2,
        }}
      >
        <Grid item xs={12}>
          <Header siteTitle={data.site.siteMetadata.title} />
        </Grid>
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
