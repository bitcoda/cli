import React from 'react'
import PropTypes from 'prop-types'
import {
  Link as RouterLink,
  NavLink as RouterNavLink
} from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import {
  Provider as RebassProvider,
  Flex,
  Box,
  Fixed,
  Container,
  Text,
  Close,
  Toolbar,
  Divider,
  Heading,
  NavLink,
  BlockLink,
  Button,
  ButtonTransparent,
} from 'rebass'
import { InstantSearch, Hits, SearchBox, createConnector, Configure, Highlight } from 'react-instantsearch-dom'
import { borderColor, themeGet } from 'styled-system'

injectGlobal`
  .ais-InstantSearch__root {
    width: 100%;
  }
`;

const breakpoint = `@media screen and (min-width: 48em)`
const repoUrl = 'https://github.com/netlify/cli'

export const Root = styled.div`
  min-height: 100vh;
  display: flex;
  .ais-InstantSearch__root {
    width: 100%;
  }
`;

export const Sidebar = styled('div')([], {
  width: '256px',
  height: '100vh',
  flex: 'none',
  overflowY: 'auto',
  WebkitOverflowScrolling: 'touch',
  transition: 'transform .2s ease-out',
  backgroundColor: '#fff',
  borderRight: '1px solid',
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
}, props => ({
  transform: props.open ? 'translateX(0)' : 'translateX(-100%)',
  [breakpoint]: {
    transform: 'none'
  }
}), borderColor)
Sidebar.defaultProps = {
  borderColor: 'gray'
}

export const Overlay = styled('div')([], {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
})

export const MobileOnly = styled.div([], {
  [breakpoint]: {
    display: 'none'
  },
})

export const MenuIcon = ({ size = 24, ...props }) => {
  return (
    <svg
      {...props}
      viewBox='0 0 24 24'
      width={size}
      height={size}
      fill='currentcolor'
    >
      <path d='M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' />
    </svg>
  )
}


const LogoContainer = styled.span`
  svg {
    width: 85px;
    height: 30px;
  }
  display: flex;
  align-items: center;
  color: rgb(14, 30, 37);
  .logo-word {
    margin-left: 5px;
    font-size: 19px;
    font-weight: 400;
  }
`;

