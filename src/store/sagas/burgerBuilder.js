import { put } from "redux-saga/effects";
import * as actions from "../actions";
import axios from "../../axios-order";

export function* initIngredientsSaga(action) {
  try {
    const response = yield axios.get(
      "https://react-my-burger-f3244.firebaseio.com/ingredients.json"
    );
    yield put(actions.setIngredients(response.data));
  } catch {
    yield put(actions.fetchIngredientsFailed());
  }
}
