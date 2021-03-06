import { takeLatest } from 'redux-saga/effects'

import apiCall from 'store/api/call'
import {
  ADMIN_GET_USER_LIST,
  ADMIN_BLOCK_UNBLOCK_USER,
  ADMIN_GET_USER_HISTORY,
} from 'store/constants'


const getUserList = apiCall({
  type: ADMIN_GET_USER_LIST,
  method: 'get',
  path: ({ payload }) => `admin/users/?page=${payload.page}`,
})

const blockUnblockUser = apiCall({
  type: ADMIN_BLOCK_UNBLOCK_USER,
  method: 'put',
  path: ({ payload }) => `admin/users/${payload.id}/block/`,
})

const getUserHistory = apiCall({
  type: ADMIN_GET_USER_HISTORY,
  method: 'get',
  path: ({ payload }) => `admin/users/${payload.id}/history/?page=${payload.page}`,
})

export default function* rootSaga () {
  yield takeLatest(ADMIN_GET_USER_LIST, getUserList)
  yield takeLatest(ADMIN_BLOCK_UNBLOCK_USER, blockUnblockUser)
  yield takeLatest(ADMIN_GET_USER_HISTORY, getUserHistory)
}
