import React from 'react'
import Reflv from 'reflv'
import {Link, Switch, Route, StaticRouter} from 'react-router-dom'

export class MainPage extends React.Component {

    render() {

        return (
            <div>
                <h1>MainPage</h1>
            </div>
        );
    }
}

const LivePage = ({match}) => {
    return <LiveRoom roomid={match.params.liveroom}/>
}

export class LiveRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0
        };
    }

    render() {

        return (
            <div>
                <Reflv
        url={`http://127.0.0.1:8000/live/stream.flv`}
        type="flv"
        isLive
        cors
        config={{
          enableWorker: true,
          enableStashBuffer: false,
          stashInitialSize: 128,
        }}
      />
            </div>
        );
    }
}

const routes = [
    {
        path: '/',
        name: 'home',
        exact: true,
        component: MainPage
    }, {
        path: '/:liveroom',
        name: 'liveroom',
        component: LivePage
    }
]

export const Layout = () => <div>
    <nav>
        <ul>
            <li>
                <Link to="ssr/">Home</Link>
            </li>
            <li>
                <Link to="ssr/another">Another page</Link>
            </li>
        </ul>
    </nav>

    {/* New <Switch> behavior introduced in React Router v4
       https://reacttraining.com/react-router/web/api/Switch */}
    <Switch>
        {routes.map(route => <Route key={route.name} {...route}/>)}
    </Switch>
</div>;

export default class App extends React.Component {
    render() {
        const context = {};
        return (
            <div>
                <StaticRouter location={this.props.req.url} context={context}>
                    <Layout/>
                </StaticRouter>
            </div>
        );
    }
}