<script lang="ts">
	import { IconPlus, IconMinus } from '@tabler/icons-svelte';
	import Stat from './Stat.svelte';
	import { twConfig } from '$src/theme';

	export let added = 12300012;
	export let removed = 456782;
</script>

<div class="flex flex-wrap gap-3 w-full h-full items-center *:flex *:items-center">
	<div>
		<IconPlus size={32} color={twConfig.theme.colors.emerald[200]} />
		<Stat num={added} classes="[font-size:_clamp(1rem,3rem,3.75rem)] text-emerald-200" />
	</div>
	<div>
		<IconMinus size={32} color={twConfig.theme.colors.rose[200]} />
		<Stat num={removed} classes="[font-size:_clamp(1rem,3rem,3.75rem)] text-rose-200" />
	</div>
</div>
