/* eslint-disable no-undef */
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === 'MarkdownRemark') {
    const longSlug = createFilePath({ node, getNode, basePath: 'content' });
    const slug = longSlug.split('/');
    createNodeField({
      node,
      name: 'slug',
      value: `/${slug[slug.length - 2]}/`,
    });
    createNodeField({
      node,
      name: 'parent',
      value: slug[1],
    });
    console.log(slug[1]);
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark(filter: {fields: {slug: {nin: "/home/"}}}) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve('./src/templates/project.js'),
      context: {
        slug: node.fields.slug,
      },
    });
  });
};