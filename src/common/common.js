import axios from 'axios'
import store from '@/store/index.js'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-fromurlencodeed'
//get方法和post方法
const requeset = {

    async post({url,form,config}) {
        var ret;
        await axios.post(url,form,config)
            .then( res =>{
                ret = res.data
            }).catch(err => {
                if (err.response.data) {
                    // Message('error',err.response.data)
                    alert(err.response.data);
                }
            });
        return ret;
    },

    async get({url,params}) {
        var ret;
        await axios.get(url,{params:params})
            .then(res =>{
                ret = res.data
            }).catch(err => {
                if (err.response.data) {
                    alert(err.response.data);
                }
            });
        return ret;
    },
    async autologin() {
        await axios.get("autologin")
        .then(res =>{
            store.commit("Login", res.data)
        }).catch(err => {
            console.log(err.response.data)
        })
    }
}




const install = function(vm) {//插件必须有这样一个install方法。
    vm.prototype.$req = requeset;
}
export default { install }