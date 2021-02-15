import { Action } from "@ngrx/store/src";

export const SET_AUTHENTICATED = '[AUTH] Set authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] Set unathenticated';

export class SetAuth implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauth implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AuthActions = SetAuth | SetUnauth;

