import React from 'react';
import {withRouter} from 'react-router-dom';

import SideNav, {NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const onSelectHandler = (props, selected) =>  {
    const to = '/' + selected;
    if (props.location.pathname !== to) {
        props.history.push(to);
    }
};

const sideNav = (props) => {
    return(
        <SideNav
            expanded={true}
            onSelect = { (selected) => onSelectHandler(props, selected) }
            style={{backgroundColor: 'black'}}
        >
            {/* <SideNav.Toggle /> */}
            <SideNav.Nav defaultSelected="Sale">
                <NavItem eventKey="Sale">
                    <NavIcon>
                        <i className="fa fa-fw fa-home" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Sale
                    </NavText>
                </NavItem>
                <NavItem eventKey="Inventory">
                    <NavIcon>
                        <i className="fa fa-fw fa-device" style={{ fontSize: '1.75em' }} />
                    </NavIcon>
                    <NavText>
                        Inventory
                    </NavText>
                </NavItem>
            </SideNav.Nav>
        </SideNav>
    )
}

export default withRouter(sideNav);