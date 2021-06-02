import React, {useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';

const Container = styled.form`
width: 98%;
height: 100%;
margin: 0 auto;
padding: 10px;
`
const Title = styled.div`
font-size: 30px;
border-bottom: 1px solid #F7F9FC;
height: 40px;
font-style: italic;
font-weight: 700;
`
const TypeBtn = styled.button`
width: 90%;
margin: 10px auto;
padding: 10px;
border-radius: 5px;
`


function Index({}){
    const [userId, setUserId] = useState('');
    const [userPw, setUserPW] = useState('');
    const [type, setType] = useState();

    const [checkTerm, setCheckTerm] = useState(false);
    const [isCustomer, setisCustomer] = useState(false);
    const [isStore, setisStore] = useState(false);

    const setTypeStore = (e) => {
        setType("store");
        setisCustomer(false);
        setisStore(true);
    }

    return(
        <Container>
            <Title>SIGN UP</Title>

            <TypeBtn onClick={setTypeStore}>카페로 시작하기 {'>'} </TypeBtn>
            <TypeBtn>손님으로 시작하기 {'>'}</TypeBtn>
        </Container>
    );
}

export default Index;