/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import Header from './header';
import { useStaticQuery, graphql } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebookF } from '@fortawesome/free-brands-svg-icons';

import styles from '../styles/Layout.module.scss';

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
  query LayoutQuery {
    homeData: allMarkdownRemark(filter: {fields: {slug: {eq: "/home/"}}}) {
      edges {
        node {
          frontmatter {
            instagram
            facebook
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`);
  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        <span>©2020 Niall Fallon</span>
        <div className={styles.social}>
          <a className={styles.iconWrap} href={data.homeData.edges[0].node.frontmatter.instagram}>
            <FontAwesomeIcon className={styles.socialIcon} icon={faInstagram} />
          </a>
          <a className={styles.iconWrap} href={data.homeData.edges[0].node.frontmatter.instagram}>
            <FontAwesomeIcon className={styles.socialIcon} icon={faFacebookF} />
          </a>
        </div>
      </footer>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
