/**
 * Created by chenag on 2016/9/14.
 */
document.write('hello webpack ---main111111。');
// 引入scss，编译后，在页面中以内部样式<style></style>存在
// 编译后的css文件名字，被修改为js文件名字，因此建议把css文字修改为和js文件名字一致，方便html页面内部样式link引入
require('../../css/scss.scss');