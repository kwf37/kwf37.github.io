import React from 'react';
import { graphql } from 'gatsby';
import clsx from 'clsx';
import Paper from '@material-ui/core/Paper';
import Layout from '../components/layout';
import Backdrop from '../components/backdrop';
import Background from '../components/Background';
import {
  ThemeProvider,
  Theme,
  createMuiTheme,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import rehypeReact from 'rehype-react';
import { withStyles, makeStyles } from '@material-ui/core/styles';

// Define Components for basic markdown types
let theme = createMuiTheme({});
theme = responsiveFontSizes(theme);
const styles = (theme: Theme) => ({
  h1: {
    ...theme.typography.h3,
  },
  h2: {
    ...theme.typography.h4,
  },
  h3: {
    ...theme.typography.h5,
  },
  paragraph: {
    ...theme.typography.body1,
  },
});
const markDownStyles = makeStyles((theme: Theme) => {
  paragraph: {
  }
});
const H1: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = styles(theme);
  return <h1 style={classes.h1}>{children}</h1>;
};
const H2: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = styles(theme);
  return <h2 style={classes.h2}>{children}</h2>;
};
const H3: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = styles(theme);
  return <h3 style={classes.h3}>{children}</h3>;
};
const P: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = styles(theme);
  return <p style={classes.paragraph}>{children}</p>;
};
const UL: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = styles(theme);
  return <ul style={classes.paragraph}>{children}</ul>;
};
const LI: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = styles(theme);
  return <li style={classes.paragraph}>{children}</li>;
};

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: H1,
    h2: H2,
    h3: H3,
    p: P,
    li: LI,
  },
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
