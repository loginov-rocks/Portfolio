import { connect } from 'react-redux';

import State from 'State';

import { Props } from './Profile';

const mapStateToProps = ({ firebase: { firebase: { profile } } }: State): Props => ({ profile });

export default connect<Props, {}, {}, State>(mapStateToProps);
