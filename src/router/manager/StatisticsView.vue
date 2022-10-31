<template>
  <div>
    <n-page-header subtitle="嘉晚饭军火展示">
      <n-grid :cols="5">
        <n-gi>
          <n-statistic label="骑手" :value="totalStatistic.riderCount + '名'">
            <template #prefix>
              <n-icon>
                <VehicleBicycle20Regular />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="店铺" :value="totalStatistic.shopCount + '个'">
            <template #prefix>
              <n-icon>
                <BuildingShop20Regular />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="菜品" :value="totalStatistic.foodCount + '种'">
            <template #prefix>
              <n-icon>
                <FoodPizza20Regular />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="今日订单" :value="totalStatistic.orderCount + '份'">
            <template #prefix>
              <n-icon>
                <AppGeneric20Regular />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
        <n-gi>
          <n-statistic label="用户总数" :value="totalStatistic.userCount + '位'">
            <template #prefix>
              <n-icon>
                <Person20Regular />
              </n-icon>
            </template>
          </n-statistic>
        </n-gi>
      </n-grid>
      <template #title>
        <span>晚比晚几</span>
      </template>
      <template #header>
        一个普通的数据展示区，基于highcharts
      </template>
      <template #avatar>
        <n-avatar src="/logo.png" />
      </template>
      <template #extra>
        <n-space>
          <n-button @click="refresh">刷新</n-button>
        </n-space>
      </template>
      <template #footer>
        截止到 {{ time }}
      </template>
    </n-page-header>

    <n-grid :cols="24" x-gap="10" y-gap="10">
      <n-gi :span="12">
        <n-card hoverable>
          <high-charts :options="optForOrderCount"></high-charts>
        </n-card>
      </n-gi>
      <n-gi :span="12">
        <n-card hoverable>
          <high-charts :options="optForFeetback"></high-charts>
        </n-card>
      </n-gi>
      <n-gi :span="12">
        <n-card hoverable>
          <high-charts :options="optForScore"></high-charts>
        </n-card>
      </n-gi>
      <n-gi :span="12">
        <n-card hoverable>
          <highCharts :options="optForUserPicture"></highCharts>
        </n-card>
      </n-gi>
    </n-grid>
  </div>
</template>

<script>
import { Chart } from 'highcharts-vue'
import { defineComponent, reactive } from "vue";
import { useMessage } from "naive-ui";
import { VehicleBicycle20Regular, BuildingShop20Regular, FoodPizza20Regular, Person20Regular, AppGeneric20Regular } from '@vicons/fluent';
import formatDate from '../../utils/formatDate';
export default defineComponent({
  components: {
    VehicleBicycle20Regular, BuildingShop20Regular, FoodPizza20Regular, Person20Regular, AppGeneric20Regular,
    highCharts: Chart
  },
  setup() {
    function getTime() {
      let dt = new Date();
      return formatDate(dt, 'yyyy年MM月dd日 hh:mm:ss')
    }
    function getData() {
      let dt = new Date(Date.now() - 24 * 60 * 60 * 1000);
      optForOrderCount.plotOptions.series.pointStart = Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate());
      optForFeetback.series[0].data = [...(["热菜", "凉菜", "主食", "小吃", "饮品", "汤羹", "西餐", "烘焙"].map((v) => {
        return {
          name: v,
          y: Math.random() * 100
        }
      }))]
      optForScore.series[0].data = [['1⭐', 45.0],
      ['2⭐', 26.8],
      ['3⭐', 12.8],
      ['4⭐', 8.5],
      ['5⭐', 6.2]]
      optForUserPicture.series[0].data = [Math.floor(Math.random() * 10000),
      Math.floor(Math.random() * 10000),
      Math.floor(Math.random() * 10000),
      Math.floor(Math.random() * 10000)]
      totalStatistic.riderCount = 110;
      totalStatistic.shopCount = 102;
      totalStatistic.userCount = 103;
      totalStatistic.orderCount = 120;
      totalStatistic.foodCount = 140;
    }
    const message = useMessage();
    const optForScore = reactive({
      title: {
        text: '评分',
        align: 'center',
        verticalAlign: 'middle',
        y: 50
      },
      tooltip: {
        headerFormat: '{series.name}<br>',
        pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          dataLabels: {
            enabled: true,
            distance: -50,
            style: {
              fontWeight: 'bold',
              color: 'white',
              textShadow: '0px 1px 2px black'
            }
          },
          startAngle: -90, // 圆环的开始角度
          endAngle: 90,    // 圆环的结束角度
          center: ['50%', '75%']
        }
      },
      series: [{
        type: 'pie',
        name: '评分占比',
        innerSize: '50%',
        data: []
      }]
    })
    const optForFeetback = reactive({
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: '菜品种类'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
        }
      },
      series: [{
        name: '数量',
        colorByPoint: true,
        data: []
      }]
    })
    const optForOrderCount = reactive({
      title: {
        text: '近7日内订单数量'
      },
      yAxis: {
        title: {
          text: '订单数'
        }
      },
      xAxis: {
        title: {
          text: '日期'
        },
        type: 'datetime',
        dateTimeLabelFormats: {
          day: '%m-%d'
        }
      },
      plotOptions: {
        series: {
          pointStart: Date.UTC(2022, 0, 27),
          pointIntervalUnit: 'day'
        }
      },
      series: [{
        name: '订单量',
        data: [1, 2, 3, 4, 5, 6, 7]
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    })
    const optForUserPicture = reactive({
      chart: {
        type: 'bar',
      },
      title: {
        text: '用户画像'
      },
      xAxis: {
        categories: ['顾客', '骑手', '厨师', '经理'],
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '数量',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      series: [{
        name: "数量",
        data: [1, 2, 3, 4]
      },]
    });
    var time = ref(getTime());
    const totalStatistic = reactive({
      riderCount: 0,
      shopCount: 0,
      orderCount: 0,
      foodCount: 0,
      userCount: 0,
    })
    return {
      optForOrderCount, optForFeetback, optForScore, optForUserPicture,
      totalStatistic,
      time: time,
      refresh() {
        time.value = getTime();
        getData();
      },
    };
  }
});
</script>