<template>
	<v-list large :multiple="false" v-model="selection" :mandatory="false">
		<navigation-item v-for="item in navSections" :key="item.name" :section="item" />
	</v-list>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from '@vue/composition-api';
import NavigationItem from './navigation-item.vue';
import navLinks from './links.yaml';

function spreadPath(path: string) {
	const sections = path.substr(1).split('/');
	if (sections.length === 0) return [];

	const paths: string[] = ['/' + sections[0]];

	for (let i = 1; i < sections.length; i++) {
		paths.push(paths[i - 1] + '/' + sections[i]);
	}

	if (paths[0] === '/reference' && paths[1] === '/reference/api') {
		paths.shift();
	}

	return paths;
}

export default defineComponent({
	components: { NavigationItem },
	props: {
		path: {
			type: String,
			default: '/docs',
		},
	},
	setup(props) {
		const selection = ref<string[] | null>(null);

		watch(
			() => props.path,
			(newPath) => {
				if (newPath === null) return;
				selection.value = spreadPath(newPath.replace('/docs', ''));
			}
		);

		return { navSections: navLinks, selection };
	},
});
</script>
