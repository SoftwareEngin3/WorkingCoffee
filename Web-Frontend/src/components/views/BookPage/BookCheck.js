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
background-color: white;
padding: 10px;
border-radius: 5px;
`
const PriceBox = styled.div`
position: absolute;
bottom: 0px;
right: 5px;
font-size: 16px; 
`
const TotalBox = styled.div`
width: 100%;
// background-color: #ffd098;
background-color: #fafafa;
border-radius: 5px;
position: relative;
padding: 5px;
margin: 5px auto;
`
function ShowList({book}){
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let sum = 0;
        book.menu.map((value, index)=>{
            sum = sum + (value.num * value.price);
        })
        setTotal(sum);
    }, [])
    return (
        <Box>
            <div>예약자명 : {book.userName}</div>
            <div>예약 시간: {book.time}</div>
            <TotalBox>
                <div>주문 내역</div>
                {book.menu.map((value) => <div style={{position: "relative"}}>{value.name} <div style={{position: "absolute", top: "0px",right: "5px"}}>{value.num}</div></div>)}
                <div style={{position: "relative"}}>총 결제 금액: <PriceBox>{total} 원</PriceBox></div>
            </TotalBox>
            
        </Box>
    )
}

function Index({}){
    const [bookInfo, setBookInfo] = useState([{id: 0, userId: 0, userName: "홍길동", menu: [{name: "아메리카노(ice)", price: 1000, num: 3}], time: "11:30"}])

    return(
    <Container>
        <Title>예약 확인</Title>
        {bookInfo.map((book) => <ShowList book={book}/>)}
    </Container>
    );
}

export default Index;