'use strict'
const { Op } = require('sequelize');
const KAD_URL = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst';
const serviceKey = 'bvv7pm5QuY3jE0aW7O9iteO5KDDKw2tRXReLN5ZZqneGrMFJhH7j37sgs3QV0UMKyvKnCoGLyf%2BVsRYBInLVeQ%3D%3D';
const request = require('request');
const moment = require('moment');
 //(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4), 구름조금(2) 
        //(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)
const { clothtb, colortb, foodtb, itemtb, seasontb, weathertb } = require('../models');
const skyCode = {
    sunny: 1,
    sCloud: 2,
    MCloud: 3,
    BCloud: 4
};
const ptyCode = {
    clear: 0,
    rain: 1,
    snow: 3,
};
const kadResOK = '00';
const resOK = 0;
let retryCnt = 0;
let ectErr = 1;
// 기상청 조회 => 날씨정보, 기상정보 추출 => 의상, 물건 ,색 조회 전송
class weatherService {
    constructor() {
    }

    fnMakeBaseDate(seekTime) {
        let baseDate;
        if(seekTime >= '2300') {
            baseDate = moment().add("-1","d").format('YYYYMMDD');
        } else {
            baseDate = moment().format('YYYYMMDD');
        } 
        return baseDate;
    }
    fnMakeBaseTime() {
        let baseTime = moment().format('HH00'); 
        return baseTime;
    }

    fnMakeSeekTime() {
        let baseTime = moment().add("-1", "h").format('HH30'); // 현재기준 1시간 전 시간호출
        return baseTime;
    }

    /**수동날씨 지정 */
    fnCallLocal(weatherCode) {
        let temperature;
        let pty;
        let sky;
        let humidity;
        let weatherData;

        switch(weatherCode) {
            case 1: { // 춥고 맑음
                temperature = -10;
                pty = 0;
                sky = 1;
                humidity = 40;
                break;
            }
            case 2: {// 춥고 흐리고 눈
                temperature = -3;
                pty = 3;
                sky = 3;
                humidity = 40;
                break;
            }
            case 3:{ // 춥고 흐림
                temperature = -5;
                pty = 3;
                sky = 3;
                humidity = 40;
                break;
            }
            case 4:{ // 덥고 맑음
                temperature = 28;
                pty = 0;
                sky = 1;
                humidity = 40;
                break;
            }
            case 5: { // 덥고 비
                temperature = -10;
                pty = 1;
                sky = 3;
                humidity = 40;
                break;
            }
            case 6: { // 겨울왕국
                temperature = -100;
                pty = 7;
                sky = 3;
                humidity = 40;
                break;
            } 
            case 7: { // 찜통
                temperature = 100;
                pty = 0;
                sky = 1;
                humidity = 0;
                break;
            }
        }
        weatherData = {
            sky,
            temperature,
            humidity,
            pty
        }
        return weatherData;
    }
    //호출실패시 재호출 기능 추가
    async fnCallKmc(serviceKey, baseDate, baseTime, seekTime) {
        return new Promise(function(resolve, reject) {
            let allUrl = KAD_URL+"?serviceKey="+serviceKey+"&pageNo=1&numOfRows=60"+"&dataType=json"+"&base_date="+baseDate+"&base_time="+seekTime+"&nx=88"+"&ny=90";
            let errRes;
            request(allUrl, (err, res, body) => {
                if(err) { 
                    errRes = JSON.parse(body);
                    console.log(err);
                    reject(errRes)
                } else {
                    try {
                            let apiData = JSON.parse(body);
                            let resCode = apiData.response.header.resultCode;
                            
                            if( resCode === kadResOK ) {
                                let resBody = apiData.response.body.items;
                                let sky = null;
                                let temperature = null;
                                let humidity = null;
                                let pty = null;

                                for(let i = 0 ; i < resBody.item.length ; i++) {
                                    if (sky !== null && temperature !== null && humidity !== null)
                                        break;
                                    let seekFcstTime = resBody.item[i].fcstTime;
                                    if (seekFcstTime === undefined)
                                        break;
                                    if(seekFcstTime === baseTime) {
                                        switch(resBody.item[i].category) {
                                            case 'SKY': sky = resBody.item[i].fcstValue; // 하늘상태
                                            break;
                                            case 'T1H': temperature = resBody.item[i].fcstValue; // 기온
                                            break;
                                            case 'REH': humidity = resBody.item[i].fcstValue; // 습도
                                            break;
                                            case 'PTY': pty = resBody.item[i].fcstValue; // 강수형태
                                        }
                                    }
                                }
                                if(pty>ptyCode.clear && pty!=pty.rain) {
                                    pty = ptyCode.rain;
                                }
                                if(sky>skyCode.sunny && sky!=skyCode.sCloud) {
                                    sky = skyCode.sCloud;
                                }

                                resolve({
                                    sky,
                                    temperature,
                                    humidity,
                                    pty
                                });
                            } else {
                                reject("기상청 api 오류발생:"+`${errRes.response.header.resultMsg}\n`)
                            }
                        } catch(execept) {
                            reject(execept);    
                        }
                    }
            });  
        });
        
    }

    fnSendRes(items, res) {
        res.send({
            resCode: resOK,
            resMsg: "ResOK",
            items: items
        });
    }

