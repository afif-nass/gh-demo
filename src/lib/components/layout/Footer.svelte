<script lang="ts">
	import { site } from '$lib/index';
	import Logo from '$components/brand/Logo.svelte';
</script>

<div class="w-full bottom-0 border-t-[0.5px] flex items-center justify-center">
	<footer class="flex flex-col justify-center w-full gap-20 site-padding py-28 site-max-w">
		<div class="flex flex-col justify-between gap-20 sm:flex-row">
			<Logo />
			{#if site.hero?.topLine}
				<p class="text-left text-text-secondary max-w-prose">
					{site.hero.topLine}
					{site.hero.bottomLine}
					{@html site.hero.description}
				</p>
			{/if}
		</div>
		{#if site.footer?.linkCategories}
			<div class="flex flex-col gap-4 my-10 w-fit">
				{#each Object.entries(site.footer.linkCategories) as [category, links]}
					<p class="font-bold text-left">{category}</p>
					<div class="flex flex-col items-start gap-10">
						{#each links as link}
							<a
								target="_blank"
								class="underline text-text-secondary hover:no-underline hover:text-text-primary"
								href={link.path}
							>
								<div class="flex items-center justify-center gap-1">
									{`${link.label}`}
								</div>
							</a>
						{/each}
					</div>
				{/each}
			</div>
		{/if}
		<div class="flex flex-wrap gap-12">
			{#if site.footer?.showContactEmail}
				<div class="flex flex-col gap-3">
					<p class="font-medium text-left">Questions & Inquiries</p>
					<p class="text-left text-text-secondary">
						{site.emails?.contact}
					</p>
				</div>
			{/if}
			{#if site.footer?.showSupportEmail}
				<div class="flex-col items-start gap-1 flex">
					<p class="font-medium text-left">Help</p>
					<p class="text-left text-text-secondary">
						{site.emails?.support}
					</p>
				</div>
			{/if}
		</div>
		<p class="text-left text-text-secondary">
			Copyright © 2024 {site.name}. All rights reserved.
		</p>
		{#if site.footer?.legal?.length}
			<div class="flex flex-wrap items-start gap-4">
				{#each site.footer.legal as link}
					<a
						target="_blank"
						class="underline text-text-secondary hover:no-underline hover:text-text-primary"
						href={link.path}
					>
						<div class="flex items-center justify-center gap-1">
							{`${link.label}`}
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</footer>
</div>
