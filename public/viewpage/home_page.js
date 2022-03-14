import * as Auth from '../controller/auth.js'
import * as Elements from './elements.js'
import * as Constants from '../model/constants.js'
import {
  updateColorData, updateRgbData, attachRealtimeListener, initFirestoreDocs,
} from '../controller/firestore_controller.js'

let colorDataDoc, green, blue, red, newColor


export async function home_page() {
  if (!Auth.currentUser) {
    Elements.root.innerHTML = `
        <h3>Not Signed In</h3>
    `;
    return;
  }
  await initFirestoreDocs()
 
  red = 0
  green = 0
  blue = 0
  updateColorData({ redVal: 0 });
  updateColorData({ greenVal: 0 });
  updateColorData({ blueVal: 0 });
  updateRgbData({ rgbVal: "rgb(0,0,0)"});


  let html = '';
  html += `
  <div class="d-flex justify-content-center m-3">
    <h3>RGB: 
    <div class= "rgb-content" id="rgb-content"></div>
    </h3>
  </div>
  <div class="d-flex justify-content-center m-3">
    <h3>My Color: </h3>
  </div>
  <div class="d-flex justify-content-center m-3">
    <div class="color-block" id="color-block"></div>
  </div>
  `;

  Elements.root.innerHTML = html;

  colorDataDoc = attachRealtimeListener(Constants.COLLECTION,
    Constants.COLOR_DATA, colorDataListener); 
}

function colorDataListener(doc) {
  const colorData = doc.data()
  if (colorData['redVal']>-1) {
    red = colorData['redVal']
  }
  if (colorData['greenVal']>-1) {
    green = colorData['greenVal']
  }
  if (colorData['blueVal']>-1) {
    blue = colorData['blueVal']
  }
  newColor = "rgb(" + red + "," + green + "," + blue + ")"
  document.getElementById("color-block").style.backgroundColor = newColor;
  updateRgbData({ rgbVal: newColor });
  console.log(newColor)
  document.getElementById("rgb-content").innerHTML = newColor;
}

