const fs = require('fs');
const phantom = require('phantom');//导入模块
(async function() {
  const instance = await phantom.create([
    //忽略ssl错误
    '--ignore-ssl-errors=yes',
    //不加载图片
    '--load-images=no',
    //保存缓存
    '--disk-cache=yes',
  ]);
  const page = await instance.createPage();
  await page.on("onResourceRequested", (requestData)=> {
    console.info('Requesting', requestData.url) ;
  });

  //设置链接超时（10秒）
  page.setting('resourceTimeout',10000);

  const status = await page.open('http://detail.zol.com.cn/1169/1168796/param.shtml');
  console.log(status);

  const content = await page.property('content');

  await fs.writeFile('5.txt', content,err=>{
    if(err)console.log(err)
  });

  
  const status2 = await page.open('http://detail.zol.com.cn/1168/1167243/param.shtml');
  console.log(status2);

  const content2 = await page.property('content');


  await fs.writeFile('6.txt',content2 ,err=>{
    if(err)console.log(err)
  });



  await instance.exit();
}());

