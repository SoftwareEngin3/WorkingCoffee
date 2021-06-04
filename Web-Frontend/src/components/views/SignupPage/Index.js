import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
// import { authService, firebaseInstance } from "fbase";
import styled from 'styled-components';
import {Checkbox} from 'antd';
import { useHistory } from "react-router-dom";
import MapContainer from '../../utils/Map/MapContainer'

const Container = styled.div`
width: 500px;
// height: 600px;
margin: 50px auto;
border-radius: 10px;
padding: 10px;
background-color: #ffd098;
`
const Title = styled.div`
font-size: 30px;
border-bottom: 1px solid #F7F9FC;
height: 40px;
// font-style: italic;
font-weight: 700;
`
const SignupInput = styled.input`
width: 100%;
height: 30px;
display: block;
border: none;
padding: 5px;
border-radius: 5px;
margin: 5px auto;
`

const SignupBox = styled.form`
padding: 10px;
`

const Box = styled.div`
width: 100%;
`

const TypeBtn = styled.div`
width: 100%;
height: 50px;
margin: 10px auto;
padding: 10px;
border-radius: 5px;
background-color: #ff8b00;
position : relative;
// box-shadow: 3px 5px 5px 3px #f5f5f5;
`
const SearchBtn = styled.button`
width: 10%;
height: 30px;
position : absolute;
top: 27.4px;
// bottom: 5px
right: 0px;
border-radius: 5px;
background-color: #ff8b00;
color: white;
`
const SubmitBtn = styled.button`
width: 100%;
height: 50px;
margin: 10px auto;
padding: 10px;
border-radius: 5px;
background-color: #ff8b00;
position : relative;
font-size: 24px;
font-weight: 700;
// box-shadow: 3px 5px 5px 3px #f5f5f5;
&:hover{
    background-color: white;
}
`

function Index(){
    const [userEmail, setUserEmail] = useState('');
    const [userPw, setUserPW] = useState('');
    const [pwError, setPWError] = useState(false);
    
    const [type, setType] = useState();
    const [isCustomer, setisCustomer] = useState(false);
    const [isStore, setisStore] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({name: ""})
    const [storeInfo, setStoreInfo] = useState({
        cafeName: "",
        phone: "",
        location: "",
        info: ""
    })

    const [term,setTerm] = useState(false);
	const [termError,setTermError] = useState(false);
    const [searchInput, setSearchInput] = useState("")

    const history = useHistory();
    
	const onChangeTerm = useCallback((e) => {
		if(!term){
		setTermError(false);
        setTerm(true);
		}else{
			setTerm(false);
            setTermError(true);
		}
	},[term]);

    const onChangeEmail = useCallback((e) => {
        console.log(e.target.value);
        setUserEmail(e.target.value);
    },[userEmail])

    const onChangePW = useCallback((e) => {
        console.log(e.target.value);
        setUserPW(e.target.value);
    },[userPw])

    const checkPw = (e) => {
        const pw = e.target.value;
        console.log(pw);
        if(pw === userPw){
            setPWError(false);
        }else{
            setPWError(true);
        }
    }

    const onChangeTypeStore = useCallback((e) => {
        console.log(isStore);
        if(isStore){
            setisStore(false);
        }else{
            setisStore(true);
            setisCustomer(false);
        }
    },[isStore, isCustomer])

    const onChangeTypeCustomer = useCallback((e) => {
        if(isCustomer){
            setisCustomer(false);
        }else{
            setisCustomer(true);
            setisStore(false);
        }
    },[isCustomer, isStore])

    const onChangeCustomer = useCallback((e) => {
        const { name, value } = e.target;
        console.log(name + " : " + value);
        setCustomerInfo({
            ...storeInfo,
            [name] : value
        });
    }, [customerInfo])

    const onChangeStore = (e) => {
        const { name, value } = e.target;
        console.log(name + " : " + value);
        setStoreInfo({
            ...storeInfo,
            [name] : value
        });
    }

    const onChangePlace = (e) => {
        setSearchInput(e.target.value);
    }

    const search = (e) => {
        e.preventDefault();
        setStoreInfo({location: searchInput});
        console.log(storeInfo)
        setSearchInput("");
    }

    const sumbitHandler = (e) => {
        if(!term){
            alert("약관에 동의하셔야 합니다.");
            // return history.push("/main/signup");

            // return window.location.href = "/signup"
        }
        else if(pwError){
            alert("비밀번호가 일치하지 않습니다.")
            return history.goBack(0);
        }else{

        }
    }

    return(
        <Container>
            <Title>SIGN UP</Title>
            <SignupBox>
                <Box>
					<label>약관</label><br/>
					<textarea style={{width : "100%", height: "100px", resize: "none", border: "none"}}readOnly>약관내용</textarea><br/>	
           			<Checkbox name="user-term" value={term} onChange={onChangeTerm}>약관에 동의하십니까?</Checkbox>
               		{termError && <div style={{color : 'red'}}>약관에 동의하셔야 합니다.</div>}
				</Box>
                <Box>
                    <SignupInput type="email" name="email" onChange={onChangeEmail} placeholder="이메일@test.com"/>
                    <SignupInput type="password" onChange={onChangePW} placeholder="비밀번호" required/>
                    <SignupInput type="password" onChange={checkPw} placeholder="비밀번호 확인" required/>
                    {pwError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </Box>
                <TypeBtn>카페로 시작하기 
                    <input type="radio" name="type" value={isStore} onChange={onChangeTypeStore} style={{position: "absolute", width: "15px", height: "15px", top: "15px", right: "10px"}}/>
                </TypeBtn>
                {isStore && <Box>
                <SignupInput placeholder="카페 상호명" type="text" name="cafeName" onChange={onChangeStore}/>
                <SignupInput placeholder="전화번호: 000-0000-0000" type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" onChange={onChangeStore}/>
                <div style={{width: "100%", position: "relative"}}>
                    <label>카페 위치</label>
                    <SignupInput style={{width: "85%", margin: "5px 0px"}} placeholder="카페 위치 검색" type="text" name="cafeName" onChange={onChangePlace}/>
                    <SearchBtn onClick={search}>검색</SearchBtn>
                </div>
                <MapContainer searchPlace={storeInfo.location}/>
                </Box>}
                <TypeBtn>손님으로 시작하기
                    <input type="radio"  name="type" value={isCustomer} onChange={onChangeTypeCustomer} style={{position: "absolute", width: "15px", height: "15px", top: "15px", right: "10px"}}/>
                </TypeBtn>
                {isCustomer && <Box>
                    <SignupInput type="text" name="name" onChange={onChangeCustomer} placeholder="이름"/>
                </Box>}
                
                <SubmitBtn onClick={sumbitHandler}>WORKING COFFEE 시작하기</SubmitBtn>
            </SignupBox>

        </Container>
    );
}

export default Index;