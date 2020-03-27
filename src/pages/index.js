import React from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';

import BackgroundImage from 'gatsby-background-image';
import styles from '../styles/Home.module.scss';
import { graphql, Link } from 'gatsby';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import Markdown from 'markdown-to-jsx';

const Home = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <BackgroundImage
      fluid={data.homeData.edges[0].node.frontmatter.main_image.childImageSharp.fluid}
      backgroundColor={'#000000'}
    >
      <div className={styles.introSlide}>
        <h1 className={styles.title}>{data.site.siteMetadata.title}</h1>
        <h2>{data.site.siteMetadata.description}</h2>
      </div>
    </BackgroundImage>

    <article className={styles.about}>
      <Img className={styles.headshot} fluid={data.homeData.edges[0].node.frontmatter.headshot.childImageSharp.fluid} />
      <div>
        <Markdown>
          {data.homeData.edges[0].node.frontmatter.about}
        </Markdown>
      </div>
    </article>

    <article className={styles.projects}>
      <h1 className="sectionTitle">Projects</h1>

      <div className={styles.projectList}>
        {data.projectsData.edges.map((project) => {
          return (
            <Link to={project.node.fields.slug} key={project.node.frontmatter.title}>
              <Img  fluid={project.node.frontmatter.gallery[0].childImageSharp.fluid}/>
            </Link>
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
      projectsData: allMarkdownRemark(filter: {fields: {slug: {nin: "/home/"}}} ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              gallery {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            internal {
              content
            }
          }
        }
      }
      homeData: allMarkdownRemark(filter: {fields: {slug: {eq: "/home/"}}}) {
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
            }
          }
        }
      }
    }
  `;

Home.propTypes = {
  data: PropTypes.node,
};