import { useCallback } from "react";
import {
  atom,
  SetRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";

let firstLoad = true;

const state = atom({
  key: "authenticated",
  default: false,
  // Atom Effectsを利用して値の管理を行わないとRecoilRootを使わないレイアウトに切り替わるたびに値が失われてしまう。
  effects: [
    ({ setSelf, onSet, trigger }) => {
      /**
       * - SSRの結果に影響する場合は次のエラーが発生するので、windowのチェックが必要かつrequestAnimationFrameで遅らせる必要がある。
       *   - Error: Text content does not match server-rendered HTML.
       *   - ※チラつく
       * - requestAnimationFrameを使っていると、違うレイアウトからの遷移の場合に値が戻らないので、初回ロード時以外は囲まないようにする必要がある。
       *   - とりあえずfirstLoadの変数で対応している
       *   - RecoilRootのinitializeStateでも同様
       */
      switch (trigger) {
        case "get": {
          if (typeof window !== "undefined") {
            const load = () => {
              const savedAuthenticated = Boolean(
                window.localStorage.getItem("authenticated")
              );
              setSelf(savedAuthenticated);
            };

            if (firstLoad) {
              window.requestAnimationFrame(() => {
                load();
                firstLoad = false;
              });
            } else {
              load();
            }
          }
        }
      }

      onSet((value, _, isReset) => {
        console.log("call onSet", isReset);
        isReset
          ? window.localStorage.removeItem("authenticated")
          : window.localStorage.setItem("authenticated", String(value));
      });
    },
  ],
});

// RecoilRootのinitializeStateで初期化する場合
export const initializeAuthenticated = (set: SetRecoilState) => {
  if (typeof window !== "undefined") {
    if (firstLoad) {
      window.requestAnimationFrame(() => {
        const savedAuthenticated = Boolean(
          window.localStorage.getItem("authenticated")
        );
        set(state, savedAuthenticated);
        firstLoad = false;
      });
    } else {
      const savedAuthenticated = Boolean(
        window.localStorage.getItem("authenticated")
      );
      set(state, savedAuthenticated);
    }
  }
};

export const useAuthenticated = () => useRecoilValue(state);

export const useAuthenticate = () => {
  const set = useSetRecoilState(state);
  return useCallback(() => set(true), [set]);
};
