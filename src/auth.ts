import { AuthChecker } from 'type-graphql';
// eslint-disable-next-line import/no-cycle
import { Context } from './server';

const customAuthChecker: AuthChecker<Context> = ({ context: { user } }) =>
  !!user; // or false if access is denied

export default customAuthChecker;
