import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, DispatchFunc, RootState } from '../../utils/types'
import { useRef } from 'react';
import { wsConnecting, wsMessage } from '../store/reducers/socket/actions';


// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch: DispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


/*
export const useWebSocket = () => {
  const webSocket = useRef<WebSocket | null>(null);
  const dispatch = useAppDispatch();
  
  const connect = (url: string) => {
    webSocket.current = new WebSocket(url);

    webSocket.current.onopen = (e: Event) => {
      dispatch(wsConnecting());
    };

    webSocket.current.onmessage = (e: MessageEvent<string>) => {
      const message = JSON.parse(e.data);
      if (message.success) {
        dispatch(wsMessage(message));
      } else {
      }

    };

    webSocket.current.onerror = (e: Event) => {
      dispatch(wsConnecting(false));
      console.log(e);
    };

    webSocket.current.onclose = (e: CloseEvent) => {
      if(e.wasClean) {
        dispatch(wsActions.setWSMessage(null));
      }
      dispatch(wsActions.setWsConnected(false));
    };
  };

  const closeWs = () => {
    ws.current?.close();
  };

  return { connect, closeWs };
}; */