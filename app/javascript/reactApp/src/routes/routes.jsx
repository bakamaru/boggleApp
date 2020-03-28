import * as React from 'react';
import { Route } from 'react-router-dom';
const Layout = React.lazy(() => import('./../../components/layout/views/DefaultLayout'))
const Home = React.lazy(() => import('./page/home/HomeContainer'))
//const Detail = React.lazy(() => import('./../detail/CourseDetailContainer'))
import PageNotFound from '../../components/static/views/PageNotFound';
const RouteWithLayout= (props) => {
    const { component: Component, layout: Layout, ...rest } = props;
    return <Route {...rest} render={matchProps => (
        <Layout>
            <Component {...matchProps} />
        </Layout>
    )} />
}
export const routes = <Layout>
    <RouteWithLayout exact path='/' component={Home} layout={Layout} />
    {/* <RouteWithLayout path='/course/:slug' component={Detail} layout={Layout} /> /> */}
    <RouteWithLayout path="*" component={PageNotFound} layout={Layout} />
    <RouteWithLayout path="/page-not-found" component={PageNotFound} layout={Layout} />

</Layout>;

