export const getCurrentPlatform = () => process.platform

export const workInMac = () => getCurrentPlatform() === 'darwin'
