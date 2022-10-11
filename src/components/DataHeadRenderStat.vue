<script>
import { h } from 'vue';
import DefaultStats from '@/components/DataHeadStats.vue';

export default {
    name: 'DataHeadRenderStat',
    inject: {
        StatsComponent: {
            default: null,
        },
    },
    render() {
        return h(this.StatsComponent || DefaultStats);
    },
};
</script>
