import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/home';
import BucketList from './pages/bucketlist';
import Research from './pages/research';
import Recommendations from './pages/recommendations';
// import Projects from './pages/projects';
// import Resources from './pages/resources';

class Body extends React.Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/research" component={Research} />
                <Route path="/recommendations" component={Recommendations} />
                {/* <Route path="/projects" component={Projects} /> */}
                <Route path="/bucketlist" component={BucketList} />
                {/* <Route path="/resources" component={Resources} /> */}
                <Route path='/blog' component={() => {
                    window.location.href = 'https://vivek-kaushal.medium.com';
                    return null;
                }} />
                <Route path='/projects' component={() => {
                    window.location.href = 'https://www.notion.so/Projects-861c71d3a36044758f09c45b3e66b43a';
                    return null;
                }} />
                <Route path='/resume' component={() => {
                    window.location.href = 'https://drive.google.com/file/d/1EaVMzJaFfYYfT9krtfWtHEJCM99NSS53/view?usp=sharing';
                    return null;
                }} />
                <Route path='/meet' component={() => {
                    window.location.href = 'https://calendly.com/kaushalvivek';
                    return null;
                }} />
            </Switch>
        );
    }
}

export default Body;