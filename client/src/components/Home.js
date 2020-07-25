import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Link, useRouteMatch, useParams } from 'react-router-dom';

import Sample1 from './Sample1';
import Login from './Login';
import {connect} from 'react-redux'
import Sample2 from './Sample2';
import { getAccessToken } from '../reduxfiles/user/userActions';
import queryString from 'query-string'
import AppNavBar from './AppNavBar';



class Home extends Component{

  constructor(props) {
    super(props)
    this.state = {
      token: '',
      isLoggedIn: false,
    }

  }

  componentDidMount(props) {
    let parsed = queryString.parse(window.location.search)
    let access_token = parsed.access_token

      if(access_token)
      this.setState({
          token: access_token,
          isLoggedIn: true
      })
  }

  sendData = (data) => {
      this.props.settoken(data)
  }
  
  render() {
    return (
      <div>
        {
            this.sendData(this.state.token)
        }
        { 
          !this.state.isLoggedIn ?
          <Login /> : null
        }
        {
          this.state.isLoggedIn ?
            <AppNavBar />
    //     <Router>
    //         <div>
    //     <nav>
    //       <ul>
    //         <li>
    //           <Link to="/">Home</Link>
    //         </li>
    //         <li>
    //           <Link to="/about">About</Link>
    //         </li>
    //         <li>
    //           <Link to="/users">Users</Link>
    //         </li>
    //         <li>
    //             <Link to="/topics">Topics</Link>
    //         </li>
    //       </ul>
    //     </nav>

    //     {/* A <Switch> looks through its children <Route>s and
    //         renders the first one that matches the current URL. */}
    //     <Switch>
    //       <Route path="/about">
    //         <About />
    //       </Route>
    //       <Route path="/users">
    //         <Users />
    //       </Route>
    //       <Route path="/topics">
    //         <Topics />
    //       </Route>
    //       <Route path="/">
    //         <Home2 />
    //       </Route>
          
    //     </Switch>
    //   </div>
    //     </Router>
          : null
        }
      </div>
    );
  }
}

const mapStatetoProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    token: state.user.userAccessToken
  }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        settoken: (token) => dispatch(getAccessToken(token)) 
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Home);


// function Home2() {
//     return <h2>Home</h2>;
//   }
  
//   function About() {
//     return <h2>About</h2>;
//   }
  
//   function Users() {
//     return <h2>Users</h2>;
//   }

//   function Topics() {
  
//     let match = useRouteMatch();
  
//     return (
//       <div>
//         <h2>Topics</h2>
  
//         <ul>
//           <li>
//             <Link to={`${match.url}/components`}>Components</Link>
//           </li>
//           <li>
//             <Link to={`${match.url}/props-v-state`}>
//               Props v. State
//             </Link>
//           </li>
//         </ul>
  
//         {/* The Topics page has its own <Switch> with more routes
//             that build on the /topics URL path. You can think of the
//             2nd <Route> here as an "index" page for all topics, or
//             the page that is shown when no topic is selected */}
//         <Switch>
//           <Route path={`${match.path}/:topicId`}>
//             <Topic />
//           </Route>
//           <Route path={match.path}>
//             <h3>Please select a topic.</h3>
//           </Route>
//         </Switch>
//       </div>
//     );
//   }

//   function Topic() {
//     let { topicId } = useParams();
//     return <h3>Requested topic ID: {topicId}</h3>;
//   }

  