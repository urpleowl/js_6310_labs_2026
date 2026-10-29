import { default as React } from 'react';
export interface HabitCardProps {
    name: string;
    currentStreak: number;
    bestStreak: number;
    isCompletedToday?: boolean;
    onMarkComplete?: () => void;
    className?: string;
}
export declare const HabitCard: React.FC<HabitCardProps>;
//# sourceMappingURL=HabitCard.d.ts.map