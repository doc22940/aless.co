import * as React from 'react';
import { graphql, Link } from 'gatsby';
import { parse } from 'query-string';
import slugify from 'slugify';
import FlipMove from 'react-flip-move';
import Layout from '../components/layout';
import SEO from '../components/seo';
import { Tag, BlogLink } from '../components/styles';

export interface Edge {
  node: {
    frontmatter: {
      title: string;
      spoiler: string;
      date: string;
      keywords: string[];
    };
    fields: {
      slug: string;
    };
    id: string;
  };
}

export interface BlogIndexProps {
  data: {
    allMdx: {
      edges: Edge[];
      group: { tag: string }[];
    };
  };
}

const TagLink: React.FC<{ tag: string; tags: string[] }> = ({ tag, tags }) => {
  const slug = slugify(tag);
  const active = tags.includes(slug);
  const qs = active
    ? `${tags.length > 1 ? tags.filter(t => t !== slug).join(',') : ``}`
    : `${tags.length > 0 ? [...tags, slug].join(',') : slug}`;
  return (
    <Tag active={active} link={true}>
      <Link to={qs.length > 0 ? `/?tags=${qs}` : `/`}>{tag}</Link>
    </Tag>
  );
};

// persist the state of the search/toggle
let search = '';
let detailsToggleState: boolean | null = null;

const BlogIndex: React.FC<BlogIndexProps> = ({
  data: {
    allMdx: { edges, group },
  },
}) => {
  const keywords = group.map(item => item.tag);
  const [tags, setTags] = React.useState<string[]>([]);
  const [detailsToggle, setDetailsToggle] = React.useState<boolean | null>(
    detailsToggleState !== null ? detailsToggleState : true
  );

  React.useEffect(() => {
    detailsToggleState = detailsToggle;
  });

  if (typeof location !== 'undefined') {
    search = location.search;
  }

  React.useEffect(() => {
    if (search === '') {
      setTags([]);
    }
    const { tags: qsTags } = parse(search, { arrayFormat: 'comma' });
    if (Array.isArray(qsTags)) {
      setTags(qsTags);
    } else if (typeof qsTags === 'string') {
      setTags([qsTags]);
    }
  }, [search]);

  return (
    <Layout>
      <SEO
        title="A blog by Alessia Bellisario"
        keywords={[
          `blog`,
          `rust`,
          `gatsby`,
          `javascript`,
          `react`,
          ...keywords,
        ]}
      />
      <details
        open={!!detailsToggleState}
        style={{ margin: '2rem 0', fontSize: '0.9rem' }}
      >
        <summary onClick={() => setDetailsToggle(!detailsToggle)}>
          filter by tag
        </summary>
        <div
          style={{
            margin: '0.25rem 0',
            display: 'flex',
            flexWrap: 'wrap',
          }}
        >
          {keywords.map((t, idx) => {
            return <TagLink key={idx} tag={t} tags={tags} />;
          })}
        </div>
      </details>
      <FlipMove
        maintainContainerHeight={true}
        enterAnimation="fade"
        leaveAnimation="fade"
      >
        {edges
          .filter(({ node }) => {
            if (tags.length === 0) {
              return true;
            }
            let contains = false;
            node.frontmatter.keywords.forEach(keyword => {
              if (tags.includes(slugify(keyword))) {
                contains = true;
              }
            });
            return contains;
          })
          .map(({ node: { frontmatter, fields, id } }) => {
            const title = frontmatter.title || fields.slug;
            return (
              <div key={id} style={{ margin: '1.5rem 0' }}>
                <h3>
                  <BlogLink to={fields.slug}>{title}</BlogLink>
                </h3>
                <p style={{ marginBottom: '5px' }}>{frontmatter.spoiler}</p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    lineHeight: 'initial',
                  }}
                >
                  <small style={{ marginRight: '0.6rem', fontSize: '0.9rem' }}>
                    <i>{frontmatter.date}</i>
                  </small>
                  {frontmatter.keywords.map((keyword, i) => (
                    <Tag key={i}>{keyword}</Tag>
                  ))}
                </div>
              </div>
            );
          })}
      </FlipMove>
    </Layout>
  );
};

export default BlogIndex;

export const pageQuery = graphql`
  query {
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { draft: { ne: true } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM D, YYYY")
            spoiler
            title
            keywords
          }
          id
        }
      }
      group(field: frontmatter___keywords) {
        tag: fieldValue
      }
    }
  }
`;
