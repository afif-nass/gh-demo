export class CustomCellRenderer {
	private eGui!: HTMLDivElement;
	private def!: Grid.CellRenderer.Def;
	private componentInstance: any;

	init(def: Grid.CellRenderer.Def): void {
		this.def = def;
		this.eGui = document.createElement('div');
		this.eGui.className = 'w-fit';
		this.renderComponent(def);
	}

	private async renderComponent(customParams: Grid.CellRenderer.Def): Promise<void> {
		try {
			let targetComponent;
			const folder = customParams?.componentFolder;
			if (!folder || folder === 'default') {
				targetComponent = (
					await import(`../../../components/custom/${customParams.componentName}.svelte`)
				).default;
			} else if (folder === 'grid') {
				targetComponent = (
					await import(`../components/rowActions/${customParams.componentName}.svelte`)
				).default;
			}
			const props = customParams.propsGetter(customParams.params);
			this.componentInstance = new targetComponent!({
				target: this.eGui,
				props: { props }
			});
		} catch (error) {
			console.error('Failed to load cell renderer:', error);
		}
	}

	getGui(): HTMLElement {
		return this.eGui as HTMLDivElement;
	}

	refresh(def: Grid.CellRenderer.Def): boolean {
		this.def = def;
		if (this.componentInstance) {
			const props = def.propsGetter(def.params);
			this.componentInstance.$set({ props });
		}
		return true;
	}

	destroy(): void {}
}
