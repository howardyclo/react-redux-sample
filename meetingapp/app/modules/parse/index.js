import Parse from 'parse';
import Config from './config';

Parse.initialize(Config.PARSE_APP_ID, Config.PARSE_JS_KEY);

export default Parse;