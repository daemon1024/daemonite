const magicModuleHeader = [0x00, 0x61, 0x73, 0x6d];
const moduleVersion = [0x01, 0x00, 0x00, 0x00];

exports.emitter = () =>
  Uint8Array.from([...magicModuleHeader, ...moduleVersion]);
