import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import BackgroundImage from 'gatsby-background-image';
import styles from '../styles/Home.module.scss';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';

const Home = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <BackgroundImage
      fluid={data.allMarkdownRemark.edges[0].node.frontmatter.main_image.childImageSharp.fluid}
      backgroundColor={'#000000'}
      className={styles.introSlide}
    >
      <div className={styles.overlay}>
        <h1>{data.site.siteMetadata.title}</h1>
        <h2>{data.site.siteMetadata.description}</h2>
      </div>
    </BackgroundImage>
  </Layout>
);

export default Home;

export const query = graphql`
    query HomeQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
      allMarkdownRemark(filter: {fields: {slug: {eq: "/home/"}}}) {
        edges {
          node {
            frontmatter {
              main_image {
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

Home.propTypes = {
  data: PropTypes.node,
};