/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react'
import PropTypes from 'prop-types'
import Header from './header'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faFacebookF,
  faSoundcloud,
} from '@fortawesome/free-brands-svg-icons'

import styles from '../styles/Layout.module.scss'

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      homeData: allMarkdownRemark(
        filter: { fields: { slug: { eq: "/home/" } } }
      ) {
        edges {
          node {
            frontmatter {
              instagram
              facebook
              soundcloud
            }
          }
        }
      }
      site {
        siteMetadata {
          title
        }
      }
      artsCouncilLogo: imageSharp(
        fluid: { originalName: { eq: "arts-council-logo.png" } }
      ) {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `)

  console.log({ data })

  const artsCouncilLogo = data.artsCouncilLogo.fluid

  return (
    <>
      <Header />
      <main>{children}</main>
      <footer>
        <span>©2020 Niall Fallon</span>
        <div className={styles.social}>
          <a
            className={styles.iconWrap}
            href={data.homeData.edges[0].node.frontmatter.instagram}
            target="_blank"
          >
            <FontAwesomeIcon className={styles.socialIcon} icon={faInstagram} />
          </a>
          <a
            className={styles.iconWrap}
            href={data.homeData.edges[0].node.frontmatter.instagram}
            target="_blank"
          >
            <FontAwesomeIcon className={styles.socialIcon} icon={faFacebookF} />
          </a>
          <a
            className={styles.iconWrap}
            href={data.homeData.edges[0].node.frontmatter.soundcloud}
            target="_blank"
          >
            {console.log(data.homeData.edges[0].node.frontmatter)}
            <FontAwesomeIcon
              className={styles.socialIcon}
              icon={faSoundcloud}
            />
          </a>
        </div>
        <Image style={{ width: '300px'}} fluid={artsCouncilLogo} />
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
