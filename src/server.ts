import 'dotenv/config';

import { app } from './app';

const appPort = Number(process.env.APP_PORT || 3550);

app.listen(appPort, () => {
  console.info(
    `Service running on port '${appPort}' (${process.env.NODE_ENV})`,
  );
});
