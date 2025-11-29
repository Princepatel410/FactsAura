import { Outlet } from 'react-router-dom';
import { DemoControlPanel } from './DemoControlPanel';
import { useDemoControls } from '../hooks/useDemoControls';

export function Layout() {
  const { demoState, updateSpeed, pause, resume, reset } = useDemoControls();

  return (
    <>
      <Outlet />
      <DemoControlPanel
        speed={demoState.speed}
        isPaused={demoState.isPaused}
        progress={demoState.progress}
        onSpeedChange={updateSpeed}
        onPause={pause}
        onResume={resume}
        onReset={reset}
      />
    </>
  );
}
