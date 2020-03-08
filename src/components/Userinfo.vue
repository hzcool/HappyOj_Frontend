<template>
    <Card>
        <List style="float: left;color: black" border size="large">
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4">用户名</i-col>
                    <i-col span="20" style="color:red">{{info.username}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4">注册时间</i-col>
                    <i-col span="20" style="color: red">{{info.create_at}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4">上次访问</i-col>
                    <i-col span="20" style="color: red">{{info.last_seen}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4">学校</i-col>
                    <i-col span="20" style="color: red">{{info.school}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4">邮箱</i-col>
                    <i-col span="20" style="color: red">{{info.email}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4">描述</i-col>
                    <i-col span="20" style="color: red">{{info.desc}}</i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4"> 已解决的问题({{solved.length}}) </i-col>
                    <i-col span="20" style="color: blue">
                        <router-link v-for="item in solved" :key="item" :to="{name:'problem',params: {'Index':item}}">
                            {{item}}
                        </router-link>
                    </i-col>
                </Row>
            </ListItem>
            <ListItem>
                <Row style="width: 800px;">
                    <i-col span="4"> 未解决的问题({{unsolved.length}}) </i-col>
                    <i-col span="20" style="color: blue">
                        <router-link v-for="item in unsolved" :key="item" :to="{name:'problem',params: {'Index':item}}">
                            {{item}}
                        </router-link>
                    </i-col>
                </Row>
            </ListItem>
        </List>
        <div id="myChart" class="myChart" :style="{width: '700px', height: '600px', margin: '0 auto',float:'right'}"></div>
        <div style="clear: both"> </div>
    </Card>
</template>

<script>
export default {
    data(){
        return {
            info: {
                username:'hzcool',
                school: '南京航空航天大学',
                email:'562954019@qq.com',
                desc: '我是个憨批',
                create_at: 'gg',
                last_seen: 'gg',
            },
            solved: [],
            mp: {
                "Accepted": "正确",
                "WrongAnswer": "答案错误",
                "TimeLimitExceeded": "时间超限",
                "MemoryLimitExceeded": "空间超限",
                "OutputLimitExceeded": "输出超限",
                "RuntimeError": "运行错误",
                "SystemError": "系统错误",
                "CompileError": "编译错误",
            },
            unsolved: [],
            pie : {
                title: {
                    text: '解题分析',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['正确', '答案错误', '时间超限','空间超限', '输出超限', '运行错误','系统错误','编译错误']
                },
                series: [
                    {
                        name: '解题分析',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        itemStyle: { // 设置实例颜色
                            normal: {
                                color: function (params) {
                                    // 自定义颜色
                                    var colorList = [
                                        '#00FF00',  '#A52A2A', '#95DE64', '#5CDBD3', '#69C0FF','#FFBB96','DeepPink','red'
                                    ]
                                    return colorList[params.dataIndex]
                                }
                            },
                        }
                    }
                ]
            },

        }
    },
    methods: {
        drawLine () {
            // 基于准备好的dom，初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表

            myChart.setOption(this.pie)
        },
    },
    mounted () { // 注意，必须mounted后绘制

        let username = this.$route.query.username
        if(username) {
            this.$req.get({url: "getUserInfo", params: {"username": username}})
            .then(res => {
                if(res) {
                    this.info = res.info
                    if (res.solved) this.solved = res.solved
                    if (res.unsolved) this.unsolved = res.unsolved

                    for(let x in res.status) {
                        this.pie.series[0].data.push({
                            name: this.mp[x],
                            value: res.status[x]
                        })
                    }
                    this.drawLine()
                }
            })
        } else  {
            alert("出错")
            this.$router.push({name:"home"})
        }
    },
}
</script>