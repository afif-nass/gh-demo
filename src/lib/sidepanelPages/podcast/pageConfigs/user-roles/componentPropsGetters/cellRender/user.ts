import { userImages } from '../../userImages';
import { displayName } from '../../preparedFunctions';

export function userPropsGetter(params: Grid.CellRenderer.Params): Grid.CustomComponents.UserProps {
	const value = params.value;
	const props = {
		imageURL: userImages[value],
		text: {
			primary: displayName(value),
			secondary: value
		}
	};
	return props;
}
