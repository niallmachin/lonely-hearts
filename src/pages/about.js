import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import styles from '../styles/About.module.scss';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Markdown from 'markdown-to-jsx';

const About = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <h1 className={styles.title}>About</h1>

    <section id="about" className={styles.about}>
      <Img
        className={styles.headshot}
        fluid={
          data.aboutData.edges[0].node.frontmatter.headshot.childImageSharp
            .fluid
        }
      />
      <div className={styles.bio}>
        <Markdown>{data.aboutData.edges[0].node.frontmatter.about}</Markdown>
      </div>
    </section>
  </Layout>
);

export default About;

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    aboutData: allMarkdownRemark(
      filter: { fields: { slug: { eq: "/about/" } } }
    ) {
      edges {
        node {
          frontmatter {
            about
            headshot {
              childImageSharp {
                fluid {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
  }
`;

About.propTypes = {
  data: PropTypes.node,
};
