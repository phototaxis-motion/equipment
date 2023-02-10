import { Table, Upload, Button, Checkbox, Image, Tag, DatePicker, Dropdown, Menu, Input, Tooltip, Space, Textarea, Layout, Modal, Divider, Avatar } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'; // or 'ant-design-vue/dist/antd.less'

export default {
  install(app, options) {
    // configure the app
    const list = [Table, Upload, Button, Checkbox, Image, Tag, DatePicker, Dropdown, Menu, Input, Tooltip, Space, Textarea, Layout, Modal, Divider, Avatar]
    list.forEach(component=>{app.use(component)})
    // app.use(Table).use(Upload)
  }
}