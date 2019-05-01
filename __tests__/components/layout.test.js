import React from 'react';
import { render } from 'react-testing-library';
import { StaticQuery } from 'gatsby';
import Layout from '../../src/components/layout';

jest.mock('gl-react-dom');
beforeEach(() => {
  StaticQuery.mockImplementationOnce(({ render }) =>
    render({
      site: {
        siteMetadata: {
          title: `anti/pattern`,
        },
      },
    })
  );
});

describe('Layout', () => {
  test('renders', () => {
    const { getByText } = render(
      <Layout>
        <h1>test content</h1>
      </Layout>
    );
    const header = getByText('a blog by alessia bellisario');
    expect(header).toHaveStyle(`
      margin-top: 0px;
      margin-bottom: 3rem;
    `);
  });
});