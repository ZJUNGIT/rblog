import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import NotFound from './components/notFound';
import AppContainer from './containers/app';
import LoginContainer from './containers/login';
import RegisterContainer from './containers/register';
import LogoutContainer from './containers/logout';
import AboutContainer from './containers/about';
import PostsContainer from './containers/posts';
import ArticleContainer from './containers/article';
import PublishArticleContainer from './containers/new';

import configureStore from './store/configureStore';

const store = configureStore();

export default (
    <Route path="/" component={AppContainer}>
        <IndexRoute component={PostsContainer} />
        <Route path=":id.html" component={ArticleContainer} />
        <Route path="login" component={LoginContainer} />
        <Route path="register" component={RegisterContainer} />
        <Route path="logout" component={LogoutContainer} />
        <Route path="about" component={AboutContainer} />
        <Route path=":cate" component={PostsContainer} />
        <Route path="post/new" component={PublishArticleContainer} />
        <Route path="tag/:tag" component={PostsContainer} />
        <Route path="*" component={NotFound} />
    </Route>
);

