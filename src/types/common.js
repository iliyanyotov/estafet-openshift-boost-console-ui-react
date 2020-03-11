import PropTypes from 'prop-types';

export const actionsType = {
  build: PropTypes.bool,
  test: PropTypes.bool,
  promote: PropTypes.bool,
  goLive: PropTypes.bool,
  backOut: PropTypes.bool,
};

export const environmentType = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  updatedDate: PropTypes.string.isRequired,
  actions: PropTypes.shape(actionsType).isRequired,
};
