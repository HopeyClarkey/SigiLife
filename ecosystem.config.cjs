module.exports = {
  apps: [
    {
      name: 'sigilife',
      script: './node_modules/.bin/tsx',
      args: 'server/index.ts',
      cwd: '/home/ec2-user/SigiLife',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
    },
  ],
};
