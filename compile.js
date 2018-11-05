class Compile{
    constructor(el,mvvm){
        // 判断el是不是一个dom元素
        this.el=this.isElementNode(el)?el:document.querySelector(el);
        this.mvvm=mvvm;
        // 是否获取到el
        if(this.el){
            // 把dom移入内存中 fragment
            // 平时操作dom 是会触发页面的重复渲染的 
            // 如果只是改变fragment 是不会触发页面的重复渲染的，是直接改内存的值
            // 用fragment模拟了一个dom 虚拟dom？
            let fragment = this.node2Fragment(this.el)
            console.log(fragment)
            // 开始编译
            this.compile(fragment)
        }
    }
    // 核心方法
    compile(fragment) {
        // 获取到所有的 节点  以及节点的子节点
        let childNodes=fragment.childNodes;
        // 遍历数组的箭头函数
        Array.from(childNodes).forEach(node=>{
            if(this.isElementNode(node)){
                // 编译元素
                this.compileElement(node);
                // 递归
                this.compile(node);
            }else{
                // 编译文本
                this.compileText(node);
            }
        })
        // 需要递归
    }
    compileElement(node){
        let attrs = node.attributes;
        Array.from(attrs).forEach(attr=>{
            console.log(attr.name);
            if(this.isDirective(attr.name)){
                // 是指令
            }
        })
    }
    compileText(node){
        let text= node.textContent;
    }
    // 辅助方法
    // 判断是不是dom元素
    isElementNode(node){
        return node.nodeType === 1;
    }
    node2Fragment(el){
        // 创建一个空的文档碎片 内存中的文档碎片 
        let fragment = document.createDocumentFragment();
        let firstChild;
        // 给 firstChild赋值 如果不能赋值便不能执行while循环了
        while(firstChild = el.firstChild){
            // appendChild() 想pop()
            fragment.appendChild(firstChild);
        }
        return fragment;
        // 返回文档碎片 此时页面是空的，没有任何内容 为什么？
    }
    // 判断是否为指令
    isDirective(name){
        return name.includes('ycs-');
    }
}