const NetlifyLogo = () => {
  return (
    <LogoContainer>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 40">
          <radialGradient id="a" cy="0%" r="100.11%" gradientTransform="matrix(0 .9989 -1.152 0 .5 -.5)">
              <stop offset="0" stopColor="#20c6b7"/>
              <stop offset="1" stopColor="#4d9abf"/>
          </radialGradient>
          <g fill="none" fillRule="evenodd">
              <path fill="#0e1e25" d="m53.37 12.978.123 2.198c1.403-1.7 3.245-2.55 5.525-2.55 3.951 0 5.962 2.268 6.032 6.804v12.568h-4.26v-12.322c0-1.207-.26-2.1-.78-2.681-.52-.58-1.371-.87-2.552-.87-1.719 0-3 .78-3.84 2.338v13.535h-4.262v-19.02h4.016zm24.378 19.372c-2.7 0-4.89-.852-6.567-2.557-1.678-1.705-2.517-3.976-2.517-6.812v-.527c0-1.898.365-3.595 1.096-5.089.73-1.494 1.757-2.657 3.078-3.49 1.321-.831 2.794-1.247 4.42-1.247 2.583 0 4.58.826 5.988 2.478 1.41 1.653 2.114 3.99 2.114 7.014v1.723h-12.4c.13 1.57.652 2.812 1.57 3.726s2.073 1.371 3.464 1.371c1.952 0 3.542-.79 4.77-2.373l2.297 2.198c-.76 1.136-1.774 2.018-3.042 2.645-1.269.627-2.692.94-4.27.94zm-.508-16.294c-1.17 0-2.113.41-2.832 1.23-.72.82-1.178 1.963-1.377 3.428h8.12v-.317c-.094-1.43-.474-2.51-1.14-3.243-.667-.732-1.59-1.098-2.771-1.098zm16.765-7.7v4.623h3.35v3.164h-3.35v10.617c0 .726.144 1.25.43 1.573.286.322.798.483 1.535.483a6.55 6.55 0 0 0 1.49-.176v3.305c-.97.27-1.905.404-2.806.404-3.273 0-4.91-1.81-4.91-5.431v-10.776h-3.124v-3.164h3.122v-4.623h4.261zm11.137 23.643h-4.262v-27h4.262zm9.172 0h-4.262v-19.02h4.262zm-4.525-23.96c0-.655.207-1.2.622-1.634.416-.433 1.009-.65 1.78-.65.772 0 1.368.217 1.79.65.42.434.63.979.63 1.635 0 .644-.21 1.18-.63 1.608-.422.428-1.018.642-1.79.642-.771 0-1.364-.214-1.78-.642-.415-.427-.622-.964-.622-1.608zm10.663 23.96v-15.857h-2.894v-3.164h2.894v-1.74c0-2.11.584-3.738 1.753-4.887 1.17-1.148 2.806-1.722 4.91-1.722.749 0 1.544.105 2.386.316l-.105 3.34a8.375 8.375 0 0 0 -1.631-.14c-2.035 0-3.052 1.048-3.052 3.146v1.687h3.858v3.164h-3.858v15.856h-4.261zm17.87-6.117 3.858-12.903h4.542l-7.54 21.903c-1.158 3.199-3.122 4.799-5.893 4.799-.62 0-1.304-.106-2.052-.317v-3.305l.807.053c1.075 0 1.885-.196 2.429-.589.543-.392.973-1.051 1.289-1.977l.613-1.635-6.664-18.932h4.595z"/>
              <path fill="url(#a)" fillRule="nonzero" d="m28.589 14.135-.014-.006c-.008-.003-.016-.006-.023-.013a.11.11 0 0 1 -.028-.093l.773-4.726 3.625 3.626-3.77 1.604a.083.083 0 0 1 -.033.006h-.015c-.005-.003-.01-.007-.02-.017a1.716 1.716 0 0 0 -.495-.381zm5.258-.288 3.876 3.876c.805.806 1.208 1.208 1.355 1.674.022.069.04.138.054.209l-9.263-3.923a.728.728 0 0 0 -.015-.006c-.037-.015-.08-.032-.08-.07s.044-.056.081-.071l.012-.005zm5.127 7.003c-.2.376-.59.766-1.25 1.427l-4.37 4.369-5.652-1.177-.03-.006c-.05-.008-.103-.017-.103-.062a1.706 1.706 0 0 0 -.655-1.193c-.023-.023-.017-.059-.01-.092 0-.005 0-.01.002-.014l1.063-6.526.004-.022c.006-.05.015-.108.06-.108a1.73 1.73 0 0 0 1.16-.665c.009-.01.015-.021.027-.027.032-.015.07 0 .103.014l9.65 4.082zm-6.625 6.801-7.186 7.186 1.23-7.56.002-.01c.001-.01.003-.02.006-.029.01-.024.036-.034.061-.044l.012-.005a1.85 1.85 0 0 0 .695-.517c.024-.028.053-.055.09-.06a.09.09 0 0 1 .029 0l5.06 1.04zm-8.707 8.707-.81.81-8.955-12.942a.424.424 0 0 0 -.01-.014c-.014-.019-.029-.038-.026-.06 0-.016.011-.03.022-.042l.01-.013c.027-.04.05-.08.075-.123l.02-.035.003-.003c.014-.024.027-.047.051-.06.021-.01.05-.006.073-.001l9.921 2.046a.164.164 0 0 1 .076.033c.013.013.016.027.019.043a1.757 1.757 0 0 0 1.028 1.175c.028.014.016.045.003.078a.238.238 0 0 0 -.015.045c-.125.76-1.197 7.298-1.485 9.063zm-1.692 1.691c-.597.591-.949.904-1.347 1.03a2 2 0 0 1 -1.206 0c-.466-.148-.869-.55-1.674-1.356l-8.993-8.993 2.349-3.643c.011-.018.022-.034.04-.047.025-.018.061-.01.091 0a2.434 2.434 0 0 0 1.638-.083c.027-.01.054-.017.075.002a.19.19 0 0 1 .028.032l8.999 13.059zm-14.087-10.186-2.063-2.063 4.074-1.738a.084.084 0 0 1 .033-.007c.034 0 .054.034.072.065a2.91 2.91 0 0 0 .13.184l.013.016c.012.017.004.034-.008.05l-2.25 3.493zm-2.976-2.976-2.61-2.61c-.444-.444-.766-.766-.99-1.043l7.936 1.646a.84.84 0 0 0 .03.005c.049.008.103.017.103.063 0 .05-.059.073-.109.092l-.023.01zm-4.056-4.995a2 2 0 0 1 .09-.495c.148-.466.55-.868 1.356-1.674l3.34-3.34a2175.525 2175.525 0 0 0 4.626 6.687c.027.036.057.076.026.106-.146.161-.292.337-.395.528a.16.16 0 0 1 -.05.062c-.013.008-.027.005-.042.002h-.002l-8.949-1.877zm5.68-6.403 4.489-4.491c.423.185 1.96.834 3.333 1.414 1.04.44 1.988.84 2.286.97.03.012.057.024.07.054.008.018.004.041 0 .06a2.003 2.003 0 0 0 .523 1.828c.03.03 0 .073-.026.11l-.014.021-4.56 7.063c-.012.02-.023.037-.043.05-.024.015-.058.008-.086.001a2.274 2.274 0 0 0 -.543-.074c-.164 0-.342.03-.522.063h-.001c-.02.003-.038.007-.054-.005a.21.21 0 0 1 -.045-.051l-4.808-7.013zm5.398-5.398 5.814-5.814c.805-.805 1.208-1.208 1.674-1.355a2 2 0 0 1 1.206 0c.466.147.869.55 1.674 1.355l1.26 1.26-4.135 6.404a.155.155 0 0 1 -.041.048c-.025.017-.06.01-.09 0a2.097 2.097 0 0 0 -1.92.37c-.027.028-.067.012-.101-.003-.54-.235-4.74-2.01-5.341-2.265zm12.506-3.676 3.818 3.818-.92 5.698v.015a.135.135 0 0 1 -.008.038c-.01.02-.03.024-.05.03a1.83 1.83 0 0 0 -.548.273.154.154 0 0 0 -.02.017c-.011.012-.022.023-.04.025a.114.114 0 0 1 -.043-.007l-5.818-2.472-.011-.005c-.037-.015-.081-.033-.081-.071a2.198 2.198 0 0 0 -.31-.915c-.028-.046-.059-.094-.035-.141zm-3.932 8.606 5.454 2.31c.03.014.063.027.076.058a.106.106 0 0 1 0 .057c-.016.08-.03.171-.03.263v.153c0 .038-.039.054-.075.069l-.011.004c-.864.369-12.13 5.173-12.147 5.173s-.035 0-.052-.017c-.03-.03 0-.072.027-.11a.76.76 0 0 0 .014-.02l4.482-6.94.008-.012c.026-.042.056-.089.104-.089l.045.007c.102.014.192.027.283.027.68 0 1.31-.331 1.69-.897a.16.16 0 0 1 .034-.04c.027-.02.067-.01.098.004zm-6.246 9.185 12.28-5.237s.018 0 .035.017c.067.067.124.112.179.154l.027.017c.025.014.05.03.052.056 0 .01 0 .016-.002.025l-1.052 6.462-.004.026c-.007.05-.014.107-.061.107a1.729 1.729 0 0 0 -1.373.847l-.005.008c-.014.023-.027.045-.05.057-.021.01-.048.006-.07.001l-9.793-2.02c-.01-.002-.152-.519-.163-.52z" transform="translate(-.702)"/>
          </g>
      </svg>
      <div className='logo-word'>CLI</div>
    </LogoContainer>
  )
}

