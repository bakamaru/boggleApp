import * as React from 'react';
import { Suspense } from 'react';
import { Switch, Route } from "react-router";
const Layout = React.lazy(() => import('./components/layout/views/DefaultLayout'))
const Home = React.lazy(() => import('./pages/home/HomeContainer'));
const Play = React.lazy(() => import('./pages/play/playPage'));
const Result = React.lazy(() => import('./pages/result/resultPage'))
import Loader from './components/static/views/Loader';
import PageNotFound from './components/static/views/PageNotFound';
import { Provider } from 'react-redux';
import  store  from './store/mainstore';

const RouteWithLayout= (props) => {
    const { component: Component, layout: Layout, ...rest } = props;
    return <Route {...rest} render={matchProps => (
        <Layout>
            <Component {...matchProps} />
        </Layout>
    )} />
}
 export default class App extends React.Component {


    componentDidMount() {      
       
    }  
    render() {
        return (<Provider store={store} >

            <Suspense fallback={<Loader />}>
                <Switch>
                    <RouteWithLayout exact path='/' component={Home} layout={Layout} />
                    <RouteWithLayout path='/play/:slug' component={Play} layout={Layout} />  
                    <RouteWithLayout path='/result/:slug' component={Result} layout={Layout} />  
                    <RouteWithLayout path="*" component={PageNotFound} layout={Layout} />
                    <RouteWithLayout path="/page-not-found" component={PageNotFound} layout={Layout} />
                </Switch>
            </Suspense>
        </Provider>
        );
    }

}

if (module['hot']) {
    module['hot'].accept();
}
