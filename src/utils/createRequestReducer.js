const initialState = {
  data: [],
  error: false,
  loading: true,
  polling: {
    enabled: true,
    count: 0,
    lastUpdated: undefined,
  },
  search: '',
};

export default (stateActions) => {
  const { start, stop, pending, success, failure, search } = stateActions;

  return (state = initialState, action = {}) => {
    const { type, payload } = action;

    switch (type) {
      case start:
        return {
          ...state,
          polling: {
            ...state.polling,
            enabled: true,
          },
        };

      case stop:
        return {
          ...state,
          polling: {
            ...state.polling,
            enabled: false,
          },
        };

      case pending:
        return {
          ...state,
          error: false,
          loading: true,
        };

      case success:
        return {
          ...state,
          data: payload,
          error: false,
          loading: false,
          polling: {
            ...state.polling,
            count: state.polling.count + 1,
            lastUpdated: new Date(),
          },
        };

      case failure:
        return {
          ...state,
          // data: payload.error,
          error: true,
          loading: false,
        };

      case search:
        return {
          ...state,
          search: payload.search,
        };

      default:
        return state;
    }
  };
};
