import React, {Component} from 'react';

import BusManagement from './Station/Station.Management';

class Home extends Component {
    render() {
        return (
            <div>
                <h3>Home</h3>
                <BusManagement/>
            </div>
        );
    }
}

export default Home;
