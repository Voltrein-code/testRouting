import modalOverlayReducer, { clickOpen, clickOrderList } from "./modalOverlaySlice";


const initialState = {
  setClickOrderList: false,
  setIsOpen: false,
};

describe("modalOverlayReducer", () => {
  it('Тест начальное значние стэйта', () => {
    expect(modalOverlayReducer(undefined, {})).toEqual(initialState)
  });

  it('Тест setClickOrderList', () => {
    const paylode = true
    expect(modalOverlayReducer(initialState, clickOrderList(paylode))).toEqual({
      ...initialState,
      setClickOrderList: paylode
    })
  });

  it('Тест setClickOrderList', () => {
    const paylode = true
    expect(modalOverlayReducer(initialState, clickOpen(paylode))).toEqual({
      ...initialState,
      setIsOpen: paylode
    })
  });

})

