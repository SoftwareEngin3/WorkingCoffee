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

    return(
    <Container>
    </Container>
    );
}

export default Index;