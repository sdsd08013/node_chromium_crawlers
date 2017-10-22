const CronJob = require('cron').CronJob;
const workerJob = new CronJob({
  cronTime: '*/10 * * * * *', //毎10秒実行
  onTick: function() {
    //    console.log('Hoge !');
  },
  start: true,
  timeZone: 'Asia/Tokyo'
})
workerJob.start();
