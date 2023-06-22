import { createReducer, on } from "@ngrx/store";
import {
  createStockInfoAPISuccess,
  deleteStockInfoAPISuccess,
  refreshCurrentStockPricesAPISuccess,
  stockInfosFetchAPISuccess,
  updateStockInfoAPISuccess
} from "./stock-info.action";
import { StockInfoStoreModel } from "./stock-info-store.model";
import { StockInfoDto } from "../../models/stock-info-dto.model";
import { GroupedStockInfo } from "src/app/models/grouped-stock-info.model";
import { CurrentStockPrice } from "src/app/models/current-stock-price.model";

export const initialState: Readonly<StockInfoStoreModel> = {
  stockInfos: [],
  groupedStockInfos: [],
  currentStockPrices: [],
  totalPurchasePrice: 0,
  totalPriceForNow: 0
};

export const stockInfoReducer = createReducer(
  initialState,
  on(stockInfosFetchAPISuccess, (state, { allStockInfos }) => {
    let newState = {
      ...state,
      stockInfos: allStockInfos,
      groupedStockInfos: getGroupStockInfos(allStockInfos, state.currentStockPrices),
      totalPurchasePrice: getTotalPurchaseSum(allStockInfos)
    }

    return newState;
  }),
  on(createStockInfoAPISuccess, (state, { newStockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    newState.stockInfos.push(newStockInfo);
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos);
    newState.groupedStockInfos = getGroupStockInfos(newState.stockInfos, state.currentStockPrices);
    newState.totalPriceForNow = getTotalSumNow(newState.groupedStockInfos);

    return newState;
  }),
  on(updateStockInfoAPISuccess, (state, { id, stockInfo }) => {
    let newState = { ...state, stockInfos: [...state.stockInfos] };
    const stockInfoIndex = newState.stockInfos.findIndex(x => x.id === id);
    newState.stockInfos[stockInfoIndex] = { ...stockInfo, id };
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos);
    newState.groupedStockInfos = getGroupStockInfos(newState.stockInfos, state.currentStockPrices);
    newState.totalPriceForNow = getTotalSumNow(newState.groupedStockInfos);

    return newState;
  }),
  on(deleteStockInfoAPISuccess, (state, { id }) => {
    const newStockInfos = state.stockInfos.filter(x => x.id !== id);
    let newState = { ...state, stockInfos: newStockInfos };
    newState.totalPurchasePrice = getTotalPurchaseSum(newState.stockInfos)
    newState.groupedStockInfos = getGroupStockInfos(newState.stockInfos, state.currentStockPrices);
    newState.totalPriceForNow = getTotalSumNow(newState.groupedStockInfos);

    return newState;
  }),
  on(refreshCurrentStockPricesAPISuccess, (state, { currentStockPrices }) => {
    let newState = {
      ...state,
      stockInfos: [...state.stockInfos],
      currentStockPrices: currentStockPrices
    };

    newState.groupedStockInfos = [...getGroupStockInfos(newState.stockInfos, currentStockPrices)];
    newState.totalPriceForNow = getTotalSumNow(newState.groupedStockInfos);

    return newState;
  })
);

function getTotalPurchaseSum(stockInfos: StockInfoDto[]) {
  return stockInfos.reduce(
    (sum, current) => sum + (current.purchasePrice * current.quantity),
    0
  );
}

function getTotalSumNow(groupedStockInfo: GroupedStockInfo[]) {
  return groupedStockInfo.reduce(
    (sum, current) => sum + (current.priceNow * current.quantity),
    0
  );
}

function getGroupStockInfos(stockInfos: StockInfoDto[], currentStockPrices: CurrentStockPrice[]) {
  let helper: any = {};
  let groupedStockInfos = stockInfos.reduce<GroupedStockInfo[]>(function (r, o) {
    var key = o.tickerName;
    if (!helper[key]) {
      helper[key] = Object.assign({ totalPrice: 0, quantity: 0 }, o);
      r.push(helper[key]);
    } else {
      helper[key].quantity += o.quantity;
    }

    helper[key].totalPrice += o.quantity * o.purchasePrice;

    return r;
  }, []);

  let newGroupedStockInfos: GroupedStockInfo[] = [];
  for (let groupedStockInfo of groupedStockInfos) {
    const currentPrice = currentStockPrices.find(x =>
      x.tickerName.toLocaleLowerCase() === groupedStockInfo.tickerName.toLocaleLowerCase()
    )?.price || 0;

    newGroupedStockInfos.push({
      priceNow: currentPrice,
      quantity: groupedStockInfo.quantity,
      tickerName: groupedStockInfo.tickerName,
      totalPrice: groupedStockInfo.totalPrice,
    } as GroupedStockInfo);
  }

  newGroupedStockInfos = newGroupedStockInfos
    .sort((a, b) =>
      (a.tickerName > b.tickerName) ? 1 : ((b.tickerName > a.tickerName) ? -1 : 0)
    );

  return newGroupedStockInfos;
}