import useSimStore from '../../store/useSimStore';
import useCinematicCamera from '../../hooks/useCinematicCamera';

export default function CinematicCamera() {
  const currentAct = useSimStore((s) => s.currentAct);
  const isUserOrbiting = useSimStore((s) => s.isUserOrbiting);
  useCinematicCamera(currentAct, isUserOrbiting);
  return null;
}
