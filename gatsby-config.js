/* eslint-disable no-useless-escape */
// eslint-disable-next-line no-undef
module.exports = {
  siteMetadata: {
    title: 'Niall Fallon',
    description: 'Theatre Maker | Performer',
    author: '@matteocarpi',
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 1024,
              linkImagesToOriginal: true,
              plugins: [
                'gatsby-remark-images-anywhere',
              ],
            },
          },
          '@forestryio/gatsby-remark-normalize-paths',
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-google-fonts',
      options: {
        fonts: [
          'Josefin Sans\:200,400,700',
          'Josefin Slab\:400,600,700',
        ],
        display: 'swap',
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        // eslint-disable-next-line no-undef
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'uploads',
        // eslint-disable-next-line no-undef
        path: `${__dirname}/uploads`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        // eslint-disable-next-line no-undef
        path: `${__dirname}/content`,
      },
    },
    // {
    //   resolve: 'gatsby-source-filesystem',
    //   options: {
    //     name: 'posts',
    //     // eslint-disable-next-line no-undef
    //     path: `${__dirname}/content/posts`,
    //   },
    // },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'tameto-gatsby',
        short_name: 'tameto',
        start_url: '/',
        background_color: '#F6D98E',
        theme_color: '#3B4566',
        display: 'minimal-ui',
        icon: 'src/images/icon.png', // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
