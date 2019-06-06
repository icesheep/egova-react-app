/* eslint-disable eqeqeq */
import React, {useState} from 'react';
import Rect from '@/components/Rect';
import Map from '@/components/Map';
import ReactEcharts from 'echarts-for-react';
import './index.less';
import {testData} from './testData';
function Home(props) {
  const [_emap, setEmap] = useState(null);

  const data1 = testData.resultInfo.data.data.slice(0,3)
  const data2 = testData.resultInfo.data.data.slice(3,6)

  const renderMap = () => {
    var data = [{
      name: '沛县',
      x: 116.90025914518057,
      y: 34.69828883914896,
      value:355
    },{
      name: '丰县',
      x: 116.59687786693722,
      y: 34.67151990283337,
      value:255
    },{
      name: '邳州',
      x: 117.89070978885744,
      y: 34.350292667046276,
      value:308
    },{
      name: '新沂',
      x: 118.35470468499433,
      y: 34.27593451061408,
      value:216
    },{
      name: '睢宁',
      x: 117.88178681008557,
      y: 33.9279383385114,
      value:185
    }];
    var color = '#0082EB';
    var param = {minRadius:20,rangeRadius:20};
    _emap.addCircleChart('案件',data,color,param)
}


  const getOption1 = data => ({
      color: ['#009CFF', '#21D956', '#FBAF3B'],
      tooltip: {
        trigger: 'item',
      },
      grid: {
        left: 0,
        top: 0,
        bottom: 0
      },
      legend: {
        orient: 'vertical',
        icon: "circle",
        right: 'right',
        top: 'middle',
        data: ['立案数', '派遣数', '处置数'],
        formatter: function (name) {
          if(name == '立案数') {
            return name + '   ' + data.num1
          }else if(name == '派遣数') {
            return name + '   ' + data.num2
          }else if(name == '处置数') {
            return name + '   ' + data.num3
          }
        },
        textStyle: {
          color: 'white'
        }
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          center : ['30%', '50%'],
          radius: ['50%', '100%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: data.num1, name: '立案数' },
            { value: data.num2, name: '派遣数' },
            { value: data.num3, name: '处置数' }
          ]
        }
      ],
    }
  );
  const getOption2 = (data) => ({
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 15,
    },
    xAxis: [{
      type: 'value',
      max: 100,
      show: false,
    }],
    yAxis: [{
      type: 'category',
      data: ['结案率','处置率','立案率'],
      splitLine: {
        show: false
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      }
    }],
    series: [{
      type: 'bar',
      barWidth: 10,
      barCategoryGap: '20%',
      silent: true,
      zlevel: 1,
      label: {
        normal: {
          position: 'insideTopLeft',
          offset: [0, 10],
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          formatter: function (params) {
            return params.name
          }
        }
      },
      itemStyle: {
        normal: {
          barBorderRadius: [10, 10, 10, 10],
          color: '#41E4FF'
        }
      },
      data: [data.num3,data.num2,data.num1],
    }, {
      type: 'bar',
      silent: true,
      barWidth: 10,
      barGap: '-100%',
      barCategoryGap: '20%',
      label: {
        normal: {
          position: 'insideTopRight',
          offset: [0, 10],
          show: true,
          textStyle: {
            color: '#fff',
            fontSize: 14,
          },
          formatter: function (params) {
            return data['num'+(2-params.dataIndex+1)]+'%'
          }
        }
      },
      itemStyle: {
        normal: {
          barBorderRadius: [10, 10, 10, 10],
          color: '#6485D6'
        }
      },
      data: [100,100,100],
    }]
  });
  return (
    <div className="home-box">
      <div className="home-box-left">
        {data1.map(item =>
          <div className="home-box-devide">
            <Rect title={item.name}>
              <div className="home-rect-content">
                <div className="top">
                  <div className="title">
                    <div className="num">{item.num1}</div>
                    <div className="text">系统覆盖面积</div>
                  </div>
                  <div className="title">
                    <div className="num">{item.num2}</div>
                    <div className="text">单元网格数量</div>
                  </div>
                  <div className="title">
                    <div className="num">{item.num3}</div>
                    <div className="text">责任网格数量</div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="chart">
                    <ReactEcharts
                      option={getOption1(item.data1)}
                      notMerge
                      lazyUpdate
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                  <div className="chart">
                    <ReactEcharts
                      option={getOption2(item.data2)}
                      notMerge
                      lazyUpdate
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </Rect>
          </div>)}
      </div>
      <div className="home-box-middle">
          <div className="total">
            <div className="text">总面积<span>11258</span>km²</div>
            <div className="text">覆盖面积<span>955</span>km²</div>
            <div className="text">下辖<span>5</span>区、<span>3</span>县、<span>2</span>县级市</div>
          </div>
          <Map getMapInstance={(ref) => { setEmap(ref) }} callback={renderMap}/>
      </div>
      <div className="home-box-right">
        {data2.map(item =>
          <div className="home-box-devide">
            <Rect title={item.name}>
              <div className="home-rect-content">
                <div className="top">
                  <div className="title">
                    <div className="num">{item.num1}</div>
                    <div className="text">系统覆盖面积</div>
                  </div>
                  <div className="title">
                    <div className="num">{item.num2}</div>
                    <div className="text">单元网格数量</div>
                  </div>
                  <div className="title">
                    <div className="num">{item.num3}</div>
                    <div className="text">责任网格数量</div>
                  </div>
                </div>
                <div className="bottom">
                  <div className="chart">
                    <ReactEcharts
                      option={getOption1(item.data1)}
                      notMerge
                      lazyUpdate
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                  <div className="chart">
                    <ReactEcharts
                      option={getOption2(item.data2)}
                      notMerge
                      lazyUpdate
                      style={{ height: '100%', width: '100%' }}
                    />
                  </div>
                </div>
              </div>
            </Rect>
          </div>)}
      </div>
    </div>
  );
}
export default Home;

