import send from "@/util/send";

export default {
  _default: {
    // 登录

    sign(data) {
      return send({ url: "/sign", method: "post", data });
    },

    sendCode(data) {
      return send({ url: "/", method: "post", data });
    }
  },

  spm: {
    getOrders(params) {
      return send({ url: "/list/get", method: "get", params });
    },

    test(params) {
      return send({ url: "", method: "put" });
    }
  }
};
