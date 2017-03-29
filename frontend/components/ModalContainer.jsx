import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { isLoading, appErrors } from '../redux/selectors';
import { errorProps } from '../services/content';

import LoadingIndicator from './Overlays/Loading';
import Modal from './Overlays/Modal';

const getErrorProps = (errors) => {
  if (! errors.length) {
    return {};
  }

  // In the event of multiple errors, render only the first one
  const err = errors[0];

  return {
    ...errorProps(err.type),
    errorMessage: err.error && err.error.message,
    retryAction: err.retryAction,
  };
};

const ModalContainer = (props) => {
  const {
    errorTitle,
    errorMessage,
    retryAction,
    cancelAction,
    ...errorModalProps
  } = getErrorProps(props.errors);
  const onCancel = cancelAction ? () => props.dispatch(cancelAction) : null;
  return (
    <div>
      {/* Render Loading overlay, if applicable */}
      {props.isLoading ? <LoadingIndicator /> : null}

      {/* Render API Error overlay, if applicable */}
      {props.errors.length ? (
        <Modal
          {...errorModalProps}
          onCancel={onCancel}
          onConfirm={() => props.dispatch(retryAction)}
        >
          <h2>{errorTitle}</h2>
          {errorMessage ? (<p>{errorMessage}</p>) : null}
        </Modal>
      ) : null}
    </div>
  );
};


ModalContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.shape({
    error: PropTypes.instanceOf(Error).isRequired,
    retryAction: PropTypes.shape({
      type: PropTypes.string.isRequired,
      payload: PropTypes.any,
    }),
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  errors: appErrors(state),
  isLoading: isLoading(state),
});

export default connect(mapStateToProps)(ModalContainer);
