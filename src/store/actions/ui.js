import { UI_START_LOADING, UI_STOP_LOADING, TZ_START_LOADING, TZ_STOP_LOADING } from "../actions/actionTypes";

export const uiStartLoading = () => {
    return {
        type: UI_START_LOADING
    };
};

export const uiStopLoading = () => {
    return {
        type: UI_STOP_LOADING
    };
};

export const tzStartLoading = () => {
    return {
        type: TZ_START_LOADING
    };
};

export const tzStopLoading = () => {
    return {
        type: TZ_STOP_LOADING
    };
};