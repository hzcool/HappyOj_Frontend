<template>
    <div v-show="loaded">
        <Modal :width = "900" v-model="hmodal"  title="历史记录" :mask-closable="false">
            <Table :columns="columns" :data="history">
                <template slot-scope="{row}" slot="status">
                    <router-link tag="a" target="_blank" :to="{name:'code',params:{'id':row.run_id},query:{'contest':id}}">  <span :class="row.status"> {{row.status}} </span> </router-link>
                </template>
            </Table>
            <div slot="footer">
                <Button type="primary" size="large" @click="hmodal=false">关闭</Button>
            </div>
        </Modal>
        <Modal :width="900" v-model="smodal" :mask-closable="false" title="Solution">
            <Table :columns="columns" :data="mySubmission">
                <template slot-scope="{row}" slot="status">
                    <router-link tag="a" target="_blank" :to="{name:'code',params:{'id':row.run_id},query:{'contest':id}}">  <span :class="row.status"> {{row.status}} </span> </router-link>
                    <Spin v-if="row.status == 'Queueing' || row.status == 'Running' " style="float: right">
                        <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                    </Spin>
                </template>
            </Table>
            <div slot="footer">
                <Button type="primary" size="large" @click="smodal=false">关闭</Button>
            </div>
        </Modal>
        <Card >
            <div style="text-align: center">
                <h1>{{label}}. <span style="color: firebrick;margin-left: 30px">{{info.title}}</span></h1>
                <h3><span style="color: green">时间限制 </span>{{info.time_limit}}MS <span style="color: green;margin-left: 30px;">空间限制 </span>{{info.memory_limit}}MB</h3>
            </div>
            <div v-if = "file_path && file_path!=''">
                <a :href="file_path" style="font-size: 30px;" target="_blank">  <b>题目链接</b> </a>
            </div>
            <div v-if="info.background && info.background!=''">
                <h2 class="head-color">背景</h2>
                <div style="padding: 10px 20px;">
                    {{info.background}}
                </div>
            </div>
            <br>
            <h2 class="head-color">题目描述</h2>
            <div style="padding: 10px 30px;" >
                <mavon-editor v-if="statement_html==''" v-model="info.statement"  @change="statementChange" :toolbarsFlag="false" :editable="false" :subfield="false" :defaultOpen="'preview'" :boxShadow="false" style="min-height: 0px;"/>
                <div class="mdClass" v-html="statement_html"> </div>
            </div>
            <br>
            <h2 class="head-color">输入说明</h2>
            <div style="padding: 10px 30px;" >
                <mavon-editor v-model="info.input" v-if="input_html==''"  @change="inputChange" :toolbarsFlag="false" :editable="false" :subfield="false" :defaultOpen="'preview'" :boxShadow="false" style="min-height: 0px;"/>
                <div class="mdClass" v-html="input_html"> </div>
            </div>
            <br>

            <h2 class="head-color">输出说明</h2>
            <div style="padding: 10px 30px;" >
                <mavon-editor v-model="info.output" :toolbarsFlag="false" v-if="output_html==''"  @change="outputChange" :editable="false" :subfield="false" :defaultOpen="'preview'" :boxShadow="false" style="min-height: 0px;"/>
                <div class="mdClass" v-html="output_html"> </div>
            </div>
            <br>
            <div v-for="i in info.examples_in.length" v-bind:key="i">
                <Row>
                    <Col span="12">
                        <div style="width: 400px;">
                            <span class="head-color" style="font-size: 20px;"> <strong>样例输入<span v-if="info.examples_in.length>1">{{i}}</span>:</strong> </span>
                            <Button type="text" style="float: right" @click="copy(info.examples_in[i-1])">复制</Button>
                            <Input  readonly type="textarea" :autosize="{minRows:2,maxRows:6}" v-model="info.examples_in[i-1]"/>
                        </div>
                    </Col>
                    <Col span="12">
                        <div style="width: 400px;">
                            <span class="head-color" style="font-size: 20px;"> <strong>样例输出<span v-if="info.examples_in.length>1">{{i}}</span>:</strong> </span>
                            <Button type="text" style="float: right" @click="copy(info.examples_in[i-1])">复制</Button>
                            <Input readonly type="textarea" :autosize="{minRows:2,maxRows:6}" v-model="info.examples_out[i-1]"/>
                        </div>
                    </Col>
                </Row>
                <br>
            </div>
            <br>
            <div v-if="info.hint && info.hint!=''">
                <h2 class="head-color">提示</h2>
                <div style="padding: 10px 20px;" >
                    <mavon-editor v-model="info.hint" v-if="hint_html==''"  @change="hintChange" :toolbarsFlag="false" :editable="false" :subfield="false" :defaultOpen="'preview'" :boxShadow="false" style="min-height: 0px;"/>
                    <div class="mdClass" v-html="hint_html"> </div>
                </div>
                <br>
            </div>
            <Code ref="codeRef" v-on:submit="submit" v-on:getHistory="getHistory"/>
        </Card>
    </div>
