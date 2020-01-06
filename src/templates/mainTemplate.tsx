import React from 'react';
import { graphql } from 'gatsby';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/layout';
import Backdrop from '../components/backdrop';
import Background from '../components/Background';
import theme from '../components/theme';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import rehypeReact from 'rehype-react';

const renderAst = new rehypeReact({
  createElement: React.createElement,
}).Compiler;

interface MarkdownData {
  markdownRemark: {
    htmlAst: string;
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
  data: any;
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  //const { frontmatter, htmlAst } = markdownRemark;
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Backdrop>
        <Background />
        <Layout>
          <Paper
            style={{
              padding: '15px',
            }}
          >
            {renderAst(markdownRemark.htmlAst)}
          </Paper>
        </Layout>
      </Backdrop>
    </ThemeProvider>
  );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      htmlAst
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
