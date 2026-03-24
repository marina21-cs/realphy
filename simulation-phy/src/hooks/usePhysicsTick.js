import { useFrame } from '@react-three/fiber';
import useSimStore from '../store/useSimStore';

export default function usePhysicsTick() {
  useFrame((_, delta) => {
    const state = useSimStore.getState();

    if (state.currentAct !== 3) {
      return;
    }

    if (state.isCharging && !state.isDischarging) {
      state.setChargeLevel(state.chargeLevel + delta * 0.22);
      return;
    }

    if (!state.isCharging && !state.isDischarging && state.chargeLevel > 0) {
      state.setChargeLevel(state.chargeLevel - delta * 0.015);
    }
  });
}
