import React, { useCallback } from 'react'
import styled from 'styled-components'
import {Link, Redirect, useHistory} from "react-router-dom";
import axios from 'axios';
import {ReactComponent as SearchIcon} from '../../../images/search.svg'
import {ReactComponent as LogoutIcon} from '../../../images/logout.svg'
import logo from '../../../images/titleLogo.png'

const Container = styled.div`
background-color : #ff8b00;
width: 100%;
// margin-left : 200px;
height : 40px;
position : relative;
`
const HomeButton = styled.a`
margin-left: 10px;
`
const Search = styled.div `
position : absolute;
left: 150px;
top: 0px;
width: 50%;
`
const LogoutButton = styled.button`
background-color: "#ff8b00";
border: none;
position : absolute;
right : 10px;
top: 10px;
`

const Input = styled.input `
width : 100%;
height : 30px;
border-radius : 15px;
border : 0px solid #bdbdbd;
background-color : white;
color : black;
::placeholder{
    color : #bdbdbd;
    font-size : 14px;
}
position : absolute;
left : 10px;
top: 5px;
padding-left: 10px;
`


function Index() {
    const onLogout = useCallback((e)=>{
        e.preventDefault();
        axios.get('/api/auth/logout')
        .then((response)=>{
            const result = response.data.success;
            console.log(result);
            sessionStorage.removeItem("userInfo");
            alert("로그아웃 되었습니다.");
            return window.location.href = '/';
        })
        .catch((error)=>{
            console.log(error);
        })
    });
    
    return (
        <Container>
            <HomeButton href="/">
                <img style={{maxHeight: "50px"}} src={logo} alt="home"/>
            </HomeButton>
            {/* <Search>
                <Input type = "text" placeholder = "검색어를 입력해주세요" ></Input>
                <button style = {{alignItems : 'center', position : 'absolute', right : '5px', border: "none", backgroundColor: "white", top: "10px"}}>
                    <SearchIcon width="20px" fill="#6f6f6f"/>
                </button>
            </Search> */}
            <LogoutButton onClick={onLogout}>
                <LogoutIcon width="20px"/>
            </LogoutButton>
        </Container>
    )
}

export default Index