const dotenv = require('dotenv');
const fs = require('fs');
let envFiles = [];

const setEnvConfig = ({ command, mode }) => {
  if (command === 'serve') {
    // serve 独有配置
    envFiles = [
      /** mode file */
      `.env.${mode}`
    ];
  } else {
    // build 独有配置
    envFiles = [
      /** mode file */
      `.env.${mode}`
    ];
  }
  for (const file of envFiles) {
    const envConfig = dotenv.parse(fs.readFileSync(file));
    for (const k in envConfig) {
      process.env[k] = envConfig[k];
    }
  }
};

export default setEnvConfig;
