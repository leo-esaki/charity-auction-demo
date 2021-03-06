import Immutable from 'immutable'
import { createAction, handleActions } from 'redux-actions'

import { requestSuccess, requestFail } from 'store/api/request'
import {
  ADMIN_GET_DONOR_LIST,
  ADMIN_CREATE_DONOR,
  ADMIN_GET_DONOR_DETAIL,
  ADMIN_UPDATE_DONOR_DETAIL,
  ADMIN_DELETE_DONOR,
  ADMIN_GET_DONOR_PRODUCT_LIST,
  ADMIN_UPLOAD_DONOR_MEDIUM,
  ADMIN_DELETE_DONOR_MEDIUM,
  ADMIN_REORDER_DONOR_MEDIUM,
} from 'store/constants'
import { replaceListItem } from 'utils/list'


/* Initial state */

const initialState = Immutable.fromJS({
  /* Donor */
  donorList: [],
  donorListLoaded: false,
  donorDetail: null,
  donorProductList: [],
  donorProductListLoaded: false,
  reorderedTemporaryDonorMedia: null,
})

/* Action creators */

export const getDonorList = createAction(ADMIN_GET_DONOR_LIST)
export const createDonor = createAction(ADMIN_CREATE_DONOR)
export const getDonorDetail = createAction(ADMIN_GET_DONOR_DETAIL)
export const updateDonorDetail = createAction(ADMIN_UPDATE_DONOR_DETAIL)
export const deleteDonor = createAction(ADMIN_DELETE_DONOR)
export const getDonorProductList = createAction(ADMIN_GET_DONOR_PRODUCT_LIST)
export const uploadDonorMedium = createAction(ADMIN_UPLOAD_DONOR_MEDIUM)
export const deleteDonorMedium = createAction(ADMIN_DELETE_DONOR_MEDIUM)
export const reorderDonorMedia = createAction(ADMIN_REORDER_DONOR_MEDIUM)

/* Reducer */

export default handleActions({

  /* Get donor list actions */

  [requestSuccess(ADMIN_GET_DONOR_LIST)]: (state, { payload }) => state.withMutations(map => {
    map.set('donorList', Immutable.fromJS(payload))
    map.set('donorListLoaded', true)
  }),

  [requestFail(ADMIN_GET_DONOR_LIST)]: (state, { payload }) => state.withMutations(map => {
    map.set('donorList', Immutable.List())
    map.set('donorListLoaded', false)
  }),

  /* Get donor detail actions */

  [ADMIN_GET_DONOR_DETAIL]: (state, { payload }) => state.withMutations(map => {
    map.set('donorDetail', null)
  }),

  [requestSuccess(ADMIN_GET_DONOR_DETAIL)]: (state, { payload }) => state.withMutations(map => {
    map.set('donorDetail', Immutable.fromJS(payload))
  }),

  /* Create donor detail actions */

  [requestSuccess(ADMIN_CREATE_DONOR)]: (state, { payload }) => state.withMutations(map => {
    const donorList = state.get('donorList')
    map.set('donorList', donorList.push(Immutable.fromJS(payload)))
  }),

  /* Update donor detail actions */

  [requestSuccess(ADMIN_UPDATE_DONOR_DETAIL)]: (state, { payload }) => state.withMutations(map => {
    map.set('donorDetail', Immutable.fromJS(payload))
    replaceListItem(payload, map, 'donorList')
  }),

  /* Get donor product list actions */

  [ADMIN_GET_DONOR_PRODUCT_LIST]: (state, { payload }) => state.withMutations(map => {
    map.set('donorProductList', Immutable.List())
  }),

  [requestSuccess(ADMIN_GET_DONOR_PRODUCT_LIST)]: (state, { payload }) => state.withMutations(map => {
    map.set('donorProductList', Immutable.fromJS(payload))
  }),

  /* Upload donor medium actions */

  [requestSuccess(ADMIN_UPLOAD_DONOR_MEDIUM)]: (state, { payload }) => state.withMutations(map => {
    const donorMedia = state.getIn(['donorDetail', 'media'])
    map.setIn(['donorDetail', 'media'], donorMedia.push(Immutable.fromJS(payload)))
  }),

  /* Delete donor medium actions */

  [ADMIN_DELETE_DONOR_MEDIUM]: (state, { payload }) => state.withMutations(map => {
    const donorMedia = state.getIn(['donorDetail', 'media'])
    const index = donorMedia.findIndex(dm => dm.get('pk') === payload.dmId)
    if (index >= 0) {
      map.setIn(['donorDetail', 'media'], donorMedia.delete(index))
    }
  }),

  /* Reorder donor medium actions */

  [ADMIN_REORDER_DONOR_MEDIUM]: (state, { payload }) => state.withMutations(map => {
    const { newMedia } = payload
    map.set('reorderedTemporaryDonorMedia', newMedia)
  }),

  [requestSuccess(ADMIN_REORDER_DONOR_MEDIUM)]: (state, { payload }) => state.withMutations(map => {
    map.setIn(['donorDetail', 'media'], Immutable.fromJS(payload))
    map.set('reorderedTemporaryDonorMedia', null)
  }),

  [requestFail(ADMIN_REORDER_DONOR_MEDIUM)]: (state, { payload }) => state.withMutations(map => {
    map.set('reorderedTemporaryDonorMedia', null)
  }),

}, initialState)
