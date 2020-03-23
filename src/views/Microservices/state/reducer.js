import ACTIONS from './actions';

const initialState = {
  data: [],
  error: false,
  loading: true,
  polling: {
    count: 0,
    lastUpdated: undefined,
  },
  search: '',
};

export default (state = initialState, action = {}) => {
  const { type, payload = {} } = action;

  switch (type) {
    case ACTIONS.PENDING:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case ACTIONS.SUCCESS:
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

    case ACTIONS.FAILURE:
      return {
        ...state,
        // data: payload.error,
        error: true,
        loading: false,
      };

    case ACTIONS.SEARCH:
      return {
        ...state,
        search: payload.search,
      };

    default:
      return state;
  }
};
