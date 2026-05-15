import { useEffect, useState } from "react";
import {
    fetchCurrentUser,
    getAuthToken,
    getStoredUser,
    type AuthUser,
} from "./authApi";

export type CurrentUserState = {
    user: AuthUser | null;
    isLoading: boolean;
    error: string | null;
};

export const useCurrentUser = (): CurrentUserState => {
    const [state, setState] = useState<CurrentUserState>({
        user: getStoredUser(),
        isLoading: Boolean(getAuthToken()) && !getStoredUser(),
        error: null,
    });

    useEffect(() => {
        const sync = async () => {
            const token = getAuthToken();
            if (!token) {
                setState({ user: null, isLoading: false, error: null });
                return;
            }

            const cached = getStoredUser();
            if (cached) {
                setState({ user: cached, isLoading: false, error: null });
                return;
            }

            setState((prev) => ({ ...prev, isLoading: true, error: null }));
            try {
                const user = await fetchCurrentUser();
                setState({ user, isLoading: false, error: null });
            } catch (error) {
                setState({
                    user: null,
                    isLoading: false,
                    error: error instanceof Error ? error.message : "Unable to load user.",
                });
            }
        };

        void sync();

        const handleAuthChanged = () => {
            void sync();
        };

        window.addEventListener("auth:changed", handleAuthChanged);
        window.addEventListener("storage", handleAuthChanged);
        return () => {
            window.removeEventListener("auth:changed", handleAuthChanged);
            window.removeEventListener("storage", handleAuthChanged);
        };
    }, []);

    return state;
};
