import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './routes/Home';
import RestaurantDetail from './routes/RestaurantDetail';
import RestaurantUpdate from './routes/RestaurantUpdate';
import { RestaurantsContextProvider } from './context/RestaurantsContext'

const App = () => {
    return (
    <RestaurantsContextProvider>
        <div className="container">
            <Router>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/restaurants/:id/update' component={RestaurantUpdate}/>
                    <Route exact path='/restaurants/:id/detail' component={RestaurantDetail}/>
                </Switch>
            </Router>
        </div>
    </RestaurantsContextProvider>
    );
}

export default App;
