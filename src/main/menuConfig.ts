import { dialog } from 'electron'
import type { App, MenuItemConstructorOptions } from 'electron'
import { workInMac } from './utils'

export const getMenuTemplate: (app: App) => MenuItemConstructorOptions[] = (app) => [
  {
    label: workInMac() ? app.getName() : '文件',
    submenu: [
      {
        label: '打开',
        click: () => {
          dialog.showOpenDialog({
            defaultPath: __dirname
          })
        }
      },
      {
        label: '保存',
        click: () => {}
      },
      { type: 'separator' },
      {
        label: '退出',
        accelerator: 'ctrl+a',
        click: () => {
          app.quit()
        }
      }
    ]
  },
  {
    label: '编辑',
    submenu: [
      {
        label: '撤销',
        role: 'undo'
      },
      {
        label: '重做',
        role: 'redo'
      },
      { type: 'separator' },
      {
        label: '剪切',
        role: 'cut'
      },
      {
        label: '复制',
        role: 'copy'
      },
      {
        label: '粘贴',
        role: 'paste'
      }
    ]
  },
  {
    label: '帮助',
    submenu: [
      {
        label: '关于',
        role: 'about',
        click: () => {}
      }
    ]
  }
]
