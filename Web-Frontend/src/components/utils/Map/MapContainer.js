import React, { useEffect } from 'react';

const { kakao } = window;

const MapContainer = ({searchPlace}) => {

    useEffect(() => {
        const container = document.getElementById('myMap');
		const options = {
			center: new kakao.maps.LatLng(searchPlace.LocationY, searchPlace.LocationX),
			level: 3
		};
        const map = new kakao.maps.Map(container, options);
        /*
        var geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(searchPlace, function (result, status) {
            
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                map.setCenter(coords);
            }
        });*/
        if(searchPlace){
            console.log(searchPlace)
            var coords = new kakao.maps.LatLng(searchPlace.LocationY, searchPlace.LocationX);
            let marker = new kakao.maps.Marker({
                map: map,
                position: coords
                // position: map.getCenter()
                // clickable: true
            })//, infowindow = new kakao.maps.InfoWindow({zindex:1});

            marker.setMap(map);
            map.setCenter(coords);
        }
       
        // 지도에 마커를 표시하는 함수
        function displayMarker(x, y) {
            
            // 마커를 생성하고 지도에 표시
            let marker = new kakao.maps.Marker({
                map: map,
                position: new kakao.maps.LatLng(y, x)
                // position: map.getCenter()
                // clickable: true
            })//, infowindow = new kakao.maps.InfoWindow({zindex:1});

            marker.setMap(map);
            // marker.setDraggable(true); 
            /* 
            // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
            kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
                searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
                    if (status === kakao.maps.services.Status.OK) {
                        var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                        detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                        
                        var content = '<div class="bAddr">' +
                                        '<span class="title">법정동 주소정보</span>' + 
                                        detailAddr + 
                                    '</div>';

                        // 마커를 클릭한 위치에 표시합니다 
                        marker.setPosition(mouseEvent.latLng);
                        marker.setMap(map);

                        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }   
                });
            }); */

           /*  // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
            kakao.maps.event.addListener(map, 'idle', function() {
                searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            });

            function searchAddrFromCoords(coords, callback) {
                // 좌표로 행정동 주소 정보를 요청합니다
                geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
            }

            function searchDetailAddrFromCoords(coords, callback) {
                // 좌표로 법정동 상세 주소 정보를 요청합니다
                geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
            }

            // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
            function displayCenterInfo(result, status) {
                if (status === kakao.maps.services.Status.OK) {
                    var infoDiv = document.getElementById('centerAddr');

                    for(var i = 0; i < result.length; i++) {
                        // 행정동의 region_type 값은 'H' 이므로
                        if (result[i].region_type === 'H') {
                            infoDiv.innerHTML = result[i].address_name;
                            break;
                        }
                    }
                }    
            } */

            /* // 마커에 클릭이벤트를 등록
            kakao.maps.event.addListener(marker, 'click', function() {
                // 마커를 클릭하면 장소명이 인포윈도우에 표출
                infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                infowindow.open(map, marker);
            }); */
        }
    }, [searchPlace]);

    return (
        <div>
            <div id='myMap' style={{width: '100%', height: "250px"}}>

            </div>
            <div id="clickLatlng"></div>
        </div>
    );
}

export default MapContainer;