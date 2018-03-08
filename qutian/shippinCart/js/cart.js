var vm = new Vue({
    el:"#app",
    //数据
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        curProduct:''
    },
    //过滤器
    filters:{
        formMoney (value){
            return "￥"+value.toFixed(2);
        }
    },
    //生命周期
    mounted:function(){
        //调用事件方法  //加上$nextTick  就可以使用  vm
        this.$nextTick(function(){
            vm.cartView();
        })


    },
    //事件
    methods:{
        //数据渲染
        cartView:function (){
            let _this=this;
            // 获取json数据
            this.$http.get("data/cartData.json",{"id":123}).then(res=>{
                // 把json数据里的数据  赋值到当前data数据
                _this.productList = res.data.result.list;
                _this.totalMoney = res.data.result.totalMoney;
            })
        },
        //增加 减少
        changeMoney(product,way){
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
            //点击加减也要计算
            this.calcTotlePrice();
        },
        //单选
        selectedProduct:function (item){
            //判断元素是否存在
            if(typeof item.checked == 'undefined'){
                //不存在就全局注册
                // Vue.set(item,"checked",true)
                //局部
                this.$set(item,"checked",true)
            }else{
                //如果不为空了  则取反
                item.checked = !item.checked;
            }
            // console.log(typeof item.checked);
            //选中后计算金额
            this.calcTotlePrice();
        },
        //全选
        checkAll(flag){
            this.checkAllFlag = flag;
            let _this = this;
            this.productList.forEach(function (val,ind){
                // value.checked = true;
                 //判断元素是否存在
               if(typeof val.checked == 'undefined'){
                        //局部
                    _this.$set(val,"checked",_this.checkAllFlag)
               }else{
                   val.checked = _this.checkAllFlag;
               }
            });
            this.calcTotlePrice();
        },
        //计算金额
        calcTotlePrice(){
            let _this= this;
            //初始化金额
            this.totalMoney=0;
            //循环获取参数
            this.productList.forEach(function (item,index){
                //判断是否被选中
                if(item.checked){
                    //如果选中的话  我们就累加   每次累加之前我们都初始化了金额
                    _this.totalMoney += item.productPrice * item.productQuantity;
                }
            })
        },
        //定义一个点击删除为哪个
        delConfirm (item){
            this.delFlag = true ;
            this.curProduct = item;
        },
        delProduct (){
            // 1.0 的方法
            // this.delProduct.$delete(this.curProduct)
            let index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
        }
    }
    });
// 全局定义一个 过滤器
Vue.filter("moneya",function (value,type){
    return "￥"+value.toFixed(2)+type;
});