import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
import 'antd/dist/antd.css';
import { DatePicker, TimePicker} from 'antd';
import moment from 'moment';

const Container = styled.div`
width: 100%;
height: 100%;
background-color: #ffd098;
padding: 20px 10px;
`
const Title = styled.div`
font-size: 24px;
border-bottom: 1px solid #F7F9FC;
height: 40px;
font-weight: 700;
Text-align: center;
`
const Box = styled.div`
width: 100%;
margin: 20px auto;
display: block;
position: relative;
`
const SelectCust = styled.select`
font-size: 16px;
padding: 5px; /* 여백으로 높이 설정 */
//font-family: inherit;  /* 폰트 상속 */
border-radius: 3px; /* iOS 둥근모서리 제거 */
-webkit-appearance: none; /* 네이티브 외형 감추기 */
-moz-appearance: none;
appearance: none;
position: absolute;
right: 0px;
background-color: white;
border: none;
`
const PriceBox = styled.div`
position: absolute;
bottom: 5px;
right: 5px;
font-size: 16px; 
`
const TotalBox = styled.div`
width: 100%;
background-color: white;
border-radius: 5px;
position: relative;
padding: 5px;
margin: 5px auto;
`
const NumBtnBox = styled.div`
position: absolute;
top: 0px;
right: 5px;
`
const NubBtn = styled.button`
border-radius: 5px;
// border: 1px solid #fafafa;
display: inline-block;
height: 20px;
width: 20px;
background-color: #ff8b00;
color: white;
`
const Btn = styled.button`
color: white;
background: #74b95b;
border-radius: 5px;
padding: 10px;
margin: 0 auto;
&:hover{
    background-color: #ff8b00;
}
`

function Index({}){
    const [storeInfo, setStoreInfo] = useState(
        {id: 0, name: "커피에 반하다", phone: "000-0000-0000", limit: 100, time: ["09:00", "23:00"],
        menu: [{category: "커피", menu:[{name: "아메리카노(ice)", price: 1000}, {name: "아메리카노(hot)", price: 1000}, {name: "카페라떼(ice)", price: 1500}, {name: "카페라떼(hot)", price: 1000}]}, 
        {category: "디저트", menu:[{name: "티라미슈", price: 4500}, {name: "아포가토", price: 3000}, {name: "홍차쉬폰케이크", price: 4500}]}
    ]})
    const [bookStatus, setBookStatus] = useState([0, 0, 0, 0, 0, 0, 30, 30, 20, 20, 30, 20, 10, 10, 10, 10, 10, 20, 50, 90, 100, 10, 0, 0])
    
    const [menuList, setMenuList] = useState([]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState();
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalNum, setTotalNum] = useState(0);
    const [timeIndex, setTimeIndex] = useState(0);


    const [timeError, setTimeError] = useState(false);

    const onChangeMenu = (e) => {
        console.log(e.target.value)
        
        const result = e.target.value.split(',');
        console.log(result)
        let menu = {
            name: result[0],
            price: parseInt(result[1]),
            num: 1
        }
        setMenuList([...menuList, menu]);
    }

    const onChangeDate = (value, dateString) => {
        console.log(dateString);
        setDate(dateString);
    }

    const onChangeTime = (value, dateString) => {
        setTime(dateString);
        let time = moment(value).add(0, 'h').format("H")
        setTimeIndex(parseInt(time));
        console.log(bookStatus[parseInt(time)] + totalNum);
        if(value > moment(storeInfo.time[1], "HH:mm") || value < moment(storeInfo.time[0], "HH:mm")){setTimeError(true)}
        else if((bookStatus[parseInt(time)] + totalNum) > storeInfo.limit){setTimeError(true)}
        else{setTimeError(false)}

    }

    const onChangeNum = (value, type) =>{
        let change;
        let newMenuList = [];
        if(type === "m"){
            change = {name: value.name, price: value.price, num: (value.num - 1)}
            if((value.num - 1) === 0){
                return setMenuList(menuList.filter(menu => menu.name !== change.name));
            }
        }else{
            change = {name: value.name, price: value.price, num: (value.num + 1)}
        }
        menuList.map((menu)=>{
            if(menu.name === change.name){
                newMenuList.push(change);
            }else{
                newMenuList.push(menu)
            }
        })
        setMenuList(newMenuList);
    }

    useEffect(() => {
        let sum = 0;
        let sumNum = 0;
        menuList.map((menu) => {sum = sum + (menu.price * menu.num); sumNum = sumNum + menu.num});
        setTotalPrice(sum);
        setTotalNum(sumNum);
        console.log(bookStatus[timeIndex] + sumNum)
        if(bookStatus[timeIndex] + sumNum > storeInfo.limit){
            setTimeError(true)
        }else{setTimeError(false)}
    }, [menuList])
    

    return(
    <Container>
        <Title>예약 하기</Title>
        
        <Box> 메뉴 선택
            <SelectCust onChange={onChangeMenu}>
                {storeInfo.menu.map((category, categoryId) => 
                    <optgroup label={category.category}>
                        {category.menu.map((menu, menuId) => <option value={[menu.name, menu.price]}>{menu.name} / {menu.price}원</option>)}
                    </optgroup>)}
            </SelectCust>
        </Box>
        <Box>시간 선택
            <div style={{position: "absolute", top: "0px", right: "0px"}}>
                {/* <DatePicker onChange={onChangeDate} format="MM/DD"/> */}
                <TimePicker onChange={onChangeTime} format="HH:mm"/>
            </div>
        </Box>
        {timeError && <div style={{color : 'red'}}>다른 시간을 선택해주십시오.</div>}
        <Box> 예약 정보<br/>
            <TotalBox>
                <div>{storeInfo.name}</div>
                {menuList.map((value) => <div style={{position: "relative"}}>{value.name} <NumBtnBox><NubBtn onClick={(e)=>onChangeNum(value, "m")}>-</NubBtn><div style={{width: "20px", textAlign: "center", display: "inline-block"}}>{value.num}</div><NubBtn onClick={(e) => onChangeNum(value, "p")}>+</NubBtn></NumBtnBox></div>)}
                <div style={{position: "relative"}}>예약 시간: {date} {time}</div>
                <div style={{marginTop: "10px"}}>총 금액 : <PriceBox>{totalPrice} 원</PriceBox></div>
            </TotalBox>
        </Box>
        <Btn>예약하기</Btn>
    </Container>
    );
}

export default Index;