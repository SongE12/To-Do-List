export default {
  install(app) {
    app.config.globalProperties.$heropy = (msg = 'Heropy') => {
      return `Hello ${msg}!!`
    }
  }
}
