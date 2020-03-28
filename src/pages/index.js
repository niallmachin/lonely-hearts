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
        <h2 className={styles.subTitle}>{data.site.siteMetadata.description}</h2>
      </div>
    </BackgroundImage>

    <section id="about" className={styles.about}>
      <Img className={styles.headshot} fluid={data.homeData.edges[0].node.frontmatter.headshot.childImageSharp.fluid} />
      <div className={styles.bio}>
        <Markdown>
          {data.homeData.edges[0].node.frontmatter.about}
        </Markdown>
      </div>
    </section>

    <section id="projects" className={styles.projects}>
      <h1 className="sectionTitle">Projects</h1>

      <div className={styles.projectList}>
        {data.projectsData.edges.map((project) => {
          return (
            <Link className={styles.projectWrap} to={project.node.fields.slug} key={project.node.frontmatter.title}>
              <Img className={styles.project}fluid={project.node.frontmatter.gallery[0].childImageSharp.fluid}/>
              <div className={styles.projectInfo}>
                <h2>
                  {project.node.frontmatter.title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </section>

    <section id="contacts" className={styles.contacts}>
      <h1 className="sectionTitle">Contact</h1>
      <a 
        href={`mailto:${data.homeData.edges[0].node.frontmatter.email}`}
      >
        {data.homeData.edges[0].node.frontmatter.email}
      </a>
    </section>

    <section className={styles.gallery}>
      {data.homeData.edges[0].node.frontmatter.gallery.map((image) => {
        return <Img key={image.id} className={styles.galleryImage} fluid={image.childImageSharp.fluid} />;
      })}
    </section>

    <section className={styles.upcoming}>
      <h1 className="sectionTitle">Upcoming Performances</h1>
      <ul>
        {data.homeData.edges[0].node.frontmatter.upcoming_performances.map((performance) => {
          return (
            <li key={performance} className={styles.performance}>{performance}</li>
          );
        })}
      </ul>
    </section>
    
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
                id
                childImageSharp {
                  fluid (maxWidth: 300, maxHeight: 300, cropFocus: CENTER) {
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
                  fluid (maxWidth: 300, maxHeight: 300, cropFocus: CENTER){
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
              gallery {
                id
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              email
              facebook
              instagram
              whilst_walking
              upcoming_performances
            }
          }
        }
      }
    }
  `;

Home.propTypes = {
  data: PropTypes.node,
};