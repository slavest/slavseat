import React from 'react';

import { RecipeVariants } from '@vanilla-extract/recipes';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import ReactPortal from '@/components/atoms/Portal';

import {
  drawerInnerStyle,
  drawerWrapperVariants,
} from './drawer.css';

type DrawerProps = RecipeVariants<typeof drawerWrapperVariants> & {
  className?: string;
  children?: React.ReactNode;
};

const Drawer = ({
  position,
  open,
  className,
  children,
}: DrawerProps) => {
  return (
    <ReactPortal wrapperId="react-drawer-portal">
      <AnimatePresence>
        <motion.div
          key="react-drawer"
          className={clsx(
            drawerWrapperVariants({ open, position }),
            className,
          )}
          transition={{
            duration: 0.1,
            type: 'spring',
            damping: 35,
            stiffness: 450,
          }}
          layout
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </ReactPortal>
  );
};

export default Drawer;
