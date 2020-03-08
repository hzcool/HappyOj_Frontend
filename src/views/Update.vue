<template>
    <div :style="backgroundDiv">
        <Affix :offset-top="50">
            <div class="block">

                <h2 style="color:#fff">Happy Online Judge</h2>
                <Divider size="small"/>
                <div v-if="type==0">
                    <Form ref="info" :model="info">
                        <h2 style="color: #fff">修改信息</h2> <br>
                        <FormItem>
                            <Row>
                                <Col span="4" style="color:#fff;font-size:20px">
                                    <span style="color: red">*</span>用户名
                                </Col>
                                <Col span="18" offset="1">
                                    <Input type="text" v-model="info.username" placeholder="Username" size="large" autofocus clearable>
                                        <Icon type="ios-person-outline" slot="prepend" />
                                    </Input>
                                </Col>
                            </Row>
                        </FormItem>

                        <FormItem>
                            <Row>
                                <Col span="4" style="color:#fff;font-size:20px">
                                    <span style="color: red">*</span>密 码
                                </Col>
                                <Col span="18" offset="1">
                                    <Input type="password" v-model="info.password" placeholder="Password" size="large"  clearable>
                                        <Icon type="ios-lock-outline" slot="prepend" />
                                    </Input>
                                </Col>
                            </Row>
                        </FormItem>

                        <FormItem>
                            <Row>
                                <Col span="4" style="color:#fff;font-size:20px">
                                    <span style="color: red">*</span>邮 箱
                                </Col>
                                <Col span="18" offset="1">
                                    <Input type="text"  disabled v-model="info.email" placeholder="Email" size="large" clearable>
                                        <Icon type="ios-mail-outline"  slot="prepend" />
                                    </Input>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="4" style="color:#fff;font-size:20px">
                                    <span style="color: red">*</span>学 校
                                </Col>
                                <Col span="18" offset="1">
                                    <Input type="text" v-model="info.school" placeholder="School" size="large" clearable>
                                        <Icon type="ios-school-outline" slot="prepend"/>
                                    </Input>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Col span="4" style="color:#fff;font-size:20px">
                                描 述
                            </Col>
                            <Col span="18" offset="1">
                                <Input v-model="info.desc" type="textarea" :rows="4" placeholder="Enter something..." clearable></Input>
                            </Col>
                        </FormItem>

                        <br>
                        <FormItem>
                            <Row  type="flex" justify="center">
                                <Col span="5" >
                                    <Button type="primary" size="large" @click="submit">提交</Button>
                                </Col>
                                <Col span="5">
                                    <Button type="error" size="large" @click="clear">清空</Button>
                                </Col>
                            </Row>
                        </FormItem>
                        <br>
                    </Form>
                    <Row type="flex" justify="end" style="font-size: 20px;color: #ddd">
                        <Button type="dashed" style="color: red; margin-right: 10px;" @click="changeType"> 修改密码 </Button>
                        <router-link :to="{name:'home'}"> 返回主页 </router-link>
                    </Row>
                </div>
                <div v-else>
                    <Form>
                        <h2 style="color: #fff">修改密码</h2> <br>
                        <FormItem>
                            <Row>
                                <Col span="5" style="color:#fff;font-size:20px">
                                    <span style="color: red">*</span>旧密码
                                </Col>
                                <Col span="18" offset="1">
                                    <Input type="password" v-model="pwd.oldPassword" placeholder="old password" size="large"  clearable>
                                        <Icon type="ios-lock-outline" slot="prepend" />
                                    </Input>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="5" style="color:#fff;font-size:20px">
                                    <span style="color: red">*</span>新密码
                                </Col>
                                <Col span="18" offset="1">
                                    <Input type="password" v-model="pwd.newPassword" placeholder="new password" size="large"  clearable>
                                        <Icon type="ios-lock-outline" slot="prepend" />
                                    </Input>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row>
                                <Col span="5" style="color:#fff;font-size:20px">
                                    <span style="color: red">*</span>重复新密码
                                </Col>
                                <Col span="18" offset="1">
                                    <Input type="password" v-model="repeat" placeholder="repeat" size="large"  clearable>
                                        <Icon type="ios-lock-outline" slot="prepend" />
                                    </Input>
                                </Col>
                            </Row>
                        </FormItem>
                        <FormItem>
                            <Row  type="flex" justify="center">
                                <Col span="5" >
                                    <Button type="primary" size="large" @click="updatePassword">提交</Button>
                                </Col>
                                <Col span="5">
                                    <Button type="error" size="large" @click="clear2">清空</Button>
                                </Col>
                            </Row>
                        </FormItem>

                    </Form>
                        <Row type="flex" justify="end" style="font-size: 20px;color: #ddd">
                            <Button type="dashed" style="color: red; margin-right: 10px;" @click="changeType"> 修改信息 </Button>
                            <router-link :to="{name:'home'}"> 返回主页 </router-link>
                        </Row>
                </div>
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
                    height : '1100px',

                },

                pwd : {
                    oldPassword : "",
                    newPassword : "",
                },

                repeat : "",

                type : 0, // 0表示修改基本信息，否则修改密码
                info : {
                    username : "",
                    password : "",
                    email:"",
                    school:"",
                    desc:"",
                },
            }
        },
        methods : {
            validate(info) {
                if (info.username.length == 0) return "用户名不能为空";
                else if (info.username.length > 20) return "用户名太长";
                else if (info.username.search(" ")!=-1) return "用户名不能包含空格";
                else if (info.password.length == 0) return "密码不能为空";
                else if (info.password.length > 16) return "密码太长" ;
                else if (info.password.search(" ")!=-1) return "密码不能包含空格";
                else if (info.school.length == 0) return "学校不能为空";
                else if (info.school.length > 20) return  "学校名太长";
                else if (info.school.search(" ")!=-1) return  "学校名不能包含空格";
                return "";
            },
            submit() {
                let error = this.validate(this.info);
                if (error!="") {
                    this.$message("error",error);
                } else {
                    this.$req.post({url:"update",form:JSON.stringify(this.info),config:{ headers:{ 'Content-Type': ' application/json' }}})
                    .then(res =>{
                        if (res) {
                            this.$message("success","修改成功")
                            this.$store.commit("Login",this.info.username)
                        }
                    })
                }
            },
            changeType() {
                this.type ^= 1;
            },
            clear() {
                this.info.desc = this.info.school = this.info.email = this.info.username = this.info.password = "";
            },

            validate2(pwd) {
                if (pwd.oldPassword.length == 0) return  "旧密码不能为空";
                else if (pwd.oldPassword.length < 6) return  "旧密码太短";
                else if (pwd.oldPassword.length > 16) return  "旧密码太长";
                else if (pwd.oldPassword == pwd.newPassword) return  "新密码不能与旧密码相同";
                else if (pwd.newPassword.length == 0) return "新密码不能为空";
                else if (pwd.newPassword.length < 6) return  "新密码太短";
                else if (pwd.newPassword.length > 16) return  "新密码太长";
                else  if (this.repeat.length == 0) return  "请重复新密码";
                else if (pwd.newPassword != this.repeat) return "两次密码输入不同";
                return  ""
            },
            updatePassword() {
                let error = this.validate2(this.pwd)
                if (error!="") {
                    this.$message("error",error);
                } else {
                    this.$req.post({url:"updatePassword",form:JSON.stringify(this.pwd),config:{ headers:{ 'Content-Type': ' application/json' }}})
                        .then(res =>{
                            if(res) {
                                this.$message("success",res)
                            }
                        })
                }
            },
            clear2() {
                this.repeat = this.pwd.newPassword = this.pwd.oldPassword = "";
            }
        },
        mounted() {
            this.$req.get({url:"profile"})
                .then(res => {
                    if(res) {
                        this.info.username = res.username;
                        this.info.email = res.email;
                        this.info.school = res.school;
                        this.info.desc = res.desc;
                    }
                })
        },
    }
</script>

<style scoped>
    .block {
        /*margin:0 auto;*/
        height:700px;
        background: rgba(0, 0, 0, 0.5);
        width: 600px;
        padding: 30px 30px;
        border-radius: 15px;
        left: 34%;
        position: fixed;
    }
</style>