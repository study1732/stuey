new Vue({
    el:".address",
    data:{
        addressList : [],
        addressNum:3,
        currentIndex:0,
        shippinMethod:1,
        delFlag:false,
        delNum:'',
        insertAdd:false,
        username1:'',
        addressAdd:'',
        tel:''
    },
    mounted:function(){
        this.$nextTick(function () {
            this.addView();
        })
    },
    computed:{
        filterAddress:function () {
            return this.addressList.slice(0,this.addressNum);
        }
    },
    methods:{
        addView(){
            let _this=this;
            this.$http.get("data/address.json").then(res=>{
                _this.addressList = res.data.result;
            })
        },
        setDefault (addressId) {
            this.addressList.forEach((item,index)=>{
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }
            })
        },
        delAddress (item){
            this.delFlag = true;
            this.delNum = item;
        },
        delProduct (){
            let index = this.addressList.indexOf(this.delNum);
            this.addressList.splice(index,1);
            this.delFlag=false
        },
        insertAddFun(){
            this.insertAdd = true ;
        },
        insertData(){
            this.addressList.push({
                userName : this.username1,
                streetName:this.addressAdd,
                tel:this.tel,
                isDefault:false
            });
            this.userName='';
            this.addressAdd='';
            this.tel='';
        }
    }
});