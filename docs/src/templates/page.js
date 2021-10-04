import PropTypes from 'prop-types';
import React from 'react';
import VersionDropdown from '../components/VersionDropdown';
import {MDXRenderer} from 'gatsby-plugin-mdx';
import {graphql} from 'gatsby';

export default function PageTemplate({data}) {
  const {body, frontmatter, parent} = data.mdx;
  return (
    <>
      <VersionDropdown currentRef={parent.gitRemote?.ref} />
      <h1>{frontmatter.title}</h1>
      <MDXRenderer>{body}</MDXRenderer>
    </>
  );
}

PageTemplate.propTypes = {
  data: PropTypes.object.isRequired
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
