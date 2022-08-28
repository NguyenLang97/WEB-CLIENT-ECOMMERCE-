import { call, take, put, all } from 'redux-saga/effects'
import { AUTH_START, authSuccess, authFail, LOGOUT_START, logoutSuccess, logoutFail } from '../auth/auth.action'

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth, db } from '../../firebase/firebase_config'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

async function registerUser({ email, password, firstName, lastName }) {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        await setDoc(doc(db, 'user', res.user.uid), {
            email,
            password,
            firstName,
            lastName,
            timestamp: serverTimestamp(),
        })
        return res
    } catch (error) {
        console.log('error is :', error.message)
    }
}

function loginUser({ email, password }) {
    return signInWithEmailAndPassword(auth, email, password)
        .then((user) => user)
        .catch((error) => {
            console.log('error :', error.message)
        })
}

function logoutUser() {
    return signOut(auth)
        .then(() => {})
        .catch((error) => {
            console.log('error :', error.message)
        })
}

function* authenticate({ email, password, isRegister, firstName, lastName }) {
    let data
    try {
        if (isRegister) {
            console.log('isRegister :', isRegister)
            data = yield call(registerUser, { email, password, firstName, lastName })
            console.log('data register :', data.user.uid)
        } else {
            data = yield call(loginUser, { email, password })
            console.log('data login123 :', data.user)
        }
        yield put(authSuccess(data.user.uid))
        return data.user.uid
    } catch (error) {
        yield put(authFail(error.message))
        console.log('error.message', error.message)
    }
}
function* logout() {
    try {
        yield call(logoutUser)
        console.log('logout - start')
        yield put(logoutSuccess())
    } catch (error) {
        yield put(logoutFail())
    }
}
function* authFlow() {
    while (true) {
        const { payload } = yield take(AUTH_START)
        console.log('isRegister :: ', payload.isRegister)
        const uid = yield call(authenticate, payload)
        console.log('uid :', uid)
        if (uid) {
            yield take(LOGOUT_START)
            yield call(logout)
        }
    }
}
function* Saga() {
    yield all([authFlow()])
}

export default Saga
