import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Loading } from '@/shared/components/Loading';
import ScrollArea from '@/shared/components/ScrollArea';
import { Locations } from '@/shared/constants/location.constant';
import { useInitialize } from '@/shared/hooks/useInitialize';
import { LogoWithoutNameIcon } from '@/shared/icons/LogoWithoutNameIcon';

import { AdminHeader } from '../components/AdminHeader';
import { SideBar } from '../components/SideBar';
import { useAdminAppStore } from '../stores/adminAppStore';

export function AdminRoot() {
  const { initialized } = useInitialize();
  const { title } = useAdminAppStore();

  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh]">
      <header className="hidden">Admin Header</header>

      {initialized ? (
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-1">
            <SideBar
              onItemClick={(v) => navigate(v.value)}
              activated={location.pathname}
            >
              <div className="flex gap-2 items-center p-2 font-bold text-lg text-neutral-200">
                <LogoWithoutNameIcon className="w-10 h-10" />
                Booksy Admin
              </div>
              <SideBar.Item value={Locations.ADMIN.ROOT}>
                홈
              </SideBar.Item>
              <SideBar.ItemGroup
                groupKey={Locations.ADMIN.FACILITY.ROOT}
                label="Facility"
              >
                <SideBar.Item value={Locations.ADMIN.FACILITY.EDIT}>
                  관리
                </SideBar.Item>
                <SideBar.Item value={Locations.ADMIN.FACILITY.VIEW}>
                  미리보기
                </SideBar.Item>
              </SideBar.ItemGroup>
              <SideBar.ItemGroup
                groupKey={Locations.ADMIN.FLOOR.ROOT}
                label="Floor"
              >
                <SideBar.Item value={Locations.ADMIN.FLOOR.MANAGE}>
                  관리
                </SideBar.Item>
              </SideBar.ItemGroup>
            </SideBar>

            <div className="flex-1 flex flex-col max-h-screen">
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
    </div>
  );
}
