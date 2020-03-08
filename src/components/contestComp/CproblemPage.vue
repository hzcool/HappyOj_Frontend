<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .clear{
        clear: both;
    }
</style>
<template>
    <div v-if="loaded" class="layout">
        <Layout>
            <Row :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)',height: '80px'}">
                <div style="float: left;margin-top: 15px;">
                    <h1 style=" margin-left: 20px;">Happy Online Judge</h1>
                </div>
                <div style="float: right;margin-top: 25px">
                    <div v-if="isLogin">
                        <Badge :count="count" style="margin-right: 15px">
                            <Avatar style="background-color: #87d068" icon="ios-person" />
                        </Badge>
                        <Dropdown style="margin-right: 15px">
                            <a href="javascript:void(0)">
                                {{username}}
                                <Icon type="ios-arrow-down"></Icon>
                            </a>
                            <DropdownMenu slot="list">
                                <DropdownItem> 查看信息 </DropdownItem>
                                <DropdownItem> <router-link :to="{name:'update'}">修改信息</router-link> </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <Button type="error" style="margin-right: 20px" @click="logout"> 退出 </Button>
                    </div>
                    <div v-else>
                        <Button type="primary" @click="login" style="margin-right: 20px"> 登陆 </Button>
                        <Button type="success" @click="register" style="margin-right: 20px" > 注册 </Button>
                    </div>
                </div>
                <div class="clear"></div>
            </Row>
            <Content :style="{padding: '10px 16px 16px'}">
                <CproblemComp :label="label" :id="id"> </CproblemComp>
                <Footer class="layout-footer-center" style="text-align: center">author : hzcool <br> {{date}}</Footer>
            </Content>
        </Layout>
    </div>
</template>

<script>
    import CproblemComp from "./CproblemComp";
    export default {
        components: {
            CproblemComp
        },
        data()  {
            return {
                count:10,  //消息数
                date: new Date(), //实时时间
                label:'',
                id: 0,
                loaded: false,
            }
        },
        methods : {
            login() {
                this.$router.push({name:"login"})
            },
            register() {
                this.$router.push({name:"register"})
            },
            logout() {
                this.$req.get({url:"logout"})
                    .then (res=> {
                        if(res) {
                            this.$store.commit("Logout")
                            this.$message("success",res)
                        }
                    })
            },
        },
        computed : {
            isLogin() {
                return this.$store.state.usr.isLogin;
            },
            username() {
                return this.$store.state.usr.username;
            }
        },
        mounted() {
            this.label = this.$route.query.problem
            this.id = this.$route.query.id
            if(this.label && this.id) {
                if (!this.$store.state.usr.isLogin) {
                    this.$req.autologin();
                }
                var _this = this;
                this.timer = setInterval(function(){
                    _this.date = new Date();
                },1000);
                this.loaded = true
            }
        },
        beforeDestroy:function(){
            if(this.timer){
                clearInterval(this.timer);
            }
        }
    }
</script>
