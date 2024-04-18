import React, { useCallback, useRef } from 'react';
import {
  ReactZoomPanPinchContentRef,
  TransformComponent,
  TransformWrapper,
} from 'react-zoom-pan-pinch';

import { Model } from '@slavseat/types';

import FacilityGridViewer from '@/shared/components/FacilityGridViewer';
import { Modal } from '@/shared/components/Modal';

interface ViewFacilityInGridProps {
  facilities: Model.FacilitySummary[];
  targetFacility: Model.FacilitySummary;
}

export function ViewFacilityInGrid({ facilities, targetFacility }: ViewFacilityInGridProps) {
  const transformRef = useRef<ReactZoomPanPinchContentRef>(null);
  const facilityElementRef = useRef<Record<number, HTMLDivElement>>({});

  const addFacilityRef = useCallback((id: number, ref: HTMLDivElement | null) => {
    if (ref) facilityElementRef.current[id] = ref;
  }, []);

  return (
    <Modal.Root>
      <TransformWrapper
        ref={transformRef}
        disablePadding
        maxScale={1}
        minScale={0.5}
        onInit={(ref) => {
          ref.zoomToElement(facilityElementRef.current[targetFacility.id]);
        }}
      >
        <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
          <FacilityGridViewer
            facilities={facilities}
            reserves={[]}
            selected={[targetFacility.id]}
            onItemRender={(facility, ref) => addFacilityRef(facility.id, ref)}
          />
        </TransformComponent>
      </TransformWrapper>
    </Modal.Root>
  );
}
