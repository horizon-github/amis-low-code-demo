import { getAuth, setAuth, removeAuth } from "@/utils/auth";
import { login } from "@/api/user";

const auth = getAuth()

const getDefaultState = () => {
  return {
    jwt: auth && auth.jwt,
    jwtIat: auth && auth.jwtIat,
    jwtExp: auth && auth.jwtExp,
    userId: auth && auth.userId,
    brandId: auth && auth.brandId,
    username: auth && auth.username,
    nickname: auth && auth.nickname,
    headImg: auth && auth.headImg,
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_JWT: (state, jwt) => {
    state.jwt = jwt
  },
  SET_JWTIAT: (state, jwtIat) => {
    state.jwtIat = jwtIat
  },
  SET_JWTEXP: (state, jwtExp) => {
    state.jwtExp = jwtExp
  },
  SET_USERID: (state, userId) => {
    state.userId = userId
  },
  SET_BRANDID: (state, brandId) => {
    state.brandId = brandId
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_NICKNAME: (state, nickname) => {
    state.nickname = nickname
  },
  SET_HEADIMG: (state, headImg) => {
    state.headImg = headImg
  },
}

const actions = {
    signIn({ commit }, userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        login({ userName: username.trim(), password: password })
          .then((response) => {
            const { data } = response;
            commit("SET_JWT", data.jwt.jwt);
            commit("SET_JWTIAT", data.jwt.iat);
            commit("SET_JWTEXP", data.jwt.exp);
            commit("SET_USERID", data.systemUser.id);
            commit("SET_BRANDID", data.systemUser.brandId);
            commit("SET_USERNAME", data.systemUser.username);
            commit("SET_NICKNAME", data.systemUser.nickname);
            commit("SET_HEADIMG", data.systemUser.headImg);
            setAuth({
              jwt: data.jwt.jwt,
              jwtIat: data.jwt.iat,
              jwtExp: data.jwt.exp,
              userId: data.systemUser.id,
              brandId: data.systemUser.brandId,
              username: data.systemUser.username,
              nickname: data.systemUser.nickname,
              headImg: data.systemUser.headImg,
            });
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    signOut({ commit }) {
      removeAuth()
      commit('RESET_STATE')
    }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}