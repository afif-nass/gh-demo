import type { ComponentType } from 'svelte';
import * as AG from 'ag-grid-community';

declare global {
	namespace Grid {
		namespace CustomComponents {
			interface MapProps {
				lng: number;
				lat: number;
				zoom: number;
			}

			interface ButtonListProps {
				buttons: {
					text: string;
					url: string;
					img: string;
					bgColor: string;
					textColor: string;
				}[];
			}

			interface HeatCalendarProps {
				data: {
					date: string;
					value: number;
				}[];
				colorGetter?: (value: number) => string;
			}

			interface DeltaProps {
				value: number;
				format?: 'percent' | 'currency';
			}

			interface ChartProps {
				data: any;
				params: {
					chartType: string;
				};
			}

			interface IconListProps {
				iconList: {
					label: string;
					value: string;
					color: string;
					icon: {
						component: ComponentType;
						props?: {
							color?: string;
							size?: number | string;
							stroke?: number | string;
							class?: string;
						};
					};
				}[];
			}

			interface GaugeProps {
				min: number;
				max: number;
				value: number;
				palette: 'bad-good' | 'bad' | 'good' | 'bad-good-bad';
			}

			interface ProgressBarProps {
				barColor: string;
				minLabel: string;
				percent: number;
				targetLabel: string;
			}

			interface TableProps {
				headers: string[];
				rows: any[];
			}

			interface MetricCardsProps {
				cards: { label: string; value: string | number }[];
			}

			interface TooltipProps {
				text: string;
				color: string;
			}

			interface RecentDeliveryProps {
				date: Date;
				expected: number;
				actual: number;
			}

			interface FlightProgressProps {
				value: number;
				dates: {
					start: Date;
					end: Date;
				};
			}

			interface HeatBarProps {
				value: number;
			}

			interface UserProps {
				imageURL: string;
				text: { primary: string; secondary?: string };
				imageSizeClasses?: string;
			}

			interface ImageProps {
				imageURL: string;
			}

			interface StatusButtonProps {
				fieldName: string;
				row: AG.RowNode;
				boolean: boolean;
				text: {
					true: string;
					false: string;
				};
			}

			interface BooleanProps {
				boolean: boolean;
				text?: {
					true: string;
					false: string;
				};
			}

			interface PillListProps {
				title?: string;
				list: string[];
			}

			type CustomComponentProps =
				| MapProps
				| ButtonListProps
				| HeatCalendarProps
				| DeltaProps
				| ChartProps
				| IconListProps
				| GaugeProps
				| ProgressBarProps
				| TableProps
				| MetricCardsProps
				| TooltipProps
				| RecentDeliveryProps
				| FlightProgressProps
				| HeatBarProps
				| UserProps
				| ImageProps
				| StatusButtonProps
				| BooleanProps
				| PillListProps;
		}
	}
}
