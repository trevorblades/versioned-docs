const {version} = require('../package.json');
module.exports = {
  plugins: [
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: version,
        path: 'content'
      }
    },
    {
      resolve: 'gatsby-source-git',
      options: {
        name: '1.10.x',
        remote: 'https://github.com/trevorblades/versioned-docs',
        branch: 'v1',
        patterns: 'docs/content/**'
      }
    }
  ]
};
