const envs = {
  PORT: parseInt(process.env.PORT || '3000'),
  NOTES_APP_MONGODB_HOST: process.env.NOTES_APP_MONGODB_HOST,
  NOTES_APP_MONGODB_DATABASE: process.env.NOTES_APP_MONGODB_DATABASE,
  NAME: process.env.NAME,
};

export default envs;