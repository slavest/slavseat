import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';

import { Loading } from '@/shared/components/Loading';
import ScrollArea from '@/shared/components/ScrollArea';
import { Locations } from '@/shared/constants/location.constant';
import { useInitialize } from '@/shared/hooks/useInitialize';
import { LogoWithoutNameIcon } from '@/shared/icons/LogoWithoutNameIcon';
import { cn } from '@/shared/utils/class.util';

import { AdminHeader } from '../components/AdminHeader';
import { SideBar } from '../components/SideBar';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminRoot() {
  const { initialized } = useInitialize();
  const { title } = useAdminAppStore();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="h-[100vh] w-[100vw]">
      <header className="hidden">Admin Header</header>

      {initialized ? (
        <div className="flex h-full w-full flex-col">
          <div className="flex flex-1">
            <SideBar
              activated={location.pathname}
              className="w-[var(--var-admin-sidebar-width)]"
              onItemClick={(v) => navigate(v.value)}
            >
              <div className="flex items-center gap-2 p-2 text-lg font-bold text-neutral-200">
                <LogoWithoutNameIcon className="h-10 w-10" />
                Booksy Admin
              </div>
              <SideBar.Item value={Locations.ADMIN.ROOT}>홈</SideBar.Item>
              <SideBar.ItemGroup groupKey={Locations.ADMIN.FACILITY.ROOT} label="Facility">
                <SideBar.Item value={Locations.ADMIN.FACILITY.EDIT}>관리</SideBar.Item>
                <SideBar.Item value={Locations.ADMIN.FACILITY.VIEW}>미리보기</SideBar.Item>
              </SideBar.ItemGroup>
              <SideBar.ItemGroup groupKey={Locations.ADMIN.FLOOR.ROOT} label="Floor">
                <SideBar.Item value={Locations.ADMIN.FLOOR.MANAGE}>관리</SideBar.Item>
              </SideBar.ItemGroup>
              <SideBar.ItemGroup groupKey={Locations.ADMIN.RESERVE.ROOT} label="예약">
                <SideBar.Item value={Locations.ADMIN.RESERVE.MANAGE}>관리</SideBar.Item>
              </SideBar.ItemGroup>
              <SideBar.ItemGroup groupKey={Locations.ADMIN.STATISTICS.ROOT} label="통계">
                <SideBar.Item value={Locations.ADMIN.STATISTICS.RESERVE}>예약 통계</SideBar.Item>
              </SideBar.ItemGroup>
            </SideBar>

            <div
              className={cn(
                'max-h-screen w-[calc(100%_-_var(--var-admin-sidebar-width))]',
                'flex flex-1 flex-col',
                'bg-neutral-100',
              )}
            >
              <AdminHeader title={title} />
              <ScrollArea>
                <Outlet />
              </ScrollArea>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <ToastContainer
        closeOnClick
        draggable
        hideProgressBar
        pauseOnFocusLoss
        autoClose={1500}
        newestOnTop={false}
        pauseOnHover={false}
        position="bottom-right"
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
