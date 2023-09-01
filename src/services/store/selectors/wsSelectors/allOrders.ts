export const userserStatusAuth = (state: { user: { isAuthChecked: boolean; }; }) => state.user.isAuthChecked as boolean; 
export const allOrdersInf = (state: any) => state.wsData.wsData.data; 
