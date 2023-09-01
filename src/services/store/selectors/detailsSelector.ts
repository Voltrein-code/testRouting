export const detailsSelector = (store: { orderDetails: { order: any; }; }) => {
  return store.orderDetails.order;
};
