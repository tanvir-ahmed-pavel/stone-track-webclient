import ApiService from "@/core/services/ApiService";
import JwtService from "@/core/services/JwtService";
import { Actions, Mutations } from "@/store/modules/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface User {
  name: string;
  id: string;
  surname: string;
  email: string;
  password: string;
  token: string;
}

export interface UserAuthInfo {
  errors: Array<string>;
  user: User;
  isAuthenticated: boolean;
  serverStatus: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  errors = [];
  user = {} as User;
  isAuthenticated = !!JwtService.getToken();
  serverStatus!: true;

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Get current user object
   * @returns User
   */
  get getServerStatus(): boolean {
    return this.serverStatus;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors(): Array<string> {
    return this.errors;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    this.errors = error;
  }

  @Mutation
  [Mutations.SET_AUTH](data) {
    this.isAuthenticated = true;
    this.user = data.user;
    this.errors = [];
    JwtService.saveToken(data.token);
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.SET_PASSWORD](password) {
    this.user.password = password;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.errors = [];
    JwtService.destroyToken();
  }

  @Mutation
  [Mutations.SET_SERVER_STATUS](status) {
    this.serverStatus = status;
  }

  @Action
  [Actions.LOGIN](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("api/login", credentials)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.LOGOUT]() {
    return new Promise<void>((resolve, reject) => {
      ApiService.setHeader();
      ApiService.post("api/logout", {})
        .then(() => {
          this.context.commit(Mutations.PURGE_AUTH);
          resolve();
        })
        .catch(() => {
          this.context.commit(Mutations.SET_ERROR, { message: "Server Error" });
          reject();
        });
    });
  }

  @Action
  [Actions.CLEAR_ERROR]() {
    this.context.commit(Mutations.SET_ERROR, []);
  }

  @Action
  [Actions.REGISTER](credentials) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("api/register", credentials)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.FORGOT_PASSWORD](payload) {
    return new Promise<void>((resolve, reject) => {
      ApiService.post("forgot_password", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_AUTH, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }

  @Action
  [Actions.VERIFY_AUTH]() {
    if (JwtService.getToken()) {
      // For Future Reference

      ApiService.setHeader();
      ApiService.get("api/user")
        .then(() => {
          this.context.commit(Mutations.SET_SERVER_STATUS, true);
          return;
        })
        .catch(({ response }) => {
          if (!response) {
            console.log("no connection");
            this.context.commit(Mutations.SET_SERVER_STATUS, false);
          } else {
            this.context.commit(Mutations.SET_ERROR, response.data);
            this.context.commit(Mutations.SET_SERVER_STATUS, true);
            // If the server responses with error code between 400-499 then current token will be deleted / force logged out
            if (response.status >= 400 && response.status < 500) {
              this.context.commit(Mutations.PURGE_AUTH);
            }
          }
        });
    } else {
      this.context.commit(Mutations.PURGE_AUTH);
    }
  }

  @Action
  [Actions.UPDATE_USER](payload) {
    ApiService.setHeader();
    return new Promise<void>((resolve, reject) => {
      ApiService.post("update_user", payload)
        .then(({ data }) => {
          this.context.commit(Mutations.SET_USER, data);
          resolve();
        })
        .catch(({ response }) => {
          this.context.commit(Mutations.SET_ERROR, response.data.errors);
          reject();
        });
    });
  }
}
