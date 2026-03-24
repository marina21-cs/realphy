import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

const useSimStore = create(
  subscribeWithSelector((set) => ({
    simMode: 'student',
    setSimMode: (m) => set({ simMode: m }),

    currentAct: 0,
    setAct: (a) => set({ currentAct: a }),

    isUserOrbiting: false,
    setIsUserOrbiting: (b) => set({ isUserOrbiting: b }),

    P: {
      A: 0.04,
      d: 0.005,
      V: 50,
      kappa: 1.0,
      R: 10,
    },
    setP: (key, val) => set((s) => ({ P: { ...s.P, [key]: val } })),
    setPBulk: (patch) => set((s) => ({ P: { ...s.P, ...patch } })),

    currentMat: 'vacuum',
    setMat: (k) => set({ currentMat: k }),

    chargeLevel: 0,
    setChargeLevel: (v) => set({ chargeLevel: Math.max(0, Math.min(1, v)) }),
    isCharging: false,
    isDischarging: false,
    setIsCharging: (b) => set({ isCharging: b }),
    setIsDischarging: (b) => set({ isDischarging: b }),

    simTime: 0,
    setSimTime: (t) => set({ simTime: Math.max(0, t) }),

    chartData: [],
    pushChartPoint: (t, v) =>
      set((s) => ({
        chartData: [...s.chartData, { t, v }].slice(-700),
      })),
    resetChart: () => set({ chartData: [] }),

    logText: 'Initializing simulation...',
    setLog: (html) => set({ logText: html }),

    conceptText: '',
    conceptVisible: false,
    flashConcept: (txt) => {
      set({ conceptText: txt, conceptVisible: true });
      setTimeout(() => set({ conceptVisible: false }), 1800);
    },

    kappaFlashVal: null,
    flashKappa: (val, label = 'k') => {
      set({ kappaFlashVal: `${label} = ${val}` });
      setTimeout(() => set({ kappaFlashVal: null }), 2200);
    },

    alignFrac: 0,
    setAlignFrac: (v) => set({ alignFrac: Math.max(0, Math.min(1, v)) }),
  }))
);

export default useSimStore;
