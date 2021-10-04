import PropTypes from 'prop-types';
import React from 'react';
import {graphql, navigate, useStaticQuery} from 'gatsby';

export default function VersionDropdown({currentRef = ''}) {
  const {sitePlugin, allGitRemote} = useStaticQuery(
    graphql`
      query ListVersions {
        # get current version name from filesystem source plugin
        sitePlugin(name: {eq: "gatsby-source-filesystem"}) {
          pluginOptions {
            name
          }
        }

        # list all remotes configured by gatsby-source-git
        allGitRemote {
          nodes {
            id
            ref
            sourceInstanceName
          }
        }
      }
    `
  );

  return (
    <select
      value={currentRef}
      // client side route change when an option is selected
      onChange={event => navigate('/' + event.target.value)}
    >
      <option value="">
        {/* the current version */}
        {sitePlugin.pluginOptions.name}
      </option>
      {allGitRemote.nodes.map(node => (
        // other versions sourced via git
        <option key={node.id} value={node.ref}>
          {node.sourceInstanceName}
        </option>
      ))}
    </select>
  );
}

VersionDropdown.propTypes = {
  currentRef: PropTypes.string
};
