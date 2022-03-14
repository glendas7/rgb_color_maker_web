import {
	getFirestore, onSnapshot, doc, setDoc, updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-firestore.js"

import * as Constants from '../model/constants.js'

const db = getFirestore()


export async function initFirestoreDocs() {
	await setDoc(doc(db, Constants.COLLECTION, Constants.COLOR_DATA), Constants.colorData)
	await setDoc(doc(db, Constants.COLLECTION, Constants.RGB_DATA), Constants.rgbData)

}

export function attachRealtimeListener(collection, document, callback) {
	const unsubscribeListener = onSnapshot(doc(db, collection, document), callback);
	return unsubscribeListener;
}

export async function updateColorData(update) {
	const docRef = doc(db, Constants.COLLECTION, Constants.COLOR_DATA);
	await updateDoc(docRef, update);
}

export async function updateRgbData(update) {
	const docRef = doc(db, Constants.COLLECTION, Constants.RGB_DATA);
	await updateDoc(docRef, update);
}