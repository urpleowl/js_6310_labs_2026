import { default as React } from 'react';
export interface HeatmapDay {
    date: string;
    completed: boolean;
}
export interface HeatmapProps {
    data: HeatmapDay[];
    startDate?: string;
    endDate?: string;
    className?: string;
}
export declare const Heatmap: React.FC<HeatmapProps>;
//# sourceMappingURL=Heatmap.d.ts.map