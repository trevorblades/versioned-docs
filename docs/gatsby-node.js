const path = require('path');
const {makeRe} = require('micromatch');

exports.createPages = async ({actions, graphql}) => {
  const {data} = await graphql(`
    query ListPages {
      allMdx {
        nodes {
          id
          slug
          parent {
            ... on File {
              gitRemote {
                ref
              }
            }
          }
        }
      }
      allSitePlugin(filter: {name: {eq: "gatsby-source-git"}}) {
        nodes {
          pluginOptions {
            patterns
            branch
          }
        }
      }
    }
  `);

  const versionPatterns = data.allSitePlugin.nodes.reduce((acc, node) => {
    const {patterns, branch} = node.pluginOptions;
    return {
      ...acc,
      [branch]: makeRe(patterns, {capture: true})
    };
  }, {});

  data.allMdx.nodes.forEach(node => {
    const {gitRemote} = node.parent;
    actions.createPage({
      component: require.resolve('./src/templates/page'),
      path: gitRemote
        ? path.join(
            '/',
            gitRemote.ref,
            node.slug.replace(versionPatterns[gitRemote.ref], '$1')
          )
        : '/' + node.slug,
      context: {
        id: node.id
      }
    });
  });
};
