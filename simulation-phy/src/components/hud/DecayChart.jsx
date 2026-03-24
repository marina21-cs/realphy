import { useEffect, useMemo, useRef } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import useSimStore from '../../store/useSimStore';
import { dischargeStep, theoreticalDecay } from '../../physics/engine';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function DecayChart() {
  const currentAct = useSimStore((s) => s.currentAct);
  const chartData = useSimStore((s) => s.chartData);
  const P = useSimStore((s) => s.P);
  const resetChart = useSimStore((s) => s.resetChart);
  const setSimTime = useSimStore((s) => s.setSimTime);
  const initRef = useRef(null);

  useEffect(() => {
    if (currentAct !== 3) {
      return;
    }

    resetChart();
    setSimTime(0);
    initRef.current = null;

    return () => {
      initRef.current = null;
    };
  }, [currentAct, resetChart, setSimTime]);

  useEffect(() => {
    if (currentAct !== 3) {
      return;
    }

    const id = setInterval(() => {
      const state = useSimStore.getState();
      if (state.currentAct !== 3 || !state.isDischarging) {
        return;
      }

      const dt = 0.04;
      const currentVoltage = state.chargeLevel * state.P.V;

      if (!initRef.current) {
        initRef.current = {
          t0: state.simTime,
          v0: Math.max(currentVoltage, state.P.V),
        };
      }

      const nextVoltage = dischargeStep(currentVoltage, state.P, dt);
      const nextTime = state.simTime + dt;

      state.setChargeLevel(nextVoltage / Math.max(state.P.V, 1e-6));
      state.setSimTime(nextTime);
      state.pushChartPoint(nextTime, nextVoltage);

      if (nextVoltage <= 0.01) {
        state.setIsDischarging(false);
      }
    }, 50);

    return () => clearInterval(id);
  }, [currentAct]);

  const labels = useMemo(() => chartData.map((p) => p.t.toFixed(2)), [chartData]);

  const theoretical = useMemo(() => {
    if (!chartData.length) {
      return [];
    }

    const base = initRef.current ?? { t0: chartData[0].t, v0: chartData[0].v };
    return chartData.map((p) => theoreticalDecay(Math.max(0, p.t - base.t0), base.v0, P));
  }, [chartData, P]);

  const data = useMemo(
    () => ({
      labels,
      datasets: [
        {
          label: 'Simulated V(t)',
          data: chartData.map((p) => p.v),
          borderColor: '#FFB300',
          backgroundColor: 'rgba(255,179,0,0.15)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.24,
        },
        {
          label: 'Theoretical V(t)',
          data: theoretical,
          borderColor: '#00E5FF',
          borderDash: [6, 6],
          borderWidth: 1.6,
          pointRadius: 0,
          tension: 0.24,
        },
      ],
    }),
    [chartData, labels, theoretical]
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      animation: false,
      scales: {
        x: {
          title: { display: true, text: 'time (s)', color: '#9ec2d9', font: { family: 'JetBrains Mono' } },
          grid: { color: 'rgba(0,229,255,0.08)' },
          ticks: { color: '#9ec2d9', maxTicksLimit: 7 },
        },
        y: {
          title: { display: true, text: 'V(t) voltage', color: '#9ec2d9', font: { family: 'JetBrains Mono' } },
          grid: { color: 'rgba(0,229,255,0.08)' },
          ticks: { color: '#9ec2d9' },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: '#b8d7e8',
            boxWidth: 14,
            font: { family: 'JetBrains Mono', size: 10 },
          },
        },
      },
    }),
    []
  );

  return (
    <div className="panel" style={{ position: 'absolute', left: 22, bottom: 120, width: 430, height: 210, pointerEvents: 'all' }}>
      <div className="plabel">◈ Decay Curve</div>
      <div style={{ width: '100%', height: 162 }}>
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
