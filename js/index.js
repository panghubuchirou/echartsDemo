$(function () {
    {
        // 故障设备监控区域的 类名点击
        let contents = $('.monitor .content');
        $('.monitor .tabs a').on('click', function () {
            $(this).addClass('active').siblings().removeClass('active');
            let index = $(this).data('index');
            contents.eq(index).show().siblings('.content').hide();
        });
        // 生成 一个相同的 页面 放置在后面
        // 然后用css3 动画 重复滚动操作
        $('.monitor .content .marquee').each(function (index, el) {
            let newRow = $(this).children().clone();
            $(this).append(newRow);
        })

    }
    // 点位 饼状图
    {
        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            series: [{
                name: '数据显示',
                type: 'pie',
                radius: ['10%', '70%'],
                center: ['50%', '50%'],
                roseType: 'area',
                data: [{
                        value: 20,
                        name: '云南'
                    },
                    {
                        value: 26,
                        name: '北京'
                    },
                    {
                        value: 24,
                        name: '山东'
                    },
                    {
                        value: 25,
                        name: '河北'
                    },
                    {
                        value: 20,
                        name: '江苏'
                    },
                    {
                        value: 25,
                        name: '浙江'
                    },
                    {
                        value: 30,
                        name: '四川'
                    },
                    {
                        value: 42,
                        name: '湖北'
                    }
                ],
                color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
                label: {
                    fontSize: 10
                },
                // 引导线调整
                labelLine: {
                    // 连接扇形图线长
                    length: 8,
                    // 连接文字线长
                    length2: 10
                }
            }]
        };
        let pie = $('.pie')[0];
        var myChart = echarts.init(pie);
        myChart.setOption(option);

    }
    // 中间 柱状图
    {
        let item = {
            name: '',
            value: 1200,
            itemStyle: {
                color: '#254065'
            },
            tooltip: {
                show: false,
            }
            //   tooltip: {
            //     extraCssText: 'opacity:0'
            //   }
        }
        option = {
            tooltip: {
                // 轴上触发
                // trigger: 'axis',
                trigger: 'item',
            },
            grid: {
                left: '0%',
                right: '3%',
                bottom: '3%',
                top: '3%',
                containLabel: true,
            },
            xAxis: [{
                type: 'category',
                data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
                axisTick: {
                    alignWithLabel: false,
                    show: false,
                },
                axisLabel: {
                    color: '#4c9bfd'
                },

            }],
            yAxis: [{
                type: 'value',
                splitLine: {
                    lineStyle: {
                        color: 'rgba(0, 240, 255, 0.3)'
                    }
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    color: '#4c9bfd'
                },
            }],
            series: [{
                name: '数据信息',
                type: 'bar',
                barWidth: '60%',
                data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240],
                itemStyle: {
                    // 提供的工具函数生成渐变颜色
                    color: new echarts.graphic.LinearGradient(
                        // (x1,y2) 点到点 (x2,y2) 之间进行渐变
                        0, 0, 0, 1,
                        [{
                                offset: 0,
                                color: '#00fffb'
                            }, // 0 起始颜色
                            {
                                offset: 1,
                                color: '#0061ce'
                            } // 1 结束颜色
                        ]
                    )
                }
            }]
        };
        let bar = $('.bar')[0];
        var myChart = echarts.init(bar);
        myChart.setOption(option);

    }

    // 右侧订单 自动点击部分
    {
        let order = $('.order .data h4').eq(0);
        let amount = $('.order .data h4').eq(1);
        let data = {
            day365: {
                orders: '20,301,987',
                amount: '99834'
            },
            day90: {
                orders: '301,987',
                amount: '9834'
            },
            day30: {
                orders: '1,987',
                amount: '3834'
            },
            day1: {
                orders: '987',
                amount: '834'
            }
        }
        // 时间委托绑定点击事件
        $('.order .filter').on('click', 'a', function () {
            $(this).addClass('active').siblings().removeClass('active');
            let key = $(this).data('key');
            order.text(data[key]['orders']);
            amount.text(data[key].amount);
            // 处理点击bug
            index = $(this).index();
            // 每次点击改变索引 再清除定时器加开启
            timerAuto();
        })

        let index = 0;
        let timer = null;
        let $a = $('.order .filter>a')
        timerAuto();

        function timerAuto() {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                if (index > $a.length - 1) {
                    index = 0;
                }
                $a.eq(index).click();
            }, 2000);
        }
    }

    // 销售额
    {
        option = {
            // 多条线条上面的缩略图
            legend: {
                data: ['预期销售额', '实际销售额'],
                right: '10%',
                textStyle: {
                    color: '#4c9bfd'
                }
            },
            // 工具提示
            tooltip: {
                trigger: 'axis'
            },
            // 设置网格样式
            grid: {
                show: true, // 显示边框
                top: '20%',
                left: '3%',
                right: '4%',
                bottom: '3%',
                borderColor: '#012f4a', // 边框颜色
                containLabel: true // 包含刻度文字在内
            },
            xAxis: {
                type: 'category',
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                axisTick: {
                    show: false // 去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd' // 文本颜色
                },
                axisLine: {
                    show: false // 去除轴线
                },
                boundaryGap: false // 去除轴内间距
            },
            yAxis: {
                type: 'value',
                axisTick: {
                    show: false // 去除刻度线
                },
                axisLabel: {
                    color: '#4c9bfd' // 文本颜色
                },
                splitLine: {
                    lineStyle: {
                        color: '#012f4a' // 分割线颜色
                    }
                }
            },
            series: [{
                    name: '预期销售额',
                    data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: '#00f2f1' // 线颜色
                    }
                },
                {
                    name: '实际销售额',
                    data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
                    type: 'line',
                    smooth: true,
                    itemStyle: {
                        color: '#ed3f35' // 线颜色
                    }
                }
            ]
        };
        let myChart = echarts.init($('.sales .line')[0])
        myChart.setOption(option);

        let data = {
            year: [
                [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
                [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
            ],
            quarter: [
                [23, 75, 12, 97, 21, 67, 98, 21, 43, 64, 76, 38],
                [43, 31, 65, 23, 78, 21, 82, 64, 43, 60, 19, 34]
            ],
            month: [
                [34, 87, 32, 76, 98, 12, 32, 87, 39, 36, 29, 36],
                [56, 43, 98, 21, 56, 87, 43, 12, 43, 54, 12, 98]
            ],
            week: [
                [43, 73, 62, 54, 91, 54, 84, 43, 86, 43, 54, 53],
                [32, 54, 34, 87, 32, 45, 62, 68, 93, 54, 54, 24]
            ]
        }
        $('.sales .caption').on('click', 'a', function () {

            let type = $(this).data('type');
            let arr = data[type];
            // 高亮显示
            $(this).addClass('active').siblings().removeClass('active');
            //替换数据
            option.series[0].data = arr[0];
            option.series[1].data = arr[1];
            // 重新渲染
            myChart.setOption(option);

            index = $(this).index() - 1;
            timerAuto();
        })

        let $a = $('.sales .caption>a');
        let index = 0;
        let timer = null;
        timerAuto();

        // 封装定时器
        function timerAuto() {
            clearInterval(timer);
            timer = setInterval(function () {
                index++
                if (index > $a.length - 1) {
                    index = 0;
                }
                $a[index].click();
            }, 2000)
        }
    }
    // 哇哈哈部分
    {
        let data = [{
                name: '可爱多',
                num: '9,086'
            },
            {
                name: '娃哈哈',
                num: '8,341'
            },
            {
                name: '喜之郎',
                num: '7,407'
            },
            {
                name: '八喜',
                num: '6,080'
            },
            {
                name: '小洋人',
                num: '6,724'
            },
            {
                name: '好多鱼',
                num: '2,170'
            },
        ]
        $('.top .province .sup').on('mouseover', 'li', function () {
            $(this).addClass('active').siblings().removeClass('active');
            data.sort(() => 0.5 - Math.random());
            let str = '';
            $.each(data, function (index, el) {
                str += `<li><span>${el.name}</span><span>${el.num} <s class="icon-up"></s></span></li>`
            })
            $('.top .province .sub').html(str);
            // console.log(index);
            index = $(this).index();
            timerAuto();
        })

        let timer = null;
        let index = 0;
        timerAuto();
        $('.top .province .sup>li').eq(0).mouseover();

        function timerAuto() {
            clearInterval(timer)
            timer = setInterval(function () {
                index++;
                if (index > 4) {
                    index = 0;
                }
                $('.top .province .sup>li').eq(index).mouseover();
            }, 1000)
        }
    }

    // 地图部分
    (function () {
        let geoCoordMap = {
            '新疆玛纳斯基地': [86.22, 44.30],
            '九江': [116.00, 29.70],
            '新乡': [116.402217, 35.311657],
            ' ': [79.92, 37.12],
            '  ': [86.85, 47.70],
            '若羌县': [88.17, 39.02],
            '上海': [121.4648, 31.2891],
            '东莞': [113.8953, 22.901],
            '东营': [118.7073, 37.5513],
            '中山': [113.4229, 22.478],
            '临汾': [111.4783, 36.1615],
            '临沂': [118.3118, 35.2936],
            '丹东': [124.541, 40.4242],
            '丽水': [119.5642, 28.1854],
            '乌鲁木齐': [87.9236, 43.5883],
            '佛山': [112.8955, 23.1097],
            '保定': [115.0488, 39.0948],
            '兰州': [103.5901, 36.3043],
            '包头': [110.3467, 41.4899],
            '北京': [116.4551, 40.2539],
            '北海': [109.314, 21.6211],
            '南京': [118.8062, 31.9208],
            '南宁': [108.479, 23.1152],
            '南昌': [116.0046, 28.6633],
            '南通': [121.1023, 32.1625],
            '厦门': [118.1689, 24.6478],
            '台州': [121.1353, 28.6688],
            '合肥': [117.29, 32.0581],
            '呼和浩特': [111.4124, 40.4901],
            '咸阳': [108.4131, 34.8706],
            '哈尔滨': [127.9688, 45.368],
            '唐山': [118.4766, 39.6826],
            '嘉兴': [120.9155, 30.6354],
            '大同': [113.7854, 39.8035],
            '大连': [122.2229, 39.4409],
            '天津': [117.4219, 39.4189],
            '太原': [112.3352, 37.9413],
            '威海': [121.9482, 37.1393],
            '宁波': [121.5967, 29.6466],
            '宝鸡': [107.1826, 34.3433],
            '宿迁': [118.5535, 33.7775],
            '常州': [119.4543, 31.5582],
            '广州': [113.5107, 23.2196],
            '廊坊': [116.521, 39.0509],
            '延安': [109.1052, 36.4252],
            '张家口': [115.1477, 40.8527],
            '徐州': [117.5208, 34.3268],
            '德州': [116.6858, 37.2107],
            '惠州': [114.6204, 23.1647],
            '成都': [103.9526, 30.7617],
            '扬州': [119.4653, 32.8162],
            '承德': [117.5757, 41.4075],
            '拉萨': [91.1865, 30.1465],
            '无锡': [120.3442, 31.5527],
            '日照': [119.2786, 35.5023],
            '昆明': [102.9199, 25.4663],
            '杭州': [119.5313, 29.8773],
            '枣庄': [117.323, 34.8926],
            '柳州': [109.3799, 24.9774],
            '株洲': [113.5327, 27.0319],
            '武汉': [114.3896, 30.6628],
            '汕头': [117.1692, 23.3405],
            '江门': [112.6318, 22.1484],
            '沈阳': [123.1238, 42.1216],
            '沧州': [116.8286, 38.2104],
            '河源': [114.917, 23.9722],
            '泉州': [118.3228, 25.1147],
            '泰安': [117.0264, 36.0516],
            '泰州': [120.0586, 32.5525],
            '济南': [117.1582, 36.8701],
            '济宁': [116.8286, 35.3375],
            '海口': [110.3893, 19.8516],
            '淄博': [118.0371, 36.6064],
            '淮安': [118.927, 33.4039],
            '深圳': [114.5435, 22.5439],
            '清远': [112.9175, 24.3292],
            '温州': [120.498, 27.8119],
            '渭南': [109.7864, 35.0299],
            '湖州': [119.8608, 30.7782],
            '湘潭': [112.5439, 27.7075],
            '滨州': [117.8174, 37.4963],
            '潍坊': [119.0918, 36.524],
            '烟台': [120.7397, 37.5128],
            '玉溪': [101.9312, 23.8898],
            '珠海': [113.7305, 22.1155],
            '盐城': [120.2234, 33.5577],
            '盘锦': [121.9482, 41.0449],
            '石家庄': [114.4995, 38.1006],
            '福州': [119.4543, 25.9222],
            '秦皇岛': [119.2126, 40.0232],
            '绍兴': [120.564, 29.7565],
            '聊城': [115.9167, 36.4032],
            '肇庆': [112.1265, 23.5822],
            '舟山': [122.2559, 30.2234],
            '苏州': [120.6519, 31.3989],
            '莱芜': [117.6526, 36.2714],
            '菏泽': [115.6201, 35.2057],
            '营口': [122.4316, 40.4297],
            '葫芦岛': [120.1575, 40.578],
            '衡水': [115.8838, 37.7161],
            '衢州': [118.6853, 28.8666],
            '西宁': [101.4038, 36.8207],
            '西安': [109.1162, 34.2004],
            '贵阳': [106.6992, 26.7682],
            '连云港': [119.1248, 34.552],
            '邢台': [114.8071, 37.2821],
            '邯郸': [114.4775, 36.535],
            '郑州': [113.4668, 34.6234],
            '鄂尔多斯': [108.9734, 39.2487],
            '重庆': [107.7539, 30.1904],
            '金华': [120.0037, 29.1028],
            '铜川': [109.0393, 35.1947],
            '银川': [106.3586, 38.1775],
            '镇江': [119.4763, 31.9702],
            '长春': [125.8154, 44.2584],
            '长沙': [113.0823, 28.2568],
            '长治': [112.8625, 36.4746],
            '阳泉': [113.4778, 38.0951],
            '青岛': [120.4651, 36.3373],
            '韶关': [113.7964, 24.7028]
        };

        let BJData = [
            [{
                name: '新乡'
            }, {
                name: '新乡',
                value: 200
            }],
            [{
                name: '新乡'
            }, {
                name: '呼和浩特',
                value: 90
            }],
            [{
                name: '新乡'
            }, {
                name: '哈尔滨',
                value: 90
            }],
            [{
                name: '新乡'
            }, {
                name: '石家庄',
                value: 90
            }],
            [{
                name: '新乡'
            }, {
                name: '昆明',
                value: 30
            }],
            [{
                name: '新乡'
            }, {
                name: '北京',
                value: 100
            }],
            [{
                name: '新乡'
            }, {
                name: '长春',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '重庆',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '贵阳',
                value: 50
            }],
            [{
                name: '新乡'
            }, {
                name: '南宁',
                value: 30
            }],
            [{
                name: '新乡'
            }, {
                name: '济南',
                value: 10
            }],
            [{
                name: '新乡'
            }, {
                name: '太原',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '西安',
                value: 60
            }],
            [{
                name: '新乡'
            }, {
                name: '武汉',
                value: 50
            }],
            [{
                name: '新乡'
            }, {
                name: '合肥',
                value: 40
            }],
            [{
                name: '新乡'
            }, {
                name: '南京',
                value: 30
            }],
            [{
                name: '新乡'
            }, {
                name: '沈阳',
                value: 20
            }],
            [{
                name: '新乡'
            }, {
                name: '成都',
                value: 10
            }]
        ];

        let SHData = [
            [{
                name: '九江'
            }, {
                name: '九江',
                value: 200
            }],

            [{
                name: '九江'
            }, {
                name: '长沙',
                value: 95
            }],
            [{
                name: '九江'
            }, {
                name: '武汉',
                value: 30
            }],
            [{
                name: '九江'
            }, {
                name: '南昌',
                value: 20
            }],
            [{
                name: '九江'
            }, {
                name: '合肥',
                value: 70
            }],
            [{
                name: '九江'
            }, {
                name: '南京',
                value: 60
            }],
            [{
                name: '九江'
            }, {
                name: '福州',
                value: 50
            }],
            [{
                name: '九江'
            }, {
                name: '上海',
                value: 100
            }],
            [{
                name: '九江'
            }, {
                name: '深圳',
                value: 100
            }],

        ];

        let GZData = [
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '新疆玛纳斯基地',
                value: 200
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '  ',
                value: 90
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: ' ',
                value: 40
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '呼和浩特',
                value: 90
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '昆明',
                value: 40
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '成都',
                value: 10
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '兰州',
                value: 95
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '银川',
                value: 90
            }],
            [{
                name: '新疆玛纳斯基地'
            }, {
                name: '西宁',
                value: 80
            }],

        ];

        let planePath = 'path://M.6,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705';

        let convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var fromCoord = geoCoordMap[dataItem[0].name];
                var toCoord = geoCoordMap[dataItem[1].name];
                if (fromCoord && toCoord) {
                    res.push([{
                        coord: fromCoord
                    }, {
                        coord: toCoord
                    }]);
                }
            }
            return res;
        };

        let color = ['#3ed4ff', '#ffa022', '#a6c84c'];
        let series = [];
        [
            ['新乡', BJData],
            ['九江', SHData],
            ['新疆', GZData]
        ].forEach(function (item, i) {
            series.push({
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 1,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0.7,
                    color: '#fff',
                    symbolSize: 3
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 0,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0] + ' Top10',
                type: 'lines',
                zlevel: 2,
                effect: {
                    show: true,
                    period: 6,
                    trailLength: 0,
                    symbol: planePath,
                    symbolSize: 15
                },
                lineStyle: {
                    normal: {
                        color: color[i],
                        width: 1,
                        opacity: 0.4,
                        curveness: 0.2
                    }
                },
                data: convertData(item[1])
            }, {
                name: item[0] + ' Top10',
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    brushType: 'stroke'
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    }
                },
                symbolSize: function (val) {
                    return val[2] / 8;
                },
                itemStyle: {
                    normal: {
                        color: color[i]
                    }
                },
                data: item[1].map(function (dataItem) {
                    return {
                        name: dataItem[1].name,
                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                    };
                })
            });
        });

        option1 = {
            backgroundColor: '#080a20',
            // title: {
            //     text: '模拟迁徙',
            //     subtext: '数据纯属虚构',
            //     left: 'left',
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'bottom',
                left: 'right',
                data: ['北京 Top10', '上海 Top10', '广州 Top10'],
                textStyle: {
                    color: '#fff'
                },
                selectedMode: 'single'
            },
            geo: {
                map: 'china',
                zoom: 1.2,
                label: {
                    emphasis: {
                        show: false
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#142957',
                        borderColor: '#0692a4'
                    },
                    emphasis: {
                        areaColor: '#0b1c2d'
                    }
                }
            },
            series: series
        };
        // 使用配置即可...
        let myecharts = echarts.init($('.map .chart .geo')[0])
        myecharts.setOption(option1)
    })();

    // 一季度销售进度
    {
        var option2 = {
            series: [{
                type: 'pie',
                radius: ['130%', '150%'], // 放大图形
                center: ['48%', '80%'], // 往下移动  套住75%文字
                label: {
                    show: false,
                },
                startAngle: '180', //起始角度 180°
                hoverOffset: 0, // 鼠标经过不变大
                data: [{
                        value: 100,
                        itemStyle: { // 颜色渐变#00c9e0->#005fc1
                            color: {
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                        offset: 0,
                                        color: '#00c9e0'
                                    },
                                    {
                                        offset: 1,
                                        color: '#005fc1'
                                    }
                                ]
                            }
                        }
                    },
                    {
                        value: 100,
                        itemStyle: {
                            color: '#12274d'
                        }
                    }, // 颜色#12274d
                    {
                        value: 200,
                        itemStyle: {
                            color: 'transparent'
                        }
                    }

                ]
            }]
        }
        let myChart = echarts.init($('.quarter .gauge')[0]);
        myChart.setOption(option2);
    }
})