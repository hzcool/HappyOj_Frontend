import Vue from 'vue';
import 'view-design/dist/styles/iview.css'


import {
    Affix,
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    CheckboxGroup,
    Col,
    Content,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Divider,
    Footer,
    Form,
    FormItem,
    Header,
    Icon,
    Input,
    InputNumber,
    Sider,
    Submenu,
    Layout,
    List,
    ListItem,
    Menu,
    MenuGroup,
    MenuItem,
    Message,
    Modal,
    Option,
    Page,
    Panel,
    Progress,
    Radio,
    RadioGroup,
    Row,
    Select,
    Spin,
    Table,
    Tabs,
    TabPane,
    TimePicker,
} from 'view-design'
// iview基础模块
const components = {
    Affix,
    Avatar,
    Badge,
    Button,
    Card,
    Checkbox,
    CheckboxGroup,
    Col,
    Content,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    Divider,
    Footer,
    Form,
    FormItem,
    Header,
    Icon,
    Input,
    InputNumber,
    Sider,
    Submenu,
    Layout,
    List,
    ListItem,
    Menu,
    MenuGroup,
    MenuItem,
    Message,
    Modal,
    Option,
    Page,
    Panel,
    Progress,
    Radio,
    RadioGroup,
    Row,
    Select,
    Spin,
    Table,
    Tabs,
    TabPane,
    TimePicker,
}

const iviewModule = {
    ...components,
    // 不能和html标签重复的组件，添加别名(除了Switch、Circle在使用中必须是iSwitch、iCircle,其他都可以不加"i")
    iButton: Button,
    iCol: Col,
    iContent: Content,
    iForm: Form,
    iFooter: Footer,
    iHeader: Header,
    iInput: Input,
    iMenu: Menu,
    iOption: Option,
    iProgress: Progress,
    iSelect: Select,
    iTable: Table
}
// 循环注册全局组件
Object.keys(iviewModule).forEach(key => {
    Vue.component(key, iviewModule[key])
})

const MyMessage = function(type,info) {
    Message[type]({
        background: true,
        content: info
    });
}
Vue.prototype.$message = MyMessage