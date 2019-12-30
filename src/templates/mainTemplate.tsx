import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Backdrop from '../components/backdrop';
import Cubes from '../components/cubes';
import SpinCube from '../components/spincube';

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
