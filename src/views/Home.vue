<script src="../common/common.js"></script>
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
    .sider {
        position: fixed;
        height: 100vh;
        left: 0;
        overflow: auto;
        text-align: center;
    }
</style>
<template>

    <div class="layout">

        <Sider class="sider">
            <Menu active-name="1" theme="dark" width="auto">
                <MenuItem name="1"  :to="{name:'home'}">
                    <Icon type="ios-home" />主页
                </MenuItem>
                <MenuItem name="2" :to="{name:'problemset'}">
                    <Icon type="md-list-box" />题库
                </MenuItem>
                <MenuItem name="3" :to="{name:'contestset'}">
                    <Icon type="md-trophy" />比赛
                </MenuItem>
                <MenuItem name="4" :to="{name:'users'}">
                    <Icon type="md-contacts" />用户
                </MenuItem>
                <MenuItem name="5" :to="{name:'submissions'}">
                    <Icon type="md-reorder" />测评记录
                </MenuItem>
                <MenuItem name="6" :to="{name:'faq'}">
                    <Icon type="md-bulb" />网站说明
                </MenuItem>
            </Menu>
        </Sider>
        <Layout style="margin-left:200px;">
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
                                <DropdownItem> <router-link :to="{name:'userinfo',query:{'username':username}}">查看信息</router-link> </DropdownItem>
                                <DropdownItem> <router-link :to="{name:'update'}">修改信息</router-link> </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
<!--                        <Button type="text" style="margin-right: 10px"> {{username}} </Button>-->
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
                <Row>
                    <i-col class="demo-spin-col" span="24">
                        <Spin fix>
                            <div class="loader">
                                <svg class="circular" viewBox="25 25 50 50">
                                    <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="5" stroke-miterlimit="10"></circle>
                                </svg>
                            </div>
                        </Spin>
                    </i-col>
                </Row>
                <router-view></router-view>
                <Footer class="layout-footer-center" style="text-align: center">author : hzcool <br> {{date}}</Footer>
            </Content>
        </Layout>
    </div>
</template>

<script>


export default {


  data()  {
      return {
          count:10,  //消息数
          date: new Date(), //实时时间
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
        if (!this.$store.state.usr.isLogin) {
            this.$req.autologin();
        }
      var _this = this;
      this.timer = setInterval(function(){
          _this.date = new Date();
      },1000);
  },
    beforeDestroy:function(){
        if(this.timer){
            clearInterval(this.timer);
        }
    }
}
</script>
