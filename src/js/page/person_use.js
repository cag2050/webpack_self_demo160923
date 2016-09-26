/**
 * Created by cag on 2016/9/23.
 */
import Person from './Person.jsx';

//import Person from './Person.js';
// 如果class是js后缀，编译时报如下错误，未知原因：
/*
ERROR in ./src/js/page/Person_use.js
Module not found: Error: a dependency to an entry
point is not allowed
@ ./src/js/page/Person_use.js 3:14-36
*/

let p = new Person('张三', 20);
document.write(p.say());