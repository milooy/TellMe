// firebase real-time db
import firebase from 'firebase';

function saveEndpointToFirebase(endpoint, email) {
	if (!email) {
		return Promise.reject({ message: 'login account is not included' });
	}
	const id = email.split('@').shift();
	return firebase
		.database()
		.ref(`users/${id}`)
		.set({ endpoint, time: getCurrentTime() });
}

function removeDeviceKeyInFirebase() {
	// Firebase 의 DB data 삭제 API 를 이용하여
	// Disable 한 기기의 키 값을 제거해보세요.
}

async function getUserList() {
	const snapshot = await firebase
		.database()
		.ref('/users/')
		.once('value');
	return snapshot.val();
}

function getCurrentTime() {
	return new Date().toLocaleString();
}

export { saveEndpointToFirebase, removeDeviceKeyInFirebase, getUserList };
