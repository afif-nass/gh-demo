export class TooltipRenderer {
	private eGui!: HTMLDivElement;
	private params!: Grid.Tooltip.Params;
	private componentInstance: any;

	init(params: Grid.Tooltip.Params): void {
		this.params = params;
		this.eGui = document.createElement('div');
		this.eGui.className = 'w-fit';
		this.renderComponent(params);
	}

	private async renderComponent(customParams: Grid.Tooltip.Params): Promise<void> {
		try {
			const targetComponent = (await import(`../components/Tooltip.svelte`)).default;
			this.componentInstance = new targetComponent({
				target: this.eGui,
				props: { props: customParams }
			});
		} catch (error) {
			console.error('Failed to load cell renderer:', error);
		}
	}

	getGui(): HTMLElement {
		return this.eGui as HTMLDivElement;
	}

	refresh(params: Grid.Tooltip.Params): boolean {
		this.params = params;
		if (this.componentInstance) {
			const props = params.propsGetter(params);
			this.componentInstance.$set({ props });
		}
		return true;
	}

	destroy(): void {}
}
