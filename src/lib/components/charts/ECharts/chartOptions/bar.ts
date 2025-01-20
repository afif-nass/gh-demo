import * as echarts from 'echarts';
import { twConfig } from '$src/theme';
import { currency } from '$components/grid/helpers/formatters/currency';
import { formatDate } from '$lib/helpers/formatters/dates';

const theme = twConfig.theme;
const colors = twConfig.theme.colors;

let option: echarts.EChartsOption = {
	xAxis: {
		data: [] as string[],
		axisLabel: {
			color: colors.text.secondary,
			interval: 0,
			rotate: 90,
			overflow: 'truncate',
			width: 50
		},
		axisLine: { lineStyle: { color: colors.border.light } }
	},
	animationDelay: 80,
	animationDuration: 280,
	grid: {
		top: 15,
		left: 0,
		containLabel: true,
		right: 5,
		bottom: 10
	},
	title: {
		show: false,
		text: '',
		padding: 0,
		left: 0,
		top: 0,
		textStyle: {
			color: colors.text.secondary,
			fontSize: theme.fontSize['sm'][0],
			fontWeight: 'normal'
		}
	},
	yAxis: {
		axisLabel: { color: colors.text.secondary, formatter: (x: number) => currency(x) },
		splitLine: { lineStyle: { color: colors.border.light } }
	},
	series: [
		{
			type: 'bar',
			itemStyle: {
				color: {
					type: 'linear',
					x: 0,
					y: 0,
					x2: 0,
					y2: 1,
					colorStops: [
						{ offset: 0, color: colors.brand.secondary },
						{ offset: 1, color: colors.brand.primary }
					]
				},
				borderRadius: [2, 2, 0, 0]
			},
			data: [] as number[]
		}
	]
};

function getOption(params: Grid.Charts.BarChart, inputData: any) {
	let optionObj = Object.assign({}, option);
	const { labelKey, dataKey, title } = params;
	const data: number[] = [];
	inputData.forEach((x: Record<string, any>) => {
		data.push(x[dataKey]);
	});
	if (labelKey) {
		//@ts-ignore
		optionObj.xAxis.data = cellValue.map((x: Record<string, any>) =>
			formatDate(x[labelKey], 'friendly-no-time-no-year')
		);
	}
	const series = optionObj.series as echarts.SeriesOption;
	//@ts-ignore
	optionObj.series[0].data = data;
	if (title) {
		if (Array.isArray(option.title)) {
			//@ts-ignore
			optionObj.title.forEach((t) => (t.show = true));
		} else {
			//@ts-ignore
			optionObj.title.show = true;
		}
		//@ts-ignore
		optionObj.grid!.top = 35;
		if (Array.isArray(optionObj.title)) {
			optionObj.title.forEach((t) => (t.text = title));
		} else {
			//@ts-ignore
			optionObj.title.text = title;
		}
	}
	return optionObj;
}

export default getOption;
