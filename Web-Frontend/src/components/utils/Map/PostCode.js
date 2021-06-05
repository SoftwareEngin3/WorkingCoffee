import React, { useState } from 'react';
import DaumPostCode from 'react-daum-postcode';
import styled from 'styled-components';

/* const Modal = styled.div`
// @include flex-center;
postion: fixed;
justify-content: center;
align-items:center;
top: 50px;
left: 0;
right: 0;
bottom: 0;
background: #00000080;
z-index: 10000;
` */

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

/* const postCodeStyle = {
    display: "block",
    position: "fixed",
    justifyContent: "center",
    top: "50px",
    left: "50%", 
    width: "400px",
    height: "500px",
    padding: "7px",
    zindex: "10000",
    transform: "translateX(-50%)"
  }; */

const DaumPost = ({closePostCode, onChangeLocation}) => {
    const handleComplete = (data) => {
        let fullAddress = data.address;
        console.log(fullAddress)
        let extraAddress = '';
        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddress += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
            }
            fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        //fullAddress -> 전체 주소반환
        onChangeLocation(fullAddress);
        // closePostCode();
    }
    return (
        // <DaumPostCode style={postCodeStyle} onComplete={handleComplete} className="post-code" />
        // <Modal><DaumPostCode onComplete={handleComplete} className="post-code" /></Modal>
        <DaumPostCode onComplete={handleComplete} className="post-code" />
    );
}
export default DaumPost;