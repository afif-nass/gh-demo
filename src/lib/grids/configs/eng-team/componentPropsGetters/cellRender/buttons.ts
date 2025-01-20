import { twConfig } from '$src/theme';

const colors = twConfig.theme.colors;

export function buttonsPropsGetter(
	params: Grid.CellRenderer.Params
): Grid.CustomComponents.ButtonListProps {
	const data = params.value;
	return {
		buttons: [
			{
				text: 'Jira',
				img: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',
				url: 'https://www.example.com/',
				bgColor: 'white',
				textColor: '#0146b3'
			},
			{
				text: 'GitHub',
				img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/1200px-Octicons-mark-github.svg.png?20180806170715',
				url: 'https://www.example.com/',
				bgColor: 'white',
				textColor: '#333333'
			}
		]
	};
}
