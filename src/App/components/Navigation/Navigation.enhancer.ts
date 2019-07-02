import { connect } from 'react-redux';

import State from 'State';

import { Props } from './Navigation';

const mapStateToProps = ({ app: { route } }: State): Props => ({ route });

export default connect<Props, {}, {}, State>(mapStateToProps);
