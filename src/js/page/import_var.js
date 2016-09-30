/**
 * Created by chenanguo on 2016/9/30.
 */
// webpack编译es6 module报错，尚不知原因。export文件后缀修改为.jsx,就能编译通过
// import {name,age} from "./export_var.js";
import {name, age} from "./export_var.jsx";
console.log("name = " + name);
console.log("age = " + age);