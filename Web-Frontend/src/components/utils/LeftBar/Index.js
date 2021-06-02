import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ReactComponent as MenuIcon} from '../../../images/menu.svg'
import logo from '../../../images/titleLogo.png'

const Container = styled.div`
width: 200px;
height: 100%;
// background-color : #ff8b00;
overflow-y: scroll;
-ms-overflow-style: none;
scrollbar-width: none;
&::-webkit-scrollbar{
    display: none;
};
position : absolute;
left : 0;
`
const Header = styled.div`
width: 100%;
height: 40px;
position: relative;
background-color : #ff8b00;
`
const MenuButton = styled.button`
position : absolute;
left: 10px;
top: 10px;
`
const HomeButton = styled.a`
position: absolute;
top: 0px;
left: 40px;
`
const Content = styled.div`
position: relative;
width: 100%;
background-color : #ff8b00;
padding: 10px;
height: 100%;
`
const Menu = styled.a`
color: white;
padding: 5px 0 5px 10px;
display: block;
font-size: 14px;
`

function Index (){
    const [isShowing, setisShowing] = useState(true);

    return(
        <Container>
            <Header>
                <MenuButton onClick={(e) => setisShowing(!isShowing)}>
                    <MenuIcon height="20px" width="20px"/>
                </MenuButton>
                <HomeButton href="/">
                    <img style={{maxHeight: "50px"}} src={logo} alt="home"/>
                </HomeButton>
            </Header>
            {isShowing && <Content>
                <Menu>카페 예약</Menu>

            </Content>}
        </Container>
    )
}

export default Index;