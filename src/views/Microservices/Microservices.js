import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import DataFallback from '../../components/DataFallback';
import ErrorFallback from '../../components/ErrorFallback';
import LastUpdated from '../../components/LastUpdated';
import Loader from '../../components/Loader';
import { environmentType } from '../../types/microservices';
import * as Styles from './Microservices.styled';
import MicroservicesApplications from './MicroservicesApplications';
import MicroservicesControls from './MicroservicesControls';
import { startPollingMicroservices, stopPollingMicroservices } from './state/actions';

const mapStateToProps = (state) => ({
  data: state.microservices.data,
  loading: state.microservices.loading,
  error: state.microservices.error,
  polling: state.microservices.polling,
});

const mapDispatchToProps = (dispatch) => ({
  startPollingMicroservices: () => dispatch(startPollingMicroservices()),
  stopPollingMicroservices: () => dispatch(stopPollingMicroservices()),
});

@connect(mapStateToProps, mapDispatchToProps)
class Microservices extends React.PureComponent {
  componentDidMount() {
    this.props.startPollingMicroservices();
  }

  componentWillUnmount() {
    this.props.stopPollingMicroservices();
  }

  render() {
    const { data, loading, error, polling } = this.props;
    const { count, lastUpdated } = polling;

    if (error) return <ErrorFallback />;
    if (loading && !count) return <Loader />;
    if (data && !data.length) return <DataFallback title='No services available!' />;

    return (
      <Styles.Wrapper>
        <Helmet title='Microservices' />
        <MicroservicesControls data={data} />
        {lastUpdated && <LastUpdated date={lastUpdated} loading={loading} />}
        <MicroservicesApplications data={data} />
      </Styles.Wrapper>
    );
  }
}

Microservices.propTypes = {
  data: PropTypes.arrayOf(environmentType),
  loading: PropTypes.bool,
  error: PropTypes.bool,
  polling: PropTypes.shape({
    count: PropTypes.number,
    lastUpdated: PropTypes.instanceOf(Date),
  }),
  startPollingMicroservices: PropTypes.func,
  stopPollingMicroservices: PropTypes.func,
};

export default Microservices;
