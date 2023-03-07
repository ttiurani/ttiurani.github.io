import type { Readable } from 'svelte/store';
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { get, readable } from 'svelte/store';

export type MetricsResponse = {
    start: string;
    end: string;
    metrics: MetricsRange[];
};

export type MetricsRange = {
    start: string;
    end: string;
    entries: MetricsEntry[];
};

export type MetricsEntry = {
    path: string;
    status: number;
    count: number;
    immutable: boolean;
};

export const dayRanges: Readable<MetricsRange[]> = readable(
    [],
    (set: (metrics: MetricsRange[]) => void) => {
        if (browser) {
            const fetchMetrics = (url: URL) => {
                const metricsUrl = new URL('/api/metrics', url.origin);
                const limit = url.searchParams.get('limit');
                const secret = url.searchParams.get('secret');
                if (secret) {
                    metricsUrl.searchParams.append('secret', secret);
                    if (limit) {
                        metricsUrl.searchParams.append('limit', limit);
                    }
                }
                fetch(metricsUrl)
                    .then((data) => data.json())
                    .then((response: MetricsResponse) => {
                        const ranges: MetricsRange[] = response.metrics;
                        ranges.reverse();
                        ranges.forEach((range) => {
                            range.entries.sort((a: MetricsEntry, b: MetricsEntry) => {
                                if (a.count < b.count) {
                                    return 1;
                                }
                                if (a.count > b.count) {
                                    return -1;
                                }
                                return 0;
                            });
                        });
                        set(ranges);
                    })
                    .catch((ex) => {
                        console.error(ex);
                        set([]);
                    });
            };

            const url = get(page).url;
            fetchMetrics(url);
            const metricsApiInterval = setInterval(() => {
                fetchMetrics(url);
            }, 60000);

            return () => clearInterval(metricsApiInterval);
        } else {
            set([]);
            return () => { };
        }
    }
);
