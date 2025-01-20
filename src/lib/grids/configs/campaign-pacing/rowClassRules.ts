import * as AG from 'ag-grid-community';
import type { CampaignDelivery } from './data';

export const rowClassRules: { [key: string]: (params: AG.RowClassParams) => boolean } = {
	'!bg-[#FAA0A010]': (params: AG.RowClassParams) => {
		const data: CampaignDelivery = params.data;
		return !data.fullDeliveryLikely;
	}
};
