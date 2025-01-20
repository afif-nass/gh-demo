import { userImages } from '../../userImages';

export function imagePropsGetter(
	params: Grid.CellHoverCard.Params
): Grid.CustomComponents.ImageProps {
	const props = {
		imageURL: userImages[params.value]
	};
	return props;
}
