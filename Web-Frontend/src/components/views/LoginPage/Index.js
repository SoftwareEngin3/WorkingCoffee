import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import logo_text from '../../../images/titleBlack.png'
import logo_mark from '../../../images/logoCoffee.png'

const Container = styled.div`
width: 100%;
height: 100%;
// background-color : #ff8b00;
text-align: center;
`
const Box = styled.div`
margin: 0 auto;
width: 300px;
background-color : #ff8b00;
text-align: center;
border-radius: 10px;
padding: 10px;
`
const Button = styled.button`
width: 100%;
height: 30px;
background-color: #ffd098;
border-radius: 5px;
margin: 5px auto;
color: black;
font-weight: 700;
&:hover{
    background-color: #6f6f6f;
}
`
const LoginInput = styled.input`
background-color: white;
width: 100%;
height: 30px;
border-radius: 5px;
margin: 5px auto;
border: none;
`


function Index (){
    const [id, setId] =  useState('');
    const [pw, setPw] = useState('');
    const [isError, setisError] = useState(false);

    const onChangeId = (e) => {
        const target = e.target.value;
        setId(target);
    }

    const onChangePW = (e) => {
        const target = e.target.value;
        setPw(target);
    }
    
    const goSignUp = (e) => {
        return window.location.href= "/signup"
    }

    const login = (e) => {
        axios.post('',{
            id: id,
            pw: pw
        })
        .then((response) => {
            return window.location.href="/main"
        })
        .catch((error) => {
            console.log(error);
            setisError(true);
        })
    }

    return(
        <Container>
            <img style={{maxHeight: "75px", margin: "10% auto", marginBottom: "0", display: "block"}} src={logo_mark} alt="logo_mark"/>
            <img style={{maxWidth: "300px", margin: "5px auto", display: "block"}} src={logo_text} alt="logo_text"/>
            <Box>
                <LoginInput type="text" placeholder="아이디" onChange={onChangeId}/>
                <LoginInput type="password" placeholder="비밀번호" onChange={onChangePW}/>
                {isError && <div style={{color : 'red'}}>아이디와 비밀번호를 다시 확인하십시오.</div>}
                <Button style={{marginTop: "15px"}} onClick={login}>로그인</Button>
                <Button onClick={goSignUp}>회원가입</Button>
            </Box>
        </Container>
    )
}

export default Index;