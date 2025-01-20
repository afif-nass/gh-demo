import * as echarts from 'echarts';
import { twConfig } from '$src/theme';
import { currency } from '$components/grid/helpers/formatters/currency';
import { formatDate } from '$lib/helpers/formatters/dates';

const theme = twConfig.theme;
const colors = twConfig.theme.colors;

const palettes: Record<Grid.CustomComponents.GaugeProps['palette'], string[]> = {
	'bad-good': [colors.destructive.primary, colors.warning.primary, colors.affirmative.primary],
	bad: [colors.destructive.primary],
	good: [colors.affirmative.primary],
	'bad-good-bad': [
		colors.destructive.primary,
		colors.affirmative.primary,
		colors.destructive.primary
	]
};

let option: echarts.EChartsOption = {
	tooltip: {
		trigger: 'item',
		show: false
	},
	color: [colors.affirmative.primary, colors.destructive.primary, colors.warning.primary],
	legend: {
		top: '5%',
		show: false,
		left: 'center'
	},
	series: [
		{
			name: 'Access From',
			type: 'pie',
			radius: ['90%', '70%'],
			avoidLabelOverlap: false,
			itemStyle: {
				borderRadius: 100,
				borderColor: 'transparent',
				borderWidth: 2
			},
			label: {
				show: false,
				position: 'center'
			},
			emphasis: {
				scale: false,
				label: {
					show: false,
					fontSize: 40,
					fontWeight: 'bold'
				}
			},
			labelLine: {
				show: false
			},
			data: []
		}
	]
};

// function getOption(params: Grid.Charts.BarChart, inputData: any) {
// 	return option;
// 	let optionObj = Object.assign({}, option);
// 	const { labelKey, dataKey, title } = params;
// 	const data: number[] = [];
// 	inputData.forEach((x: Record<string, any>) => {
// 		data.push(x[dataKey]);
// 	});
// 	if (labelKey) {
// 		//@ts-ignore
// 		optionObj.xAxis.data = cellValue.map((x: Record<string, any>) =>
// 			formatDateOld(x[labelKey], 'friendly-no-time-no-year')
// 		);
// 	}
// 	const series = optionObj.series as echarts.SeriesOption;
// 	//@ts-ignore
// 	optionObj.series[0].data = data;
// 	if (title) {
// 		if (Array.isArray(option.title)) {
// 			//@ts-ignore
// 			optionObj.title.forEach((t) => (t.show = true));
// 		} else {
// 			//@ts-ignore
// 			optionObj.title.show = true;
// 		}
// 		//@ts-ignore
// 		optionObj.grid!.top = 35;
// 		if (Array.isArray(optionObj.title)) {
// 			optionObj.title.forEach((t) => (t.text = title));
// 		} else {
// 			//@ts-ignore
// 			optionObj.title.text = title;
// 		}
// 	}
// 	return optionObj;
// }

// export default getOption;
