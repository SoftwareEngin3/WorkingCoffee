import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Checkbox} from 'antd';
import { useHistory } from "react-router-dom";

const Container = styled.div`
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
const SignupBox = styled.form``

const Box = styled.div`
width: 100%;
padding: 10px;
`

const TypeBtn = styled.button`
width: 90%;
margin: 10px auto;
padding: 10px;
border-radius: 5px;
`
const SubmitBtn = styled.button`
`

function Index({}){
    const [userId, setUserId] = useState('');
    const [userPw, setUserPW] = useState('');
    const [pwError, setPWError] = useState(false);
    
    const [type, setType] = useState();
    const [isCustomer, setisCustomer] = useState(false);
    const [isStore, setisStore] = useState(false);

    const [customerInfo, setCustomerInfo] = useState({email: "", name: ""})
    const [storeInfo, setStoreInfo] = useState({
        cafeName: "",
        phone: "",
        location: "",
        info: ""
    })

    const [term,setTerm] = useState(false);
	const [termError,setTermError] = useState(false);

    const history = useHistory();
    
	const onChangeTerm = useCallback((e) => {
		if(!term){
		setTermError(false);
        setTerm(true);
		}else{
			setTerm(false);
		}
	},[term]);

    const onChangeId = useCallback((e) => {
        console.log(e.target.value);
        setUserId(e.target.value);
    },[userId])

    const onChangePW = useCallback((e) => {
        console.log(e.target.value);
        setUserPW(e.target.value);
    },[userPw])

    const checkPw = useCallback((e) => {
        const pw = e.target.value;
        console.log(pw);
        if(pw === userPw){
            setPWError(false);
        }else{
            setPWError(true);
        }

    },[])

    const setUserType = useCallback((type) => {
        // e.preventDefault();                
        if(!term){
            return setTermError(true);
		}
        console.log(type);
        setType(type);
        if(type === "store"){
            setisCustomer(false);
            setisStore(true);
        }else{
            setisCustomer(true);
            setisStore(false);
        }
    },[type])

    const onChangeCustomer = useCallback((e) => {
        const { name, value } = e.target;
        console.log(name + " : " + value);
        setCustomerInfo({
            ...storeInfo,
            [name] : value
        });
    }, [customerInfo])

    const onChangeStore = useCallback((e) => {
        const { name, value } = e.target;
        console.log(name + " : " + value);
        setStoreInfo({
            ...storeInfo,
            [name] : value
        });
    },[storeInfo])

    const sumbitHandler = useCallback((e) => {
        if(termError){
            alert("약관에 동의하셔야 합니다.");
            // return history.push("/main/signup");
            return history.goBack(0);
        }
        if(pwError){
            alert("비밀번호가 일치하지 않습니다.")
            return history.goBack(0);
        }
    })

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
                    <label> 아이디 : </label><input type="text" onChange={onChangeId} required/>
                    <label> 비밀번호 : </label><input type="password" onChange={onChangePW} required/>
                    <label> 비밀번호 확인 : </label><input type="password" onChange={checkPw} required/>
                    {pwError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </Box>
                <TypeBtn onClick={setUserType("store")}>카페로 시작하기 {'>'} </TypeBtn>
                {isStore && <>
                <label>이메일 : </label> <input type="email" name="email" onChange={onChangeCustomer}/>
                <label>이름 : </label> <input type="text" name="name" onChange={onChangeCustomer}/>
                </>}
                <TypeBtn onClick={setUserType("customer")}>손님으로 시작하기 {'>'}</TypeBtn>
                {isCustomer && <>
                <label>카페상호명 : </label><input type="text" name="cafeName" onChange={onChangeStore}/>
                <label>전화번호 : </label><input type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" onChange={onChangeStore}/>
                </>}
                <SubmitBtn onClick={sumbitHandler}></SubmitBtn>
            </SignupBox>

        </Container>
    );
}

export default Index;