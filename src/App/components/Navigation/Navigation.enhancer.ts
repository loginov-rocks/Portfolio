import { connect } from 'react-redux';

import { State } from '../../../reducer';

export interface StateProps {
  route: string;
}

const mapStateToProps = ({ app: { route } }: State): StateProps => ({ route });

export default connect<StateProps, {}, {}, State>(mapStateToProps);
