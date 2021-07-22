// Initiallising connection string
export const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST,
  database: process.env.DB_NAME,
  options: {
    trustedconnection: true,
    enableArithAbort: true,
    instancename: process.env.INSTANCE,
  },
  port: Number(process.env.DB_PORT),
};
