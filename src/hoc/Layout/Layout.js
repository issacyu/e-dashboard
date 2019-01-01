import React, { Component } from 'react';

import Navbar from '../../containers/Navigation/Navbar/Navbar';
import Overview from '../../containers/Overview/Overview';
import { Breadcrumb } from 'react-bootstrap';

class Layout extends Component {
    render() {
        return (
            <>
                <Navbar />
            </>
        )
    }
}

export default Layout;