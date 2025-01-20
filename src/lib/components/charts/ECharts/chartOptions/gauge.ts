import * as echarts from 'echarts';
import { twConfig } from '$src/theme';

const theme = twConfig.theme;
const colors = twConfig.theme.colors;

let option: echarts.EChartsOption = {
	series: [
		{
			type: 'gauge',
			startAngle: 180,
			endAngle: 0,
			min: 0,
			max: 50,
			splitNumber: 5,
			itemStyle: {
				color: colors.brand.primary,
				shadowColor: colors.brand.primaryLight,
				shadowBlur: 10,
				shadowOffsetX: 2,
				shadowOffsetY: 2
			},
			progress: {
				show: true,
				roundCap: true,
				width: 18
			},
			pointer: {
				icon: 'path://M2090.36389,615.30999 L2090.36389,615.30999 C2091.48372,615.30999 2092.40383,616.194028 2092.44859,617.312956 L2096.90698,728.755929 C2097.05155,732.369577 2094.2393,735.416212 2090.62566,735.56078 C2090.53845,735.564269 2090.45117,735.566014 2090.36389,735.566014 L2090.36389,735.566014 C2086.74736,735.566014 2083.81557,732.63423 2083.81557,729.017692 C2083.81557,728.930412 2083.81732,728.84314 2083.82081,728.755929 L2088.2792,617.312956 C2088.32396,616.194028 2089.24407,615.30999 2090.36389,615.30999 Z',
				length: '75%',
				width: 15,
				offsetCenter: [0, '5%']
			},
			axisLine: {
				roundCap: true,
				lineStyle: {
					width: 18
				}
			},
			axisTick: {
				distance: 2,
				show: false,
				splitNumber: 2,
				lineStyle: {
					width: 2,
					color: colors.border.light
				}
			},
			splitLine: {
				length: 12,
				lineStyle: {
					width: 3,
					color: colors.border.light
				}
			},
			axisLabel: {
				distance: 20,
				color: colors.text.light,
				fontSize: 12
			},
			title: {
				show: false
			},
			detail: {
				width: 300,
				lineHeight: 40,
				offsetCenter: [0, '35%'],
				valueAnimation: true,
				formatter: function (value: number) {
					return '{value|' + value.toFixed(0) + '}{unit|%}';
				},
				rich: {
					value: {
						fontSize: 34,
						fontWeight: 'bolder',
						color: colors.text.primary
					},
					unit: {
						fontSize: 16,
						color: colors.text.primary,
						fontWeight: 'bold',
						padding: [0, 0, 0, 5]
					}
				}
			},
			data: [
				{
					value: 30
				}
			]
		}
	]
};

function getOption() {
	return option;
}

export default getOption;
