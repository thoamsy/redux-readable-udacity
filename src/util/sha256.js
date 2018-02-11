function sha256(str) {
  // We transform the string into an arraybuffer.
  var buffer = new TextEncoder('utf-8').encode(str);
  return (crypto.subtle || crypto.webkitSubtle)
    .digest('SHA-256', buffer)
    .then(hex);
}

function hex(buffer) {
  let hexCodes = '';
  const view = new DataView(buffer);
  for (let i = 0; i < view.byteLength; i += 4) {
    // Using getUint32 reduces the number of iterations needed (we process 4 bytes each time)
    const value = view.getUint32(i);
    // toString(16) will give the hex representation of the number without padding
    const stringValue = value.toString(16);
    // We use concatenation and slice for padding
    const paddedValue = stringValue.padStart(8, '0');
    hexCodes += paddedValue;
  }

  return hexCodes;
}
export default sha256;
