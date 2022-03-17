import Logo from '../IMG/logo.png';
import '../App.css';
import React from 'react';
import { BsFillPeopleFill } from "react-icons/bs";
import { Container, Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function Header() {
    const userData = useSelector(state => state.user.user.data);
    return (
        <div className="Header">      
            <header className="HeaderHeader">
                <Container>
                    <Row>
                        <Col sm={3}>
                            <img src={Logo} className="AppLogo" alt="logo" />
                        </Col>
                        <Col sm={2}> </Col>
                        <Col sm={3}>
                            <br />
                            <p className="text-center Text2"> บริษัท คราทอส แทรคกิ้ง จำกัด <br /> KRATOS TRACKING CO.,LTD.</p>
                        </Col>
                        <Col sm={4}>
                            <div className="col float-end">
                                <br />
                                <BsFillPeopleFill size="2em" className="col float-end" /> <br />
                                
                                <p className="logutBtn"> {userData ? userData.fullName : 'Anonymous'}</p>
                            </div>            
                        </Col>
                    </Row>
                    <Row>                        
                        <Col sm={10}><p className="text-center" className="Text">968 อาคารอื้อจือเหลียง ชั้น 5 ถ.พระราม 4 แขวงสีลม เขตบางรัก กรุงเทพฯ 10500 โทร. 02-095-3666
                            แฟกซ์. 02-095-3667</p></Col>
                    </Row>
                    <hr />
                </Container>             
            </header>
            
        </div>
    );
}

export default Header;