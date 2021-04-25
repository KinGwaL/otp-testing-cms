import { ref, Ref } from 'vue';
import { ModuleConfig } from './types';

let modulesRaw: Ref<ModuleConfig[]>;
let modules: Ref<ModuleConfig[]>;

export function getModules() {
	if (!modulesRaw) {
		modulesRaw = ref([]);
	}

	if (!modules) {
		modules = ref([]);
	}

	return { modules, modulesRaw };
}
