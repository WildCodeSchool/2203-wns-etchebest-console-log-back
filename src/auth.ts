import { AuthChecker } from 'type-graphql';

const customAuthChecker: AuthChecker<any> = () => false; // or false if access is denied

export default customAuthChecker;
