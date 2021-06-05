import React, {useCallback, useEffect, useState} from 'react';
import styled from 'styled-components';
// import Rating from '@material-ui/lab/Rating';
import { Rate } from 'antd';
import 'antd/dist/antd.css';

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
const ReviewBox = styled.div`
width: 100%;
border-radius: 5px;
background-color: white;
margin: 10px auto;
padding: 10px;
position: relative;
`
const ReportBtn = styled.button`
background-color: red;
color: white;
position: absolute;
top: 5px;
right: 5px;
padding: 3px;
border-radius: 5px;
`
const MenuBox = styled.div`
font-size: 12px;
display: block;
margin-bottom: 10px;
`
const RateBox = styled.div`
position: absolute;
top: 0px;
right: 42px;
`

function Index(){
    const [reviewList, setReviewList] = useState([
        {id: 0, userId: 0, content: "너무너무 맛있어요", menu: "녹차프라푸치노", rate: "5", report: 0},
        {id: 1, userId: 5, content: "서비스 최악이네요 너무 맛없어요 망하세요", menu: "아메리카노(ice)", rate: "1", report: 0},
        {id: 2, userId: 1, content: "사장님도 친절하고 너무 좋아요", menu: "카페라떼(ice)", rate: "4", report: 0},
        {id: 2, userId: 1, content: "사장님도 친절하고 너무 좋아요", menu: "카페라떼(ice)", rate: "4", report: 1}
    ])

    const reportReview = (review) => {
        let tempReview = {id: review.id, userId: review.userId, content: review.content, menu: review.menu, rate: review.rate, report: (review.report + 1)}
        let newReviewList = [];
        reviewList.map((value) => {
            if(value.id === review.id){
                newReviewList.push(tempReview);
            }else{
                newReviewList.push(value)
            }
        })
        setReviewList(newReviewList);
    }



    return(
        <Container>
            <Title>리뷰 확인</Title>
            {reviewList.map((review, index)=> 
                <ReviewBox>
                    {review.report === 0 ? 
                    <div>
                        <MenuBox>메뉴: {review.menu}</MenuBox>
                        <RateBox><Rate disabled defaultValue={review.rate} /></RateBox>
                        <ReportBtn onClick={(e) => reportReview(review)}>신고</ReportBtn>
                        {review.content}
                    </div>                
                    : <div> 현재 처리 중인 리뷰입니다.</div>}

                </ReviewBox>
            )}
        </Container>
    );
}

export default Index;