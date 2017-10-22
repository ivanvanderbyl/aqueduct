import * as fs from 'fs';
import * as request from 'superagent';
import * as yargs from 'yargs';
import * as Swagger from './swagger';

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0 as any;
const baseApiUrl = yargs.argv.baseApiUrl;
if (!baseApiUrl) {
  throw new Error('No baseApiUrl provided.');
}

const getSwaggerJson = () => {
  return new Promise<Swagger.ISpec>((resolve, _reject) => {
    request
      .get(`${baseApiUrl}/swagger.json`)
      .set('Accept', 'application/json')
      .end((_, res) => {
        resolve(res.body);
      });
  });
};

(async () => {
  const spec = await getSwaggerJson();
  fs.writeFileSync('./swagger.json', JSON.stringify(spec));
})();
