<script lang="ts">
	import { IconChevronsRight } from '@tabler/icons-svelte';

	export let steps: string[];
	export let currentStep: number;

	type StepType = 'current' | 'completed' | 'future';

	function getStepType(stepIndex: number): StepType {
		if (stepIndex === currentStep) {
			return 'current';
		} else if (stepIndex < currentStep) {
			return 'completed';
		} else {
			return 'future';
		}
	}

	function getStyles(type: StepType) {
		const styles = {
			border: '',
			bg: '',
			label: '',
			num: ''
		};

		switch (type) {
			case 'current':
				styles.border = 'border-border-secondary';
				styles.bg = 'bg-muted';
				styles.label = 'text-text-light';
				styles.num = 'text-text-light';
				break;
			case 'completed':
				styles.border = 'border-brand-primary';
				styles.bg = 'bg-brand-primary';
				styles.label = 'text-brand-primary';
				styles.num = 'text-white';
				break;
			case 'future':
				styles.border = 'border-border-secondary';
				styles.bg = 'bg-muted';
				styles.label = 'text-text-light';
				styles.num = 'text-text-light';
				break;
		}

		return styles;
	}
</script>

<div class="flex items-center gap-2">
	{#each steps as step, i}
		{@const stepType = getStepType(i)}
		{@const styles = getStyles(stepType)}
		<div class="flex items-center gap-[5px]">
			<div
				class="min-w-5 min-h-5 rounded-full flex items-center justify-center border {styles.bg} {styles.border}"
			>
				<p class="text-xs {styles.num}">{i + 1}</p>
			</div>
			<p class="font-medium tracking-tight text-sm {styles.label}">
				{step}
			</p>
		</div>
		{#if i !== steps.length - 1}
			<div class={getStyles(getStepType(i)).label}>
				<IconChevronsRight size="1rem" />
			</div>
		{/if}
	{/each}
</div>
