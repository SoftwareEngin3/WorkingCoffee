import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

const Container = styled.div`
width: 100%;
height: 100%;
margin: 0 auto;
padding: 10px;
`
const MenuBtn = styled.a`
background: white;
border-radius: 5px;
padding: 10px;
box-shadow: 0px 3px 5px 0px #f5f5f5;
// margin: 10px;
&:hover{
    background-color: #ff8b00;
}
`

function Index(){

    return(
    <Container>
        <table style={{borderSpacing: "10px", borderCollapse: "separate", margin: "0px auto", marginBottom: "20px"}}>
            <tbody>
                <tr>
                    <td><MenuBtn href="/store/info">카페 정보 입력/수정</MenuBtn></td>
                    <td><MenuBtn >리뷰 확인</MenuBtn></td>
                </tr>
            </tbody>
        </table>
    </Container>
    );
}

export default Index;