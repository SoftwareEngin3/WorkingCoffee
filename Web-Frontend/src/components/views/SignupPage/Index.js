import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
// import { authService, firebaseInstance } from "fbase";
import styled from 'styled-components';
import {Checkbox} from 'antd';
import { useHistory } from "react-router-dom";
import MapContainer from '../../utils/Map/MapContainer'
import DaumPost from '../../utils/Map/PostCode'

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
const PostCodeBtn = styled.button`
position : absolute;
right: 5px;
height: 30px;
padding: 3px;
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
const Modal = styled.div`
    display: block;
    position: fixed;
    justify-content: center;
    top: 50px;
    left: 50%; 
    width: 400px;
    height: 500px;
    padding: 7px;
    zindex: 10000;
    transform: translateX(-50%);
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
        location: {location: "", detail: ""},
        info: ""
    })

    const [term,setTerm] = useState(false);
	const [termError,setTermError] = useState(false);
    const [isPopOpen, setisPopOpen] = useState(false);
    const [location, setLocation] =  useState('');
    const [locationDetail, setLocationDetail] =  useState('');

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


    const onChangeLocation = (fullAddress) => {
        setLocation(fullAddress);
    }
    const openPostCode = (e) => {
        e.preventDefault();
        setisPopOpen(true);
    }

    const closePostCode = () => {
        setisPopOpen(false);
        setStoreInfo({location: {location: location}})
    }
    const onChangeLocationDetail = (e) => {
        setLocationDetail(e.target.value);
    }

    const sumbitHandler = (e) => {
        if(!term){
            alert("????????? ??????????????? ?????????.");
            // return history.push("/main/signup");

            // return window.location.href = "/signup"
        }
        else if(pwError){
            alert("??????????????? ???????????? ????????????.")
            return history.goBack(0);
        }else{
            if(isStore){
                
            }
            else{

            }

        }
    }

    return(
        <Container>
            <Title>SIGN UP</Title>
            <SignupBox>
                <Box>
					<label>??????</label><br/>
					<textarea style={{width : "100%", height: "100px", resize: "none", border: "none"}}readOnly>????????????</textarea><br/>	
           			<Checkbox name="user-term" value={term} onChange={onChangeTerm}>????????? ???????????????????</Checkbox>
               		{termError && <div style={{color : 'red'}}>????????? ??????????????? ?????????.</div>}
				</Box>
                <Box>
                    <SignupInput type="email" name="email" onChange={onChangeEmail} placeholder="?????????@test.com"/>
                    <SignupInput type="password" onChange={onChangePW} placeholder="????????????" required/>
                    <SignupInput type="password" onChange={checkPw} placeholder="???????????? ??????" required/>
                    {pwError && <div style={{color : 'red'}}>??????????????? ???????????? ????????????.</div>}
                </Box>
                <TypeBtn>????????? ???????????? 
                    <input type="radio" name="type" value={isStore} onChange={onChangeTypeStore} style={{position: "absolute", width: "15px", height: "15px", top: "15px", right: "10px"}}/>
                </TypeBtn>
                {isStore && <Box>
                <SignupInput placeholder="?????? ?????????" type="text" name="cafeName" onChange={onChangeStore}/>
                <SignupInput placeholder="????????????: 000-0000-0000" type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" onChange={onChangeStore}/>
                <div style={{width: "100%", position: "relative"}}>
                    <label>?????? ??????</label>
                    <PostCodeBtn onClick={openPostCode}>???????????? ??????</PostCodeBtn>
                    {isPopOpen && <Modal>
                        <DaumPost closePostCode={closePostCode} onChangeLocation={onChangeLocation}/>
                        <button style={{position: "fixed", top: "-10px", right: "10px"}} onClick={closePostCode}>??????</button>
                        </Modal>}
                </div>
                <div style={{marginTop: "10px"}}>
                    <SignupInput type="text" value={storeInfo.location.location} readOnly/>
                    <SignupInput type="text" onChange={onChangeLocationDetail} placeholder="????????????"/>
                </div>
                </Box>}
                <TypeBtn>???????????? ????????????
                    <input type="radio"  name="type" value={isCustomer} onChange={onChangeTypeCustomer} style={{position: "absolute", width: "15px", height: "15px", top: "15px", right: "10px"}}/>
                </TypeBtn>
                {isCustomer && <Box>
                    <SignupInput type="text" name="name" onChange={onChangeCustomer} placeholder="??????"/>
                </Box>}
                
                <SubmitBtn onClick={sumbitHandler}>WORKING COFFEE ????????????</SubmitBtn>
            </SignupBox>

        </Container>
    );
}

export default Index;