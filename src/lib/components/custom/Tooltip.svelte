<script lang="ts">
	import { twConfig } from '$src/theme';

	export let props: Grid.CustomComponents.TooltipProps;

	$: text = props.text;
	$: color = props.color ?? twConfig.theme.colors.text.primary;
</script>

<p class="min-w-fit text-nowrap font-semibold" style="color: {color}">
	{text}
</p>
