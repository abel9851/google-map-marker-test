let map;

async function initMap() {
  const position = { lat: -25.344, lng: 131.031 };
  const marker_position = { lat: -30, lng: 150 };

  // 필요한 라이브러리를 요청한다.
  //@ts-ignore
  // 이 2개의 library(Map, AdvancedMarkerElement)는 initMap이 호출될 때 load된다!
  const { Map } = await google.maps.importLibrary("maps"); 
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

  // map을 정중앙에 놓는다.
  // div에서 사용한게 여기서 사용되는구나... map을 표시할 위치를 선정하는거였어..
  // 이는 맵을 새로 생성하는 것과 같아서 vue에서는 반드시 ref로 취급해야할듯하다.
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position, // 중앙이 될 위도, 경도! IER에서는 현재 유저의 위치
    mapId: "DEMO_MAP_ID",
  });

  // The Marker, 목표한 위치, 즉 맵의 중앙으로 설정된 곳의 마커를 표시하도록한다.
  // new는 라이브러리에서 분할당한 것을 사용한다. 끄집어낸거지, 초기화된게 아니기 때문이다.
  // 맵 어디에 마커를 찍을지 설정하는 용도다!
  // 근데 이 marker는 그 다음 어디에 사용될지가 없네? 뭐지?
  // 다른데에 응용되지 않더라도, 이상태로 마킹이 표시된다.
  // DROP animation을 넣어보자.

  const glyphImg = document.createElement("img");

  glyphImg.src =
  "https://developers.google.com/maps/documentation/javascript/examples/full/images/google_logo_g.svg";

  const glyphSvgPinElement = new PinElement({
    // glyph: "T",
    glyphColor: "white"
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: marker_position, // map에 설정한 중앙이랑, 다른 곳을 설정할수 있다!
    title: "current position",
    content: glyphSvgPinElement.element
  })

  marker.content.classList.add("bounce")
}

initMap(); // 위치를 선정하고, 그 위치를 맵에 표시하고, 그 맵의 어느 곳에 마킹을 할지 하는 것!