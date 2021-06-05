import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import {ReactComponent as PlusIcon} from '../../../images/plus.svg'
import DaumPost from '../../utils/Map/PostCode'
import { TimePicker } from 'antd';

const Container = styled.div`
width: 100%;
// height: 600px;
margin: 10px auto;
border-radius: 10px;
padding: 10px;
background-color: #ffd098;
`
const Title = styled.div`
font-size: 24px;
border-bottom: 1px solid #F7F9FC;
height: 40px;
// font-style: italic;
font-weight: 700;
`
const InfoBox = styled.form`
padding: 10px 5px;
`
const Box = styled.div`
background-color: #fafafa;
position : relative;
border-radius: 5px;
width: 100%;
padding: 10px;
margin: 5px auto;
margin-bottom: 15px;
border-top: 1px solid #ffd098;
`
const InfoInput = styled.input`
background-color: white;
border: none;
border-radius: 5px;
width: 100%;
padding: 5px;
margin: 5px auto;
`
const BtnBox = styled.div`
margin: 10px auto;
text-align: center;
width: 100%;
`
const Btn = styled.button`
color: white;
background: red;
border-radius: 5px;
padding: 10px;
margin: 0 5px;
&:hover{
    background-color: #ff8b00;
}
`
const CategoryBox = styled.div`
width: 100%;
padding: 10px;
`
const Category = styled.div`
width: 100%;
height: 30px;
line-height: 30px;
position : relative;
`
const CategoryBtn = styled.button`
color: white;
background: red;
border-radius: 5px;
padding: 5px;
height: 30px;
margin: 0 5px;
`
const MenuBox = styled.div`
width: 100%;
padding-left: 10px;
height: 20px;
line-height: 20px;
position : relative;
margin: 5px auto;
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
const PostCodeBtn = styled.button`
position : absolute;
right: 5px;
height: 30px;
padding: 3px;
border-radius: 5px;
background-color: #ff8b00;
color: white;
`
const TimeBox = styled.div`
width: 100%;
`

function ShowMenu({menu, id, categoryId, deleteMenu}){
    const numberWithCommas = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return(
        <MenuBox>
            <div style={{position: "absolute", top: "3px", left: "5px"}}>{menu.name}</div>
            <div style={{position: "absolute", top: "3px", right: "40px"}}>{numberWithCommas(menu.price)} 원</div>
            <button onClick={(e) => deleteMenu(e, categoryId, id)} style={{position: "absolute",  top: "3px", right: "5px"}}><img style={{maxHeight: "20px"}} src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMnB0IiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMnB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNTYgMGMtMTQxLjE2NDA2MiAwLTI1NiAxMTQuODM1OTM4LTI1NiAyNTZzMTE0LjgzNTkzOCAyNTYgMjU2IDI1NiAyNTYtMTE0LjgzNTkzOCAyNTYtMjU2LTExNC44MzU5MzgtMjU2LTI1Ni0yNTZ6bTAgMCIgZmlsbD0iI2Y0NDMzNiIvPjxwYXRoIGQ9Im0zNTAuMjczNDM4IDMyMC4xMDU0NjljOC4zMzk4NDMgOC4zNDM3NSA4LjMzOTg0MyAyMS44MjQyMTkgMCAzMC4xNjc5NjktNC4xNjAxNTcgNC4xNjAxNTYtOS42MjEwOTQgNi4yNS0xNS4wODU5MzggNi4yNS01LjQ2MDkzOCAwLTEwLjkyMTg3NS0yLjA4OTg0NC0xNS4wODIwMzEtNi4yNWwtNjQuMTA1NDY5LTY0LjEwOTM3Ni02NC4xMDU0NjkgNjQuMTA5Mzc2Yy00LjE2MDE1NiA0LjE2MDE1Ni05LjYyMTA5MyA2LjI1LTE1LjA4MjAzMSA2LjI1LTUuNDY0ODQ0IDAtMTAuOTI1NzgxLTIuMDg5ODQ0LTE1LjA4NTkzOC02LjI1LTguMzM5ODQzLTguMzQzNzUtOC4zMzk4NDMtMjEuODI0MjE5IDAtMzAuMTY3OTY5bDY0LjEwOTM3Ni02NC4xMDU0NjktNjQuMTA5Mzc2LTY0LjEwNTQ2OWMtOC4zMzk4NDMtOC4zNDM3NS04LjMzOTg0My0yMS44MjQyMTkgMC0zMC4xNjc5NjkgOC4zNDM3NS04LjMzOTg0MyAyMS44MjQyMTktOC4zMzk4NDMgMzAuMTY3OTY5IDBsNjQuMTA1NDY5IDY0LjEwOTM3NiA2NC4xMDU0NjktNjQuMTA5Mzc2YzguMzQzNzUtOC4zMzk4NDMgMjEuODI0MjE5LTguMzM5ODQzIDMwLjE2Nzk2OSAwIDguMzM5ODQzIDguMzQzNzUgOC4zMzk4NDMgMjEuODI0MjE5IDAgMzAuMTY3OTY5bC02NC4xMDkzNzYgNjQuMTA1NDY5em0wIDAiIGZpbGw9IiNmYWZhZmEiLz48L3N2Zz4=" /></button>
        </MenuBox>
    )
}

function ShowCategory({category, id, deleteMenu, deleteCategory}){
    const [isShowing, setisShowing] = useState(false);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);

    const onChangeShowing = useCallback((e) => {
        e.preventDefault();
        setisShowing(true)
    }, [isShowing])

    const addMenu = (e) => {
        let newMenu = {
            name : name,
            price : price
        }
        console.log(newMenu);
        category.menu.push(newMenu);
        setisShowing(false);
        setName("");
        setPrice(0);
    }

    useEffect(()=>{
        console.log(category)
    },[category])

    return(
        <CategoryBox>
            <Category> 
                {category.category}
                <div style={{position: "absolute", top: "0px", right:"-5px"}}>
                    <CategoryBtn onClick={onChangeShowing} style={{backgroundColor: "#74b95b"}}>메뉴 추가</CategoryBtn>
                    <CategoryBtn onClick={(e) => deleteCategory(e, id)}>카테고리 삭제</CategoryBtn>
                </div>
            </Category>
            {isShowing && <div style={{width: "100%", margin: "5px auto"}}>
                <InfoInput onChange={(e) => setName(e.target.value)} placeholder="메뉴 이름" style={{width: "39%", marginRight: "1%"}}/>
                <InfoInput  onChange={(e) => setPrice(e.target.value)} placeholder="가격(단위: 원)" style={{width: "39%", marginRight: "1%"}} type="num"/>
                <CategoryBtn onClick={addMenu} style={{backgroundColor: "#74b95b", margin: "0px", height: "27.6px"}}>메뉴 추가</CategoryBtn>
            </div>}
            {category.menu.map((value, index)=>(<ShowMenu menu={value} key={index} id={index} categoryId={id} deleteMenu={deleteMenu}/>))}
        </CategoryBox>
    )
}
function ShowCategoryList({menulist, deleteMenu, deleteCategory}){
    return(
    <div>
        {menulist.map((value, index) => (
            <ShowCategory category={value} key={index} id={index} deleteMenu={deleteMenu} deleteCategory={deleteCategory}/>
        ))}
    </div>)
}

function Index(){
    const [email, setEmail] = useState("이메일");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("가게이름");
    const [phone, setPhone] = useState("000-0000-0000");
    const [info, setInfo] = useState("");
    const [address, setAddress] = useState("");
    const [addressDetail, setAddressDetail] = useState("");
    const [startTime, setStartTime] = useState([]);
    const [endTime, setEndTime] = useState([]);
    const [limit, setLimit] = useState([]);

    const [menulist, setMenuList] = useState([]);

    const [category, setCateGory] = useState("");

    const [showInput, setShowInput] = useState(false);
    const [pwError, setPWError] = useState(false);
    const [isPopOpen, setisPopOpen] = useState(false);
    const week = ["월", "화", "수", "목", "금", "토", "일"]

    const onChangePW = useCallback((e) => {
        console.log(e.target.value);
        setPassword(e.target.value);
    },[password]);

    const checkPw = (e) => {
        const pw = e.target.value;
        console.log(pw);
        if(pw === password){
            setPWError(false);
        }else{
            setPWError(true);
        }
    }

    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    },[name])

    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    },[phone])

    const onChangeInfo = useCallback((e) => {
        setInfo(e.target.value)
    },[info])

    const onChangeCategory = useCallback((e) => {
        setCateGory(e.target.value)
    },[category])

    const addCategory = useCallback((category) => {
        const newCate = {
            category: category,
            menu: []
        };
        console.log(newCate);
        setMenuList(menulist.concat(newCate))
        setCateGory("");
        setShowInput(false);
    },[menulist, category])

    const deleteCategory = (e, id) => {
        e.preventDefault();
        setMenuList(menulist.filter((value, index) => index !==id));
    }

    const deleteMenu = (e, category, id) => {
        e.preventDefault();
        const editCategory = {
            category: menulist[category].category,
            menu: menulist[category].menu.filter((value, index) => index !== id)
        };

        let newMenuList = [];
        menulist.map((value, index) => {
            if(index === category){
                newMenuList.push(editCategory);
            }else{
                newMenuList.push(value);
            }
        })

        setMenuList(newMenuList);

        console.log(menulist[category]);
    }

    const onChangeAddress = (fullAddress) => {
        setAddress(fullAddress);
    }

    const openPostCode = (e) => {
        e.preventDefault();
        setisPopOpen(true);
    }

    const closePostCode = () => {
        setisPopOpen(false);
    }
    const onChangeAddressDetail = (e) => {
        setAddressDetail(e.target.value);
    }

    const sumbitHandler = (e) => {
        e.preventDefault();
        return window.location.href = "/store/"
    }

    const cancel = (e) => {
        e.preventDefault();
        return window.location.href = "/store"
    }

    const onChangeLimit = (e, index) => {
        limit[index] = e.target.value;
    }

    useEffect(()=>{
        console.log(menulist)
    },[menulist])

    return(
    <Container>
        <Title>카페 정보 입력</Title>
        <InfoBox>
            <label>계정 정보</label>
            <Box>
                <label style={{fontSize: "12px"}}>이메일</label>
                <InfoInput value={email} readOnly/>
                <label style={{fontSize: "12px"}}>비밀번호</label>
                <InfoInput type="password" placeholder={password} onChange={onChangePW}/>
                <label style={{fontSize: "12px"}}>비밀번호 확인</label>
                <InfoInput type="password" placeholder={password} onChange={checkPw}/>
                {pwError && <div style={{color : 'red'}}>비밀번호가 일치하지 않습니다.</div>}
            </Box>
            <label>가게 정보</label>
            <Box>
                <label style={{fontSize: "12px"}}>카페 상호명</label>
                <InfoInput placeholder={name} type="text" onChange={onChangeName}/>
                <label style={{fontSize: "12px"}}>전화번호</label>
                <InfoInput placeholder={phone} type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" onChange={onChangePhone}/>
                <label style={{fontSize: "12px"}}>카페 소개글</label>
                <textarea placeholder={info} onChange={onChangeInfo} style={{height: "60px", width: "100%", resize: "none", border: "none"}}/>
                <div style={{width: "100%", position: "relative"}}>
                    <label style={{fontSize: "12px"}}>위치 확인</label>
                    <PostCodeBtn onClick={openPostCode}>우편번호 검색</PostCodeBtn>
                    {isPopOpen && <Modal>
                        <DaumPost closePostCode={closePostCode} onChangeLocation={onChangeAddress}/>
                        <button style={{position: "fixed", top: "-10px", right: "10px"}} onClick={closePostCode}>닫기</button>
                        </Modal>}
                </div>
                <div style={{marginTop: "10px"}}>
                    <InfoInput type="text" value={address} readOnly/>
                    <InfoInput type="text" onChange={onChangeAddressDetail} placeholder="상세주소"/>
                </div>
                <label style={{fontSize: "12px"}}>예약 제한(시간당)</label>
                {week.map((value, index)=> <TimeBox>{value} : <InfoInput style={{width: "80%"}} type="number" onChange={(e) => onChangeLimit(e, index)}/></TimeBox>)}
            </Box>
            <label>메뉴</label>
            <Box style={{paddingTop: "60px"}}>
                <button type="button" onClick={(e) => setShowInput(true)} style={{position: "absolute", top: "10px", left: "50%", transform: "translateX(-50%)"}}><PlusIcon width= "50px" height="50px"/></button>
                {showInput && <div style={{position:"relative"}}>
                    <InfoInput style={{width: "90%", display: "inline-block"}} placeholder="추가할 카테고리" type="text" onChange={onChangeCategory}/>
                    <Btn onClick={(e) => addCategory(category)} style={{backgroundColor: "#74b95b", position: "absolute", top: "5px", right: "0px", height: "27.6px", padding: "5px"}}>추가</Btn>
                </div>}
                <ShowCategoryList menulist={menulist} deleteMenu={deleteMenu} deleteCategory={deleteCategory}/>
            </Box>
            <BtnBox>
                <Btn onClick={sumbitHandler} style={{backgroundColor: "#74b95b"}}>저장</Btn>
                <Btn onClick={cancel}>취소</Btn>
            </BtnBox>
        </InfoBox>
    </Container>
    );
}

export default Index;