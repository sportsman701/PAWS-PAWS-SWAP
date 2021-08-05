const ipfsClient = require('ipfs-api');
const ipfs = new ipfsClient({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https'
});

export const getImageIpfsHash = async (data) => {
  const result = await ipfs.files.add(data);
  const hash = result[0].hash;
  return hash;
};

export function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = () => {
      resolve(Buffer.from(reader.result));
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  })
}