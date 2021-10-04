const path = require('path');

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
    }
  `);

  data.allMdx.nodes.forEach(node => {
    const {gitRemote} = node.parent;
    actions.createPage({
      component: require.resolve('./src/templates/page'),
      path: path.join('/', gitRemote?.ref || '', node.slug),
      context: {
        id: node.id
      }
    });
  });
};