    async fnGetItem(weatherData) { //결과 전송
        //(SKY) 코드 : 맑음(1), 구름많음(3), 흐림(4), 구름조금(2) 
        //(PTY) 코드 : 없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4), 빗방울(5), 빗방울/눈날림(6), 눈날림(7)

        //날씨 조회
        let getWeather = await weathertb.findOne({
            attributes : ['wsn', 'weatherText'], // 계절 ID, 이름
            where : { 
                [Op.and]: {
                    maxtemp: {
                        [Op.lte]: weatherData.temperature
                    },
                    mintemp: {
                        [Op.gt]: weatherData.temperature
                    }
                }
            }        
        });

        let wTopCloth = await clothtb.findAll({ //상의 : 옷 선택 기준 -> 온도
            attributes : ['csn', 'clothName', 'clothGen', 'clothText'],
            where: {
                [Op.and]: {
                    wsn: getWeather.wsn,
                    clothcat: 'T',
                    [Op.or]:[
                        {clothgen: 'A'},
                        {clothgen: 'W'}
                    ]
                }
            }
        });

        let mTopCloth = await clothtb.findAll({ //상의 : 옷 선택 기준 -> 온도
            attributes : ['csn', 'clothName', 'clothGen', 'clothText'],
            where: {
                [Op.and]: {
                    wsn: getWeather.wsn,
                    clothcat: 'T',
                    clothgen: 'A'
                    }
                }
            });

        let wBotCloth = await clothtb.findAll({ //여성하의 : 옷 선택 기준 -> 온도
            attributes : ['csn', 'clothName', 'clothGen', 'clothText'],
                where: {
                    [Op.and]: {
                        wsn: getWeather.wsn,
                        clothcat: 'B',
                        [Op.or]:[
                            {clothgen: 'A'},
                            {clothgen: 'W'}
                        ]
                    }
                }
            });
        
      let mBotCloth = await clothtb.findAll({ //상의 : 옷 선택 기준 -> 온도
          attributes : ['csn', 'clothName', 'clothGen', 'clothText'],
          where: {
              [Op.and]: {
                  wsn: getWeather.wsn,
                  clothcat: 'B',
                  clothgen: 'A'
                  }
              }
          });

        let ectCloth = await clothtb.findAll({ //기타 : 옷 선택 기준 -> 온도
            attributes : ['csn', 'clothName', 'clothGen', 'clothText'],
            where: {
                [Op.and]: {
                    wsn: getWeather.wsn,
                    clothcat: 'E'
                }
            }
        });

        let color = await colortb.findAll({ // 색 선택 기준 -> 하늘상태
            attributes : ['clsn', 'colorName', 'colorText'],
            where: {
                [Op.and]: { 
                    wsn: getWeather.wsn,
                    todaysky: weatherData.sky    
                }
            }
        });

        let mainFood = await foodtb.findAll({ // 음식 선택 기준 -> 오늘 기상, 온도
            attributes: ['fsn', 'foodCat', 'foodName'],
            where: {
                [Op.and]: { 
                    wsn: getWeather.wsn,
                    todaypty: weatherData.pty,
                    foodcat: 'M' 
                }
            }
        });

        let dessertFood = await foodtb.findAll({ // 음식 선택 기준 -> 오늘 기상, 온도
            attributes: ['fsn', 'foodCat', 'foodName'],
            where: {
                [Op.and]: { 
                    wsn: getWeather.wsn,
                    todaypty: weatherData.pty,
                    foodcat: 'D' 
                }
            }
        });

        let item = await itemtb.findAll({ // 물건 선택 기준 -> 오늘 기상, 온도
            attributes: ['isn', 'itemName', 'itemText'],
            where: {
                [Op.and]: { 
                    wsn: getWeather.wsn,
                    todaypty: weatherData.pty    
                }
            }
        });

        let items = {
            weatherData, //현재날씨 정보
            getWeather, //획득기온 정보 => DB저장 날씨정보(날씨이름, 로그)
            wTopCloth,
            mTopCloth,
            wBotCloth,
            mBotCloth,
            ectCloth,
            color,
            mainFood,
            dessertFood,
            item
        };
        return items;
    } 
    async main(userData, res) { //userData => {성별정보, 요청방식}
        try {
            let seekTime =  "2300"; //탐색시간
            let baseDate =  this.fnMakeBaseDate(seekTime); //기준날짜
            let baseTime =  this.fnMakeBaseTime(); //기준시간
            let weatherData;
            if(userData.reqCode === 'T' ){
                weatherData = this.fnCallLocal(userData.weatherCode);
            }
            else 
                weatherData = await this.fnCallKmc(serviceKey, baseDate, baseTime, seekTime); // 기상청 조회
            
            let items = await this.fnGetItem(weatherData);
            this.fnSendRes(items, res);
        } catch(error) {
            console.log(error);
            res.send({
                resCode: ectErr,
                resMsg: "기상청 데이터 호출실패:" + `${error}\n`
            });
        }
    }

}

//+ 21.10.19 => 테스트 데이터 삽입 및 코드 테스트 실행, 수정 DB 적용, 테스트 테이터 excel 정리하기
//+ 21.10.20 => 음식, 아이템 색깔 테스트 코드 추가 및 쿼리 작성
module.exports = weatherService;