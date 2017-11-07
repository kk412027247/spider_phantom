const phantom = require('phantom');
const cheerio = require('cheerio');

const getList = async (url)=>{
  const instance = await phantom.create(['--ignore-ssl-errors=yes','--load-images=no','--disk-cache=yes']);
  const page = await instance.createPage();
  page.setting('resourceTimeout',10000);
  // await page.on('onResourceRequested',requestData=>{
  //   console.info('Requesting', requestData.url)
  // });

  const status = await page.open(url);
  console.log('status1', status);
  const content = await page.property('content');

  const $ = await cheerio.load(content);
  const list = await $('div.info div.title a').map((index, element)=>({url: element.attribs.href})).toArray();
  await instance.exit();
  return list;
};

//getList('http://mobile.zol.com.cn/').then(console.log).catch(console.log);


const getUrl = async (url)=>{
  const instance = await phantom.create(['--ignore-ssl-errors=yes','--load-images=no','--disk-cache=yes']);
  const page = await instance.createPage();
  page.setting('resourceTimeout',10000);
  // await page.on('onResourceRequested',requestData=>{
  //   console.info('Requesting', requestData.url)
  // });

  const status = await page.open(url);
  console.log('status2', status);
  const content = await page.property('content');

  const $ = await cheerio.load(content);
  const detail = 'http://detail.zol.com.cn'+$('div#_j_tag_nav ul li a').eq(4).attr('href');
  const price = $('b.price-type').text();

  await instance.exit();
  return {detail, price};
};

//getUrl('http://detail.zol.com.cn/cell_phone/index1181567.shtml').then(console.log).catch(console.log);

const getDetail = async(url)=>{
  const instance = await phantom.create(['--ignore-ssl-errors=yes','--load-images=no','--disk-cache=yes']);
  const page = await instance.createPage();
  page.setting('resourceTimeout',10000);
  // await page.on('onResourceRequested',requestData=>{
  //   console.info('Requesting', requestData.url)
  // });

  const status = await page.open(url);
  console.log('status3', status);
  const content = await page.property('content');

  const $ = await cheerio.load(content);
  const message = $('div.section-param-header h3').text();

  await instance.exit();
  return {message};
};


(async function(){
  const list = await getList('http://mobile.zol.com.cn/');
  console.log(list);

  for (let item of list){
    const url = await getUrl(item.url);
    console.log(url);
  }

  // const url=  await getUrl('http://detail.zol.com.cn/cell_phone/index1181567.shtml');
  // console.log(url);
  const detail = await getDetail('http://detail.zol.com.cn/1182/1181567/param.shtml');
  console.log(detail);
}());



















// for (let item of urls){
//   const status = await page.open(item.url);
//   console.log('status2', status);
//   const content = await page.property('content');
//   const $ = await cheerio.load(content);
//   const price = await $('div.price b').eq(3).text();
//   const detailUrl =  'http://detail.zol.com.cn'+$('div#_j_tag_nav ul li a').eq(4).attr('href');
//
//   const status3 = await page.open(detailUrl);
//   console.log('status3', status3);
//   const content3 = await page.property('content');
//   const $3 = await cheerio.load(content3);
//   const message =  await $3('div.section-param-header h3').text();
//   console.log(message);
//
//   await detail.push({...item, detailUrl, price, status, message});




