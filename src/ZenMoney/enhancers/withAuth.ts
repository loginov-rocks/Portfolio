import { connect } from 'react-redux';
import { branch, compose, mapProps, renderComponent } from 'recompose';

const mapStateToProps = ({ zenMoney: { isAuthorized } }) => ({ isAuthorized });

export default (notAuthorizedComponent) => compose(
  connect(mapStateToProps),
  branch(
    ({ isAuthorized }) => !isAuthorized,
    renderComponent(notAuthorizedComponent),
  ),
  mapProps(({ isAuthorized, ...props }) => props),
);