const GithubIcon = () => {
  return (
    <svg aria-labelledby="simpleicons-github-icon" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

export const Main = props =>
  <Box
    {...props}
    is='main'
    flex='1 1 auto'
    w={1}
    pl={[ null, null, 256 ]}
  />

export const MaxWidth = props =>
  <Container
    {...props}
    maxWidth={768}
    px={4}
    pt={4}
    pb={6}
  />

export const Content = styled(Box)([], {
  minHeight: 'calc(100vh - 208px)'
})

export const UL = styled('ul')([], {
  listStyle: 'none',
  margin: 0,
  paddingLeft: 0,
  paddingBottom: '48px',
})

export const LI = styled('li')([], {
})

const depthPad = ({ to = '' }) =>
  (1 + to.split('/')
    .filter(s => s.length)
    .slice(1).length) * 16

const Link = styled(props => (
  <NavLink
    {...props}
    is={RouterNavLink}
    w={1}
    pl={(depthPad(props) - 4) + 'px'}
  />
))([], props => ({
  borderLeft: '4px solid',
  borderColor: 'transparent',
  '&.active, &:focus': {
    color: '#00c2b2', //'#00ad9f', // themeGet('colors.blue', '#07c')(props),
    outline: 'none',
  },
  '&:focus': {
    borderColor: 'inherit',
  }
}))

Link.defaultProps = {
  to: ''
}

const unhyphenate = str => str.replace(/(\w)(-)(\w)/g, '$1 $3')
const upperFirst = str => str.charAt(0).toUpperCase() + str.slice(1)
const format = (str, data) => {
  if (data && data.path && data.path.match((/commands/)) && str !== 'commands') {
    return <span>{str}</span>
  }
  return upperFirst(unhyphenate(str))
}

const NavBar = ({
  title,
  logo,
  focus,
  update,
}) =>
  <Toolbar
    color='inherit'
    bg='transparent'>
    {logo}
    <Heading
      px={2}
      fontSize={1}
    >
      <a href="/" style={{textDecoration: 'none'}}>
        <NetlifyLogo />
      </a>
    </Heading>
    <Box mx='auto' />
  </Toolbar>


const EditLink = styled.div`
  a {
    display: flex;
    align-items: center;
  }
  svg {
    width: 18px;
    height: 18px;
    margin-left: 5px;
    margin-bottom: 1px;
    fill: #686868;
  }
  position: absolute;
  right: 25px;
  top: 25px;
  @media (max-width: 768px) {
    right: 25px;
    top: 70px;
  }
`;


const SearchBoxWrapper = styled.div`
  padding-left: 10px;
  margin-top: 15px;
  margin-bottom: 15px;
  .ais-SearchBox-form {
    input {
      padding: 7px 8px;
      width: 80%;
      border: 1px solid black;
      -webkit-appearance: initial;
    }
    button {
      display: none;
    }
  }
  @media (max-width: 815px) {
    display: none;
  }
`;

const HitBoxWrapper = styled.div`
  position: fixed;
  top:100px;
  left:5px;
  background: white;
  box-shadow: 0 6px 34px rgba(83,40,255,.15);
  .ais-Highlight-highlighted {
    background: yellow;
  }
  a {
    text-decoration: none;
    color: #333;
  }
  @media (max-width: 815px) {
    width: 100%;
  }
`;

const SearchWrapper = styled.div`
  .ais-Highlight-highlighted {
    background: blue;
  }
`;


const Result = (props) => {
  console.log(props)
  return <div>{props.hit.firstname}</div>
}

const HitsOverlay = styled.div`
  padding: 20px;
  background-color: #fff;
`;

const MyHits = createConnector({
  displayName: "ConditionalQuery",
  getProvidedProps(props, searchState, searchResults) {
    const { query, hits } = searchResults.results ? searchResults.results : {};
    return { query, hits };
  }
})(({ query, hits }) => {

  if (hits && query) {
    return hits.map((hit, i) => {
      const slug = hit.name.replace(/:/g, '')
      return (
        <HitsOverlay key={i}>
          <a href={`/commands/${slug}`}>
            <span style={{minWidth: 110, display: 'inline-block', fontWeight: 'bold'}}>
              <Highlight attribute="name" hit={hit} />
            </span>
            <Highlight attribute="description" hit={hit} />
          </a>
        </HitsOverlay>
      )
    })
  }

  return null;
});



export const Nav = ({
  routes = [],
  searchRender,
  ...props
}) =>
  <React.Fragment>
    <NavBar {...props} />

    <Divider my={0} />

    {searchRender}

    <UL>
      {routes.map(route => {
        // Hide items from nav if frontMatter hidden: true
        if (route.module && route.module.frontMatter && route.module.frontMatter.hidden) {
          return null
        }
        return (<LI key={route.key}>
            {/^https?:\/\//.test(route.path) ? (
              <NavLink pl={3} href={route.path}>
                {route.name}
              </NavLink>
            ) : (
              <Link to={route.path} exact>
                {format(route.name, route)}
              </Link>
            )}
          </LI>
        )}
      )}
    </UL>
  </React.Fragment>

export const Pagination = ({ previous, next }) =>
  <Flex py={4} flexWrap='wrap'>
    {previous && (
      <BlockLink
        py={2}
        is={RouterLink}
        to={previous.path}>
        <Text mb={1}>Previous:</Text>
        <Text
          fontSize={3}
          fontWeight='bold'>
          {format(previous.name)}
        </Text>
      </BlockLink>
    )}
    <Box mx='auto' />
    {next && (
      <BlockLink
        py={2}
        is={RouterLink}
        to={next.path}>
        <Text mb={1}>Next:</Text>
        <Text
          fontSize={3}
          fontWeight='bold'>
          {format(next.name)}
        </Text>
      </BlockLink>
    )}
  </Flex>

const MobileNav = ({
  title,
  logo,
  update
}) =>
  <MobileOnly>
    <Toolbar px={0} color='inherit' bg='transparent'>
      <ButtonTransparent
        px={2}
        borderRadius={0}
        m={0}
        mr='auto'
        title='Toggle Menu'
        onClick={e => update(toggle('menu'))}
      >
        {logo || <MenuIcon />}
      </ButtonTransparent>
      <Heading fontSize={1}>
        {title}
      </Heading>
      <Box width={48} ml='auto' />
    </Toolbar>
    <Divider my={0} />
  </MobileOnly>

const toggle = key => state => ({ [key]: !state[key] })
const close = state => ({ menu: false })


export default class Layout extends React.Component {
  static propTypes = {
    routes: PropTypes.array.isRequired
  }

  state = {
    menu: false,
    update: fn => this.setState(fn)
  }

  render () {
    const {
      routes = [],
      children,
      route,
      title = 'Netlify CLI',
      logo,
    } = this.props

    const { menu, update } = this.state

    const opts = route ? route.props : {}

    if (opts.layout === false) {
      return children
    }

    const Wrapper = opts.fullWidth ? React.Fragment : MaxWidth

    const index = routes.findIndex(r => r.path === route.path)
    const pagination = {
      previous: routes[index - 1],
      next: routes[index + 1]
    }

    // Set page title
    let pageTitle = '404 not found'
    if (route.module) {
      const frontMatter = route.module.frontMatter
      if (frontMatter.title) {
        pageTitle = frontMatter.title
      } else {
        pageTitle = this.props.route.name
      }
    }

    return (
      <React.Fragment>

        <Helmet>
          <meta charSet="utf-8" />
          <title>{pageTitle}</title>
        </Helmet>

        <MobileNav
          title={title}
          logo={logo}
          update={update}
        />

        <Root>
          {menu && <Overlay onClick={e => update(close)} />}
          <InstantSearch
            appId={'LBLPR1R7ZZ'}
            apiKey={'b9f2cb3217cdb169590b6736454cbed2'}
            indexName={'cli-docs'}>
            <Configure />
            <Sidebar
              open={menu}
              onClick={e => update(close)}>
              <Nav
                title={title}
                logo={logo}
                routes={routes}
                update={update}
                searchRender={(
                  <SearchBoxWrapper>
                    <SearchBox translations={{ placeholder: 'Search cli docs' }} />
                  </SearchBoxWrapper>
                )}
              />
            </Sidebar>
            <Main tabIndex={menu ? -1 : undefined}>
              <HitBoxWrapper>
                 <MyHits />
              </HitBoxWrapper>
              <EditLink>
                <a
                  style={{
                    color: '#333',
                    textDecoration: 'none',
                    fontSize: '12px'
                  }}
                  href={`${repoUrl}/edit/master/docs/${this.props.route.key}`}
                >
                  Edit this doc <GithubIcon/>
                </a>
              </EditLink>
              <Wrapper>
                <Content>
                  {children}
                </Content>
                {!opts.hidePagination && <Pagination {...pagination} />}
              </Wrapper>
            </Main>
          </InstantSearch>
        </Root>
      </React.Fragment>
    )
  }
}
