import { Color } from '../../model/color.model';
import { ThemeType, Theme } from './theme.model';

export const THEMES: Record<ThemeType, Theme> = {
    yellow: {
        'background': Color.BRIGHT_YELLOW,
    },
    green: {
        'background': Color.BRIGHT_GREEN,
    }
};
