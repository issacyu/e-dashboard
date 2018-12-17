import React, { Component } from 'react';

import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import NavigationItems from '../../components/Navigation/NavigationItems/NavigationItems';

class Layout extends Component {
    render() {
        return (
            <div>
                <NavigationItems />
            </div>
        )
    }
}

export default Layout;