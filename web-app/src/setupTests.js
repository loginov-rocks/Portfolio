/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme';
// TODO: Get back to enzyme-adapter-react-16 when upgraded to support React v17.
//  @see https://github.com/enzymejs/enzyme/issues/2429
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });
