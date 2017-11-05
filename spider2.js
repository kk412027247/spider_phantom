const phantom = require('phantom');

(async function(){
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

  page.setting('resourceTimeout',10000);
  const state = await page.open('http://detail.zol.com.cn/1162/1161385/param.shtml');
  console.log(state);

  const list = await page.evaluate(function(){
    return $('#newTb table li span').text()
  });

  console.log(list);

  await instance.exit();

  

  
  


}());
