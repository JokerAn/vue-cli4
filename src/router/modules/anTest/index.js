import ElementUiBase from '@/views/anTest/element-ui-base.vue'
import Button from '@/views/anTest/button.vue'
import Input from '@/views/anTest/input.vue'

export default [
  {
    'path': 'element-ui-base',
    'name': 'ElementUiBase',
    'component': ElementUiBase,
    'meta': {
      'icon': 'ElementTest',
      'title': 'element基础联系'
    },
    'children':[{
      'path': 'button',
      'name': 'Button',
      'component': Button,
      'meta': {
        'icon': 'Button',
        'title': 'element基础按钮'
      }
    },{
      'path': 'input',
      'name': 'Input',
      'component': Input,
      'meta': {
        'icon': 'Input',
        'title': 'element基础输入框'
      }
    }]
  }
]
