import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import {Checkbox} from 'antd';
import { useHistory } from "react-router-dom";
import {ReactComponent as SearchIcon} from '../../../images/search.svg'

const Container = styled.div`
width: 100%;
height: 100%;
margin: 0 auto;
padding: 10px;
`
const MenuBtn = styled.button`
width: 100%;
background: white;
border-radius: 5px;
padding: 10px 5px;
box-shadow: 0px 3px 5px 0px #f5f5f5;
// margin: 10px;
&:hover{
    background-color: #ff8b00;
}
`

function Index({}){

    return(
    <Container>
        <table style={{width: "80%", borderSpacing: "5px", borderCollapse: "separate", margin: "0px auto", marginBottom: "20px"}}>
            <tbody>
                <tr>
                    <td style={{width: "50%"}}><MenuBtn>
                        <SearchIcon width="40%" fill="#6f6f6f"/>
                        <div>카페 찾기</div>
                    </MenuBtn></td>
                    <td style={{width: "50%"}}><MenuBtn href="customer/book"> 
                        카페 예약
                    </MenuBtn></td>
                </tr>
                <tr>
                    <td style={{width: "50%"}}><MenuBtn>
                    <div>리뷰 작성</div>
                    </MenuBtn></td>
                    <td style={{width: "50%"}}><MenuBtn>
                        내 정보 확인
                    </MenuBtn></td>
                </tr>
            </tbody>
        </table>
    </Container>
    );
}

export default Index;