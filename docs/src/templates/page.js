import PropTypes from 'prop-types';
import React from 'react';
import RelativeLink, {PathContext} from '../components/RelativeLink';
import VersionDropdown from '../components/VersionDropdown';
import {Helmet} from 'react-helmet';
import {MDXProvider} from '@mdx-js/react';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import {graphql} from 'gatsby';

export default function PageTemplate({data, path}) {
  const {body, frontmatter, parent} = data.mdx;
  return (
    <>
      <Helmet title={frontmatter.title} />
      <VersionDropdown currentRef={parent.gitRemote?.ref} />
      <h1>{frontmatter.title}</h1>
      <PathContext.Provider value={path}>
        <MDXProvider
          components={{
            a: RelativeLink
          }}
        >
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </PathContext.Provider>
    </>
  );
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

export const pageQuery = graphql`
  query GetPage($id: String!) {
    mdx(id: {eq: $id}) {
      body
      frontmatter {
        title
      }
      parent {
        ... on File {
          gitRemote {
            ref
          }
        }
      }
    }
  }
`;
