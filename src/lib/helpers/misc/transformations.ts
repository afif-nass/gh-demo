type Dict = Record<string, any>;

export function transformArrayToDict(arrayValues: any[]): Dict {
	const valueAsDict: Dict = {};
	arrayValues.forEach((arrayValue) => {
		valueAsDict[arrayValue] = arrayValue;
	});
	return valueAsDict;
}

export function rearrangeDictOrder(originalDict: Dict, orderOfKeys: string[]) {
	let rearrangedDict: Dict = {};
	orderOfKeys.forEach((key) => {
		if (originalDict.hasOwnProperty(key)) {
			rearrangedDict[key] = originalDict[key];
		}
	});
	return rearrangedDict;
}
