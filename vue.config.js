module.exports = {
  publicPath:
    process.env.NODE_ENV === "production" ? "/vue-demo-group/dist" : "/",
  devServer: {
    port: 3007,
  },
};
