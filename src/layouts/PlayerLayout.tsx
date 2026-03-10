import { Outlet } from 'react-router-dom';

export default function PlayerLayout() {
  return (
    <div className="min-h-screen bg-black">
      <Outlet />
    </div>
  );
}
