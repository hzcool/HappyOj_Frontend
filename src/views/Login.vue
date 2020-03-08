<template>
    <div :style="backgroundDiv">
        <Affix :offset-top="50">
        <div class="block">
            <h2 style="color:#fff">Happy Online Judge</h2>
            <Divider size="small"/>
            <Form :model="info">
                <FormItem>
                    <h2 style="color:#fff">登陆</h2>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="4" style="color:#fff;font-size:20px">
                            用户名
                        </Col>
                        <Col span="18" offset="1">
                            <Input type="text" v-model="info.username" placeholder="username" size="large" autofocus>
                                <Icon type="ios-person-outline" slot="prepend"></Icon>
                            </Input>
                        </Col>
                    </Row>

                </FormItem>
                <br>
                <FormItem>
                    <Row>
                        <Col span="4" style="color:#fff;font-size:20px">
                            密 码
                        </Col>
                        <Col span="18" offset="1">
                            <Input type="password" v-model="info.password" placeholder="Password" size="large" @on-enter="login()">
                                <Icon type="ios-lock-outline" slot="prepend"></Icon>
                            </Input>
                        </Col>
                    </Row>
                </FormItem>
                <br>
                <FormItem>
                    <Row type="flex" justify="center">
                        <Col span="6" >
                            <Button type="primary" size="large" @click="login">登陆</Button>
                        </Col>
                        
                        <Col span="6">
                            <Button type="success" size="large" @click="register">注册</Button>
                        </Col>
                    </Row>
                </FormItem>
                
            </Form>
            <br>
            <Row type="flex" justify="end" style="font-size: 20px;">
                <Col span="6">
                    <router-link :to="{name:'home'}"> <u style="color: red">忘记密码</u> </router-link>
                </Col>
                <Col span="5">
                    <router-link :to="{name:'home'}"> 返回主页 </router-link>
                </Col>
            </Row>
        </div>
        </Affix>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            backgroundDiv : {
                backgroundImage:'url(' + require('@/assets/1.jpg') + ')',
                backgroundRepeat:'no-repeat',
                backgroundSize:'100% 100%',
                height : '1200px',
            },
            info : {
                username : "",
                password : "",
            },
        }
    },
    methods : {
        validate(username,password) {
            if (username.length == 0) return "用户名不能为空";
            else if (username.length > 20) return "用户名太长";
            else if (username.search(" ")!=-1) return "用户名不能包含空格";
            else if(password.length == 0) return "密码不能为空";
            else if(password.length > 16) return "密码太长" ;
            else if(password.search(" ")!=-1) return "密码不能包含空格";
            return ""; 
        },
        register() {
            this.$router.push({name:"register"})
        },
        login() {
            let err = this.validate(this.info.username,this.info.password);
            if (err != "")   {
                this.$message("error",err)
                return;
            }
            this.$req.post({url:"login",form:JSON.stringify(this.info),config:{ headers:{ 'Content-Type': ' application/json' }}})
            .then ( res => {
                if (res) {
                    this.$message("success","登陆成功")
                    this.$store.commit("Login",this.info.username);
                    this.$router.push({name:"home"});
                } 
            });
        },
    }
}
</script>

<style scoped>
    .block {
        /*margin:0 auto;*/
        height:500px;
        background: rgba(0, 0, 0, 0.5);
        width: 500px;
        padding: 30px 20px;
        border-radius: 15px;
        left: 35%;
        position: fixed;
    }
</style>