<template>
    <div :style="backgroundDiv">
        <Affix :offset-top="50">
        <div class="block">
            <h2 style="color:#fff">Happy Online Judge</h2>
            <Divider size="small"/>
            <Form ref="info" :model="info">
                <FormItem style="color:#fff" >
                    <h2>注册</h2>
                </FormItem>
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
                            <Input type="password" v-model="info.password" placeholder="Password" size="large" clearable>
                                <Icon type="ios-lock-outline" slot="prepend" />
                            </Input>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="4" style="color:#fff;font-size:20px">
                            <span style="color: red">*</span>重复密码
                        </Col>
                        <Col span="18" offset="1">
                            <Input type="password" v-model="info.repeat" placeholder="Repeat" size="large" clearable>
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
                            <Input type="text" v-model="info.email" placeholder="Email" size="large" clearable>
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
                        <Input v-model="info.description" type="textarea" :rows="4" placeholder="Enter something..." clearable></Input>
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
                <router-link :to="{name:'home'}"> 返回主页 </router-link>
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
                    height : '1100px',

                },
                info : {
                    username : "",
                    password : "",
                    repeat : "",
                    email:"",
                    school:"",
                    description:"",
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
                else if (info.password != info.repeat) return "两次密码不同";
                else if (info.email.length > 32) return "邮箱太长";
                else if (!/^[\w.-]+@([0-9a-z][\w-]+\.)+[a-z]{2,3}$/i.test(info.email)) return "邮箱不合法";
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
                    this.$req.post({url:"register",form:JSON.stringify(this.info),config:{ headers:{ 'Content-Type': ' application/json' }}})
                    .then(res => {
                            if(res) {
                                this.$message("success", "注册成功")
                                this.$store.commit("Login", this.info.username);
                                this.$router.push({name: "home"});
                            }
                        })
                }
            },
            clear() {
                this.info.description = this.info.school = this.info.email = this.info.username = this.info.password = this.info.repeat = "";
            }
        }
    }
</script>

<style scoped>
    .block {
        /*margin:0 auto;*/
        height:800px;
        background: rgba(0, 0, 0, 0.5);
        width: 600px;
        padding: 30px 30px;
        border-radius: 15px;
        left: 34%;
        position: fixed;
    }
</style>