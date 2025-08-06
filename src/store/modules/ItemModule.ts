import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/modules/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface Item {
  id: number;
  item_code: string;
  item_name: string;
  item_group_id: number;
  uom_id: number;
  selling_price: number;
  valuation_rate: number;
  opening_stock_qty: number;
  is_fixed_asset: boolean;
  warehouse_id: number;
  item_status: number;
  user_id: number;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
}

@Module
export default class ItemModule extends VuexModule {
  items = [{}];
  itemErrors = [];
  lookupData = {};

  /**
   * Get current all items
   * @returns Item
   */
  get getItems() {
    return this.items;
  }

  /**
   * Get current all items
   * @returns lookupData
   */
  get loadLookupData() {
    return this.lookupData;
  }

  /**
   * Get items errors
   * @returns array
   */
  get getItemsErrors(): Array<string> {
    return this.itemErrors;
  }

  @Mutation
  [Mutations.SET_ITEM_ERROR](error) {
    this.itemErrors = error;
  }

  @Mutation
  [Mutations.SET_ITEMS](items) {
    this.items = items;
  }

  @Mutation
  [Mutations.SET_LOOKUP_DATA](lookupData) {
    this.lookupData = lookupData;
  }

  @Mutation
  [Mutations.SET_SINGLE_ITEM](item) {
    this.items.forEach((elem) => {
      if (elem["id"] == item.id) {
        this.items.splice(this.items.indexOf(elem), 1);
      }
    });
    this.items.unshift(item);
  }

  // Get items from api call

  @Action
  [Actions.GET_ITEMS]() {
    return new Promise<void>((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("api/item")
        .then(({ data }) => {
          // console.log(data);
          this.context.commit(Mutations.SET_ITEMS, data.data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ITEM_ERROR, response.data.errors);
          reject();
        });
    });
  }

  // Create Item

  @Action
  [Actions.ADD_ITEM](payload) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("api/item", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SINGLE_ITEM, data.data["0"]);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ITEM_ERROR, response.data.errors);
          reject();
        });
    });
  }

  // Delete Item

  @Action
  [Actions.DELETE_ITEM](slug) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.delete("api/item" + slug)
        .then(({ data }) => {
          // console.log(data);
          // this.context.commit(Mutations.SET_SINGLE_ITEM, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ITEM_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.CLEAR_ERROR]() {
    this.context.commit(Mutations.SET_ERROR, []);
    this.context.commit(Mutations.SET_ITEM_ERROR, []);
  }

  // UPDATE ITEM

  @Action
  [Actions.UPDATE_ITEM](payload) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.put("api/item" + payload.id, payload.data)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_SINGLE_ITEM, data.data["0"]);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ITEM_ERROR, response.data.errors);
          reject();
        });
    });
  }

  // LOOKUP DATA

  @Action
  [Actions.GET_LOOKUP_DATA]() {
    return new Promise<void>((resolve, reject) => {
      ApiService.setHeader();
      ApiService.get("api/lookupDate")
        .then(({ data }) => {
          // console.log(data);
          this.context.commit(Mutations.SET_LOOKUP_DATA, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ITEM_ERROR, response.data.errors);
          reject();
        });
    });
  }
}
