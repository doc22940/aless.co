import * as React from 'react';
import { Global, css } from '@emotion/core';
import { useStaticQuery, graphql } from 'gatsby';
import { H1, Link, LeftBar, RightBar, TopBar, BottomBar } from './styles';
import Header from './header';
import Toggle from './toggle';
import Footer from './footer';

interface LayoutData {
  site: {
    siteMetadata: {
      title: string;
      commit: string;
      repository: string;
    };
  };
}

export const ThemeContext = React.createContext('light');

const Layout: React.FC = ({ children }) => {
  const [theme, setTheme] = React.useState('null');

  if (typeof document !== `undefined`) {
    (window as any).__onThemeChange = () => setTheme((window as any).__theme);

    React.useEffect(() => {
      setTheme((window as any).__theme);
    });
  }

  const data: LayoutData = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          commit
          repository
        }
      }
    }
  `);

  return (
    <ThemeContext.Provider value={theme}>
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: '640px',
          minHeight: '100vh',
          backgroundColor: 'var(--bg)',
        }}
      >
        <Global
          styles={css`
            body {
              padding: 0 1.5rem;
              margin: 0;
              background-color: var(--bg);
            }
            body.light {
              --bg: #ffffff;
              --textShadow: 5px 5px 1px rgba(0, 0, 0, 0.08);
              --hr: hsla(0, 0%, 0%, 0.2);
              --blue: blue;
              --activeTagText: blue;
              --activeTagBg: #ff69b42e;
              --inactiveTagBg: #1aabff33;
              --codeBg: rgba(255, 229, 100, 0.2);
              --hoverBg: var(--bg);
              --headerText: black;
              --mixBlendMode: lighten;
              --mixBlendMode2: multiply;
              --titleSkewColor: #ffc461;
              --textNormal: #222;
            }

            body.dark {
              -webkit-font-smoothing: antialiased;
              --bg: #272727;
              --textShadow: 5px 5px 1px rgba(0, 0, 0, 0.15);
              --blue: #a4a4fd;
              --activeTagText: yellow;
              --activeTagBg: #141e8475;
              --inactiveTagBg: #1aabff33;
              --hr: hsla(0, 0%, 100%, 0.2);
              --codeBg: rgba(170, 170, 170, 0.2);
              --hoverBg: var(--bg);
              --headerText: #ffffff;
              --mixBlendMode: darken;
              --mixBlendMode2: screen;
              --titleSkewColor: #f8a51a2e;
              --textNormal: rgba(255, 255, 255, 0.88);
            }
            details,
            summary {
              display: revert;
              cursor: pointer;
            }
            h1,
            h2 {
              &::after {
                top: 0;
                width: 100%;
                z-index: -1;
                left: 18px;
                color: var(--titleSkewColor);
                text-shadow: none;
                font-style: italic;
                position: absolute;
                transform: skew(-2deg) translateX(-20px);
              }
            }

            hr {
              box-sizing: content-box;
              margin-left: 0;
              margin-right: 0;
              margin-top: 0;
              padding-bottom: 0;
              padding-left: 0;
              padding-right: 0;
              padding-top: 0;
              margin-bottom: calc(1.75rem - 1px);
              background: var(--hr);
              border: none;
              height: 1px;
            }
            .autolink-header {
              margin-right: 0.5rem;
              margin-left: 0;
              @media (min-width: 52em) {
                margin-left: -1.5rem;
              }
              > svg {
                fill: var(--blue);
              }
              &:hover {
                background: var(--bg);
              }
            }
            :not(pre) > code[class*='language-'],
            pre[class*='language-'] {
              margin-bottom: 1.75rem;
            }
            blockquote {
              color: #525252;
              margin-left: 0;
              font-size: 1.1rem;
              padding-left: 1rem;
              border-left: 6px solid var(--blue);
              font-style: italic;
            }
            /* Inline code */
            code {
              line-height: 1.5;
              border-radius: 0.3rem;
              background: var(--codeBg);
              color: inherit;
              font-size: inherit;
              font-weight: inherit;
              padding: 0.15em 0.2em 0.05em;
              white-space: normal;
              text-shadow: none;
            }
            /* unset yellow code highlighting in vscode block */
            .vscode-highlight > code {
              border-radius: none;
              line-height: unset;
              background: unset;
              padding: unset;
              color: unset;
              white-space: unset;
            }
            /* Gatsby Image */
            .gatsby-resp-image-image {
              position: absolute;
              top: 0;
              width: 100%;
            }

            @media (hover: hover) {
              a:hover {
                color: black;
                background-color: yellow;
                border-radius: 0.3rem;
              }

              h1 {
                a {
                  &:hover {
                    background-color: var(--hoverBg);
                    color: inherit;
                  }
                }
              }
            }
            transition: 'color 1s ease-out, background 1s ease-out';
          `}
        />
        <div style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
          <header style={{ position: 'relative' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <H1>
                <Link id="title" to={`/`}>
                  {data.site.siteMetadata.title}
                </Link>
              </H1>
              {typeof document !== `undefined` && <Header />}
              {theme !== 'null' && <Toggle />}
            </div>
            <h3>a blog by alessia bellisario</h3>
          </header>
          {children}
          <Footer
            commit={data.site.siteMetadata.commit}
            repository={data.site.siteMetadata.repository}
          />
        </div>
        <TopBar />
        <BottomBar />
        <LeftBar />
        <RightBar />
      </div>
    </ThemeContext.Provider>
  );
};

export default Layout;
