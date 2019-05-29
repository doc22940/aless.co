const React = require('react');
const gatsbyMdx = jest.requireActual('gatsby-mdx');

module.exports = {
  ...gatsbyMdx,
  MDXRenderer: () => <div />,
};