</template>
<script>
    import Code from '../Code'
    export default {
        props :['label','id'],
        components: {
            Code,
        },
        data() {
            return {
                info: {
                    title:'',
                    background:'',
                    input:'',
                    output:'',
                    examples_in:[],
                    examples_out:[],
                    hint:'',
                    time_limit:1000,
                    memory_limit:128,
                    statement:""
                },
                columns: [
                    {
                        title: "RunID",
                        key: "run_id",
                        align: "center",
                    },
                    {
                        title: "Status",
                        slot: "status",
                        align: "center",
                    },
                    {
                        title: "Lang",
                        key: "lang",
                        align: "center",

                    },
                    {
                        title: "Time(MS)",
                        key: "time",
                        align: "center",
                    },
                    {
                        title: "Memory(MB)",
                        key: "memory",
                        align: "center",
                        width: 130,
                    },
                    {
                        title: "Score",
                        key: "score",
                        align: "center",
                    },
                    {
                        title: "SubmitAt",
                        key: "created_at",
                        align: "center",
                        width: 200,
                    },
                ],
                file_path: "",
                loaded: false,
                hmodal : false,
                smodal: false,
                statement_html : '',
                input_html: '',
                output_html: '',
                hint_html:'',
                history: [],
                mySubmission: [],
                timer: null,
            }
        },
        methods: {
            setTimer() {
                this.timer = setInterval(()=>{
                    this.$req.get({url:'getBaseCS',params:{"id":this.id,"run_id":this.mySubmission[0].run_id}})
                    .then(res => {
                        if(res) {
                            this.mySubmission = []
                            this.mySubmission.push(res)
                            if(res.status!="Queueing" && res.status!="Running")  this.clearTimer()
                        } else this.clearTimer()
                    })
                }, 1500)
            },
            clearTimer() {
                clearInterval(this.timer)
                this.timer = null
            },
            submit(code) {
                if(code.trim()=="") {
                    alert("不能交空代码");
                    return
                }
                let form = new FormData()
                let config = { headers:{ 'Content-Type': 'multipart/form-data' }}
                form.append("code",code)
                form.append("lang",this.$refs.codeRef.lang)
                form.append("id",this.id)
                form.append("label",this.label)
                this.$req.post({url:"submitContestCode",form:form,config:config})
                .then(res => {
                    if(res) {
                        this.mySubmission = []
                        this.mySubmission.push(res)
                        this.smodal = true
                        this.setTimer()
                    }
                })
            },
            statementChange(markdown, html) {
                this.statement_html = html;
            },
            inputChange(markdown, html) {
                this.input_html = html;
            },
            outputChange(markdown, html) {
                this.output_html = html;
            },
            hintChange(markdown, html) {
                this.hint_html = html;
            },
            getHistory() {
                this.$req.get({url:"getCproblemHistory",params:{"id":this.id,"label":this.label}})
                .then(res => {
                    if(res) {
                        if(res.num==0) {
                            alert("没有提交记录")
                        } else {
                            this.history = res.data
                            this.hmodal = true
                        }
                    }
                })
            },
            copy(msg) {
                this.$copyText(msg).then( e => {
                        this.$message("success","复制成功");
                        console.log(e)
                    }, e => {
                        this.$message("error","复制失败");
                        console.log(e)
                    }
                );
            }
        },
        mounted() {
            this.$req.get({url:"getOneContestProblem",params:{"id":this.id,"label":this.label}})
            .then(res => {
                if(res) {
                    setTimeout(()=>{
                        this.info = res.info
                        this.file_path = res.file_path
                        this.$refs.codeRef.code = res.code
                        this.$refs.codeRef.lang = res.lang
                        if(res.format != "OI") {
                            this.columns.splice(5,1)
                        }
                        this.loaded = true
                    },200)
                }
            })
        },
        destroyed() {
            this.clearTimer()
        }
    }
</script>

<style scoped>
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    .head-color{
        color: dodgerblue;
    }
    .mdClass{
        color: black;
        font-size: 16px;
    }
    .All{
        color: black;
    }
    .Queueing {
        color: green;
    }
    .Running{
        color: #000080;
    }
    .Accepted {
        color :	#00FF00;
    }
    .WrongAnswer{
        color: red;
    }
    .CompileError{
        color: blue;
    }
    .RuntimeError{
        color: Fuchsia;
    }
    .TimeLimitExceeded {
        color: 	DeepPink;
    }
    .MemoryLimitExceeded {
        color: Crimson;
    }
    .OutputLimitExceeded{
        color: DarkViolet;
    }
    .SystemError{
        color: Gold;
    }
</style>