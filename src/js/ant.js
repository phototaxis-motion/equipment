import { Table, Upload, Button, Checkbox, Image, Tag, DatePicker } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

export default {
  install(app, options) {
    // configure the app
    const list = [Table, Upload, Button, Checkbox, Image, Tag, DatePicker]
    list.forEach(component=>{app.use(component)})
    // app.use(Table).use(Upload)
  }
}