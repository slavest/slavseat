import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { Loading } from '@/shared/components/Loading';
import { Locations } from '@/shared/constants/location.constant';
import { useInitialize } from '@/shared/hooks/useInitialize';

import { SideBar } from '../components/SideBar';

export function AdminRoot() {
  const { initialized } = useInitialize();
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="w-[100vw] h-[100vh]">
      <header className="hidden">Admin Header</header>

      {initialized ? (
        <div className="flex w-full h-full">
          <SideBar
            onItemClick={(v) => navigate(v.value)}
            activated={location.pathname}
          >
            <SideBar.Item value={Locations.ADMIN.ROOT}>
              Admin
            </SideBar.Item>
            <SideBar.ItemGroup
              groupKey={Locations.ADMIN.FACILITY.ROOT}
              label="Facility"
            >
              <SideBar.Item value={Locations.ADMIN.FACILITY.EDIT}>
                Edit
              </SideBar.Item>
              <SideBar.Item value={Locations.ADMIN.FACILITY.VIEW}>
                View
              </SideBar.Item>
              <SideBar.ItemGroup
                groupKey="/admin/facility/test"
                label="test"
              >
                <SideBar.Item value="/admin/facility/test/test">
                  사이드바 테스트용
                </SideBar.Item>
              </SideBar.ItemGroup>
            </SideBar.ItemGroup>
          </SideBar>

          <Outlet />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
