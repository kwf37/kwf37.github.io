import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import Profile from '../components/profile';
import SEO from '../components/seo';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />

    <a href="/page-2/">Go to page 2</a>
    <p>Hello world I am Kenneth</p>
  </Layout>
);

export default IndexPage;
