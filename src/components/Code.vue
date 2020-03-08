<template>
    <div style="padding: 0 20px;">
        <Row style="padding: 10px 20px">
            <strong >语言</strong>
            <Select v-model="lang" style="width: 200px;margin-left: 10px;">
                <Option v-for="item in langList" :value="item.value" :key="item.value"> {{ item.label }} </Option>
            </Select>
            <Button type="info" @click="$emit('getHistory')" style="margin-left: 20px;"> 提交记录 </Button>
        </Row>
        <codemirror ref="myCm"
                    v-model="code"
                    :options="cmOptions"
                    >
        </codemirror>
        <div style="padding: 20px 20px;">
            <Button type="primary" @click="submit" :loading="loading"> 提交 </Button>
            <Button type="error" @click="clear" style="margin-left: 20px;" > 清空 </Button>
            <Button type="success" @click="copy(code)" style="margin-left: 20px;" > 复制 </Button>
        </div>
    </div>
</template>

<script>

    import { codemirror } from 'vue-codemirror'
    import "codemirror/theme/eclipse.css"

    require("codemirror/mode/clike/clike.js")
    require("codemirror/mode/python/python.js")

    export default {
        components: {
            codemirror
        },
        data () {
            return {
                lang: "C++11",
                langList: [
                    {
                        value:'C11',
                        label: 'C11',
                    },
                    {
                        value: 'C++11',
                        label: 'C++11',
                    },
                    {
                        value: 'C++14',
                        label: 'C++14',
                    },
                    {
                        value: 'C++17',
                        label: 'C++17',
                    },
                    {
                        value: 'Python2',
                        label: 'Python2',
                    },
                    {
                        value: 'Python3',
                        label: 'Python3',
                    },
                    {
                        value: 'Java',
                        label: 'Java',
                    }
                ],
                code: '',
                loading : false,
            }
        },

        methods: {
            clear() {
              this.code=""
            },
            submit() {
                this.loading = true
                setTimeout(()=>{
                    this.$emit("submit",this.code)
                    this.loading = false
                },600)
            },
            copy(msg) {
                this.$copyText(msg).then( () => {
                        this.$message("success","复制成功");
                        // console.log(e)
                    }, () => {
                        this.$message("error","复制失败");
                        // console.log(e)
                    }
                );
            },
        },
        computed: {
            cmOptions() {
                let _mode = 'text/x-c++src';
                if (this.lang.substr(0,6) =="Python") {
                    _mode = "python";
                } else if(this.lang.substr(0,4) == "Java") {
                    _mode = "text/x-java"
                }
                return {
                    tabSize: 4,
                    theme: 'eclipse',
                    lineNumbers: true,
                    indentUnit:4,
                    autofocus: true,
                    mode: _mode,
                }
            },
        },

    }
</script>

