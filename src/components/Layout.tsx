import { Outlet } from "react-router-dom";
import MainNav from './MainNav';
import './Layout.css';
import React from "react";
import Container from 'react-bootstrap/Container';
interface Props {
    routeList: Array<any>
}

const Layout: React.FC<Props> = ({routeList}) => {
    return (
       <Container fluid>
            <div className="top-bar">
                <MainNav routeList={routeList} />
            </div>
            <div className="content-wrap">
                <Outlet />
            </div>
        </Container>
    );
};
 
export default Layout;