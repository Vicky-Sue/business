export default ({store}) => {
    window.onNuxtReady(() => {
      createPersistedState({
          key: 'store',
      })(store)
    })
  }