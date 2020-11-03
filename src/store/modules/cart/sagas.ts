import { AxiosResponse } from 'axios';
import { all, takeLatest, select, call, put } from 'redux-saga/effects';

//Product imports

import { IState } from '../..';
import api from '../../../services/api';
import { addProductToCartFailure, addProductToCartRequest, addProductToCartSuccess } from './actions';

// Guarantee type of action on function
type checkProductStockRequest = ReturnType<typeof addProductToCartRequest>;

// Custom response for the specific route
interface IStockResponse {
  id: number;
  quantity: number;
}

function* checkProductStock({ payload }: checkProductStockRequest) {
  const { product } = payload;
  // ?? means that if conditional chaining returns undefined, it will be the value
  // after the ??, almost like ternary operator

  // NOTE: Could be using ||, but the ?? is a typescript pattern
  const currentQuantity: number = yield select(({ cart }: IState) => {
    return cart.items.find(
      item => item.product.id === product.id)?.quantity ?? 0
  })

  // call = saga's api request
  const { data: availableStockResponse }: AxiosResponse<IStockResponse> = yield call(
    api.get, `stock/${product.id}`
  );

  if (availableStockResponse.quantity > currentQuantity) {
    // put = dispatch
    yield put(addProductToCartSuccess(product))
  } else {
    yield put(addProductToCartFailure(product.id))
  }
}

export default all([
  // Which action would be listened
  takeLatest('ADD_PRODUCT_TO_CART_REQUEST', checkProductStock)
])