module.exports = {
  apps: [{
    name: 'redux-genie-homepage',
    script: './server'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: process.env.addy,
      key: process.env.key,
      ref: 'origin/master',
      repo: 'https://github.com/lovely-libras/redux-genie-homepage.git',
      path: '/home/ubuntu/redux-genie-homepage',
      'post-deploy': 'sudo npm install && sudo pm2 startOrRestart ecosystem.config.js'
    }
  }
}