// Run this example by adding <%= javascript_pack_tag 'boggleApp' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from 'react'
import ReactDOM from 'react-dom'
import App from "../reactApp/src/app";
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
    <App/></Router>,
    document.getElementById('boogleApp'),
  )
})
