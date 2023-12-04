import { ElectronAPI } from '@electron-toolkit/preload'
import type { SerialPort } from 'serialport'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {}
  }
}
