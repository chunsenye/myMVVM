// 了解一下MVVM的原理
// 类名YCS ES6
class YCS{
    // 构造方法
    constructor(options){
        // options 是对象 $不知道做什么的
        this.$el=options.el;
        this.$data=options.data;
        // 如果有挂载的el
        if(this.$el){
            // 开始编译模板
            new Compile(this.$el,this);
        }
    }
}