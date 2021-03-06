import {
    Row,
    Col,
    Input,
    InputNumber,
    Switch,
    Select,
    Button,
    TimeSelect,
    Popover,
    Form,
    FormItem,
    Card,
    Table,
    TableColumn,
    DatePicker,
    dialog,
    Checkbox,
    CheckboxGroup,
    Cascader,
    Option,
    Steps,
    RadioButton,
    Step,
    Radio,
    RadioGroup,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    badge,
    Icon,
    Slider,
    Loading,
    progress,
    Tooltip,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Transfer,
    Upload,
    Tag,

} from 'element-ui';

const getElement = {
    install(Vue) {
        Vue.use(Tag);
        Vue.use(Upload);
        Vue.use(Transfer);
        Vue.use(Row);
        Vue.use(Col);
        Vue.use(badge)
        Vue.use(Tooltip)
        Vue.use(Radio)
        Vue.use(Loading.directive)
        Vue.prototype.$loading = Loading.service
        Vue.use(Slider)
        Vue.use(Icon)
        Vue.use(progress)
        Vue.use(BreadcrumbItem)
        Vue.use(Breadcrumb)
        Vue.use(CheckboxGroup)
        Vue.use(Step)
        Vue.use(Steps)
        Vue.use(Option)
        Vue.use(Cascader)
        Vue.use(Checkbox)
        Vue.use(Input)
        Vue.use(InputNumber);
        Vue.use(Switch);
        Vue.use(Select);
        Vue.use(Popover);
        Vue.use(TimeSelect);
        Vue.use(Card);
        Vue.use(Form)
        Vue.use(FormItem)
        Vue.use(Button)
        Vue.use(Table)
        Vue.use(DatePicker)
        Vue.use(TableColumn)
        Vue.use(dialog)
        Vue.use(RadioButton)
        Vue.use(RadioGroup)
        Vue.use(Pagination)
        Vue.use(Menu)
        Vue.use(Submenu)
        Vue.use(MenuItem)
        Vue.use(MenuItemGroup)


    }
}
export default getElement
