import { userImages } from '../../userImages';

export function userPropsGetter(params: Grid.CellRenderer.Params): Grid.CustomComponents.UserProps {
	const value = params.value;
	const props = {
		imageURL: userImages[value],
		text: {
			primary: value
		}
	};
	return props;
}
