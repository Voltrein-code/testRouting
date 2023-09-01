import { createAction } from '@reduxjs/toolkit';
import { TWSMessage } from '../../../../utils/live-table';

export const connect = createAction<string, 'CONNECT'>('CONNECT');
export const disconnect = createAction('DISCONNECT');
export const wsConnecting = createAction('WS_CONNECTING');
export const wsOpen = createAction('WS_OPEN');
export const wsClose = createAction('WS_CLOSE');
export const wsMessage = createAction<TWSMessage, 'WS_MESSAGE'>('WS_MESSAGE');
export const wsError = createAction<string, 'WS_ERROR'>('WS_ERROR');

export type TLiveTableActions = ReturnType<typeof connect>
                                | ReturnType<typeof disconnect> 
                                | ReturnType<typeof wsConnecting> 
                                | ReturnType<typeof wsOpen> 
                                | ReturnType<typeof wsClose> 
                                | ReturnType<typeof wsMessage> 
                                | ReturnType<typeof wsError>;
