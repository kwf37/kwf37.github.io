import React from 'react';
import { graphql } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/layout';
import Backdrop from '../components/backdrop';
import Cubes from '../components/cubes';
import SpinCube from '../components/spincube';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

interface MarkdownData {
  markdownRemark: {
    html: string;
    frontmatter: {
      date: string;
      path: string;
      title: string;
    };
  };
}

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}: {
  data: MarkdownData;
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Layout>
        <Paper
          style={{
            padding: '15px',
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        ></Paper>
      </Layout>
    </ThemeProvider>
  );
  return (
    <Backdrop>
      <Cubes canvas_id="canvas" />
      <Layout>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Layout>
    </Backdrop>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
