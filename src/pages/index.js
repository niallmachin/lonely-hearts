import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import BackgroundImage from 'gatsby-background-image';
import styles from '../styles/Home.module.scss';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Markdown from 'markdown-to-jsx';

const Home = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <BackgroundImage
      fluid={data.allMarkdownRemark.edges[0].node.frontmatter.main_image.childImageSharp.fluid}
      backgroundColor={'#000000'}
    >
      <div className={styles.introSlide}>
        <h1 className={styles.title}>{data.site.siteMetadata.title}</h1>
        <h2>{data.site.siteMetadata.description}</h2>
      </div>
    </BackgroundImage>

    <article className={styles.about}>
      <Img className={styles.headshot} fluid={data.allMarkdownRemark.edges[0].node.frontmatter.headshot.childImageSharp.fluid} />
      <div>
        <Markdown>
          {data.allMarkdownRemark.edges[0].node.frontmatter.about}
        </Markdown>
      </div>
    </article>

    <article className={styles.projects}>
      <h1 className="sectionTitle">Projects</h1>

      <div className={styles.projectList}>
        {data.allMarkdownRemark.edges[0].node.frontmatter.projects.map((project) => {
          return (
            <Img key={project.title} fluid={project.gallery[0].childImageSharp.fluid}/>
          );
        })}
      </div>
    </article>
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
              about
              headshot {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              main_image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              projects {
                title
                gallery {
                  childImageSharp {
                    fluid {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
                description
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