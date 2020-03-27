import React from 'react';
import navigation from '../data/navigation';
import { graphql, Link, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import styles from '../styles/Header.module.scss';

const Header = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <header>
      <h2 className={styles.logo}>{data.site.siteMetadata.title}</h2>
      <nav>
        <ul>
          {navigation.map((navItem) => {
            return (
              <li key={navItem.name}><Link className={styles.navLink} to={navItem.url}>{navItem.name}</Link></li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

Header.propTypes = {
  data: PropTypes.node,
};