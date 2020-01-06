import React from 'react';
import { graphql } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/layout';
import Backdrop from '../components/backdrop';
import Background from '../components/Background';
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
      <Backdrop>
        <Background></Background>
        <Layout>
          <Paper
            style={{
              padding: '15px',
            }}
            dangerouslySetInnerHTML={{ __html: html }}
          ></Paper>
        </Layout>
      </Backdrop>
    </ThemeProvider>
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
