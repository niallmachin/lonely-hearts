import React from 'react';

import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Layout from '../components/layout';
import Img from 'gatsby-image';
import styles from '../styles/Project.module.scss';

const Post = ({data}) => {
  return (
    <Layout>
      <h1 className={styles.title}>{data.postData.frontmatter.title}</h1>
      <section className={styles.gallery}>
        {data.postData.frontmatter.gallery.map(image => {
          return <Img className={styles.thumbnail} key={image.id} fluid={image.childImageSharp.fluid} />;
        })}
      </section>
      <section className={styles.postBody} dangerouslySetInnerHTML={{ __html: data.postData.html }} />
    </Layout>
  );
};

export default Post;

export const query = graphql`
query PostData($slug: String!) {
  postData: markdownRemark(fields: {slug: {eq: $slug}}) {
    html
    frontmatter {
      title
      gallery {
        id
        childImageSharp {
          fluid {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`;

Post.propTypes = {
  data: PropTypes.node,